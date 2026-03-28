import { fontConfig } from "@/dummydata/config/fonts"

/**
 * Font utility functions for consistent typography across the project
 */
export const fonts = {
  /** Main font family */
  main: fontConfig.font.className,
  
  /** CSS variable for main font */
  mainVar: fontConfig.font.variable,
  
  /** Font classes for different UI elements */
  headings: fontConfig.usage.headings,
  body: fontConfig.usage.body,
  buttons: fontConfig.usage.buttons,
  navigation: fontConfig.usage.navigation,
  labels: fontConfig.usage.labels,
  
  /** Helper function to get font class by type */
  get: (type: 'headings' | 'body' | 'buttons' | 'navigation' | 'labels') => {
    return fontConfig.usage[type]
  },
  
  /** Helper function to combine font class with other classes */
  with: (fontClass: string, ...otherClasses: string[]) => {
    return [fontClass, ...otherClasses].filter(Boolean).join(' ')
  }
}

/**
 * Template literal helper for font classes
 */
export const font = (type: 'headings' | 'body' | 'buttons' | 'navigation' | 'labels') => fonts.get(type)

/**
 * Example usage:
 * 
 * // Direct usage
 * <h1 className={fonts.headings}>Title</h1>
 * <p className={fonts.body}>Text</p>
 * <button className={fonts.buttons}>Click</button>
 * 
 * // With additional classes
 * <p className={fonts.with(fonts.body, 'text-lg', 'mb-4')}>Text</p>
 * 
 * // Template literal
 * <button className={`${font('buttons')} px-4 py-2`}>Button</button>
 */
