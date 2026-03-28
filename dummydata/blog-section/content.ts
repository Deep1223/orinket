export interface BlogSection {
  title: string
  button: {
    text: string
    href: string
  }
}

export const blogSection: BlogSection = {
  title: "BLOGS",
  button: {
    text: "READ MORE",
    href: "/blog"
  }
}
