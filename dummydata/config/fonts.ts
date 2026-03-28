export interface FontConfig {
  font: {
    name: string
    family: string
    className: string
    variable: string
  }
  usage: {
    headings: string
    body: string
    buttons: string
    navigation: string
    labels: string
  }
}

// Font configuration
const fontDetails = {
  name: "Nunito Sans",
  family: "'Nunito Sans', sans-serif",
  className: "font-nunito",
  variable: "var(--font-nunito)"
}

export const fontConfig: FontConfig = {
  font: fontDetails,
  usage: {
    headings: `font-[family-name:${fontDetails.variable}]`,
    body: `font-[family-name:${fontDetails.variable}]`,
    buttons: `font-[family-name:${fontDetails.variable}]`,
    navigation: `font-[family-name:${fontDetails.variable}]`,
    labels: `font-[family-name:${fontDetails.variable}]`
  }
}
