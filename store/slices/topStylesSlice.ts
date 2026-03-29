import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { Product } from "@/data/dummyProducts"
import {
  mapApiProducts,
  type ApiProductRow,
} from "@/lib/publicApi/mappers/catalogFromApi"
import { STOREFRONT_PUBLIC_API } from "@/lib/publicApi/storefrontRoutes"
import { setLoadings } from "@/store/slices/uiSlice"

export type FetchTopStylesArg = {
  tab: string
  limit: number
  pageno?: number
  /** Dashboard-style sort: `{ field, order }` or `{}` for default (newest first). */
  sort?: Record<string, unknown>
  searchtext?: string
}

function buildTopStylesPayload(arg: FetchTopStylesArg) {
  return {
    paginationinfo: {
      filter: {
        tab: arg.tab,
      },
      pageno: arg.pageno ?? 1,
      pagelimit: arg.limit,
      sort: arg.sort ?? {},
    },
    searchtext: arg.searchtext ?? "",
  }
}

export const fetchTopStyles = createAsyncThunk(
  "topStyles/fetchTopStyles",
  async (arg: FetchTopStylesArg, { dispatch, rejectWithValue }) => {
    dispatch(setLoadings({ showGridListShimmer: true }))
    try {
      const res = await fetch(STOREFRONT_PUBLIC_API.topStyles, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildTopStylesPayload(arg)),
        cache: "no-store",
      })
      const json = (await res.json()) as {
        success?: boolean
        data?: ApiProductRow[]
        totalCount?: number
        tab?: string
        message?: string
      }
      if (!res.ok || json.success === false || !Array.isArray(json.data)) {
        return rejectWithValue(json.message || `top-styles HTTP ${res.status}`)
      }
      const products = mapApiProducts(json.data, [])
      return {
        products,
        totalCount: json.totalCount ?? products.length,
        tab: json.tab ?? arg.tab,
      }
    } catch (e) {
      return rejectWithValue(
        e instanceof Error ? e.message : "top_styles_fetch_failed"
      )
    } finally {
      dispatch(setLoadings({ showGridListShimmer: false }))
    }
  }
)

const topStylesSlice = createSlice({
  name: "topStyles",
  initialState: {
    items: [] as Product[],
    totalCount: 0,
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
    error: null as string | null,
    lastTab: "" as string,
    lastLimit: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopStyles.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchTopStyles.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload.products
        state.totalCount = action.payload.totalCount
        state.lastTab = action.payload.tab
        state.lastLimit = action.meta.arg.limit
      })
      .addCase(fetchTopStyles.rejected, (state, action) => {
        state.status = "failed"
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "failed"
      })
  },
})

export const topStylesReducer = topStylesSlice.reducer
