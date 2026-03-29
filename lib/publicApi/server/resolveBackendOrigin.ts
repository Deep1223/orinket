export function resolveOrinketBackendOrigin(): string | null {
  const fromEnv = process.env.ORINKET_BACKEND_URL?.trim().replace(/\/$/, "")
  if (fromEnv) return fromEnv
  if (process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:5000"
  }
  return null
}
