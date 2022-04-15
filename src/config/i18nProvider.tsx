import messagesEN from '@/i18n/en.json'
import messagesJA from '@/i18n/ja.json'
import getBrowserLocale from '@/utils/getBrowserLocale'
import React, { FC } from 'react'
import { IntlProvider } from 'react-intl'

const browserLocale = getBrowserLocale()

const messages: {
  [key: string]: any
} = {
  en: messagesEN,
  ja: messagesJA,
}

const I18nProvider: FC = ({ children }) => (
  <IntlProvider
    locale={browserLocale}
    messages={messages[browserLocale]}
    defaultLocale='en'
  >
    {children}
  </IntlProvider>
)

export default I18nProvider
