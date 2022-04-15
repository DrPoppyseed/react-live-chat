import I18nProvider from '@/config/i18nProvider'
import MuiTheme from '@/config/muiTheme'
import SnackbarContextProviderContainer from '@/contexts/SnackbarContext'
import ErrorBoundary from '@/utils/ErrorBoundary'
import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={MuiTheme}>
          <CssBaseline />
          <I18nProvider>
            <SnackbarContextProviderContainer>
              <App />
            </SnackbarContextProviderContainer>
          </I18nProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
