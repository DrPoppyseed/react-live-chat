/**
 * Inspired from "Detecting a User’s Locale in a Web App" with adjustments
 * @see https://phrase.com/blog/posts/detecting-a-users-locale/
 */
import { SUPPORTED_LOCALES } from '@/constants/SupportedLocales'
import { SupportedLocale } from '@/types/common'

const isSupportedLocale = (locale: string): boolean =>
  SUPPORTED_LOCALES.includes(locale)

const getBrowserLocale = (): SupportedLocale => {
  const defaultLocale = 'en'
  const browserLocales =
    navigator.languages === undefined
      ? [navigator.language]
      : navigator.languages
  if (!browserLocales) {
    return defaultLocale // fallback to english when locales undetected
  }
  const locale = browserLocales[0].trim().split(/[-_]/)[0]
  return isSupportedLocale(locale) ? locale : defaultLocale
}

export default getBrowserLocale
