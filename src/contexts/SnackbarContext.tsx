import useSnackbar from '@/hooks/useSnackbar'
import { createContext, FC, SyntheticEvent } from 'react'

export type Snackbar = {
  isOpen: boolean
  message: string
  severity?: string
}

export type SnackbarContextType = {
  snackbar: Snackbar
  handleSnackbarOpen: ({
    message,
    severity,
  }: {
    message: string
    severity?: string
  }) => void
  handleSnackbarClose: (event?: SyntheticEvent, reason?: string) => void
}

export const SnackbarContextDefaults: SnackbarContextType = {
  snackbar: {
    isOpen: false,
    message: '',
    severity: 'error',
  },
  handleSnackbarOpen: () => {},
  handleSnackbarClose: () => {},
}

export const SnackbarStateContext = createContext<
  Pick<SnackbarContextType, 'snackbar'>
>({ ...SnackbarContextDefaults })

export const SnackbarHandlerContext = createContext<
  Pick<SnackbarContextType, 'handleSnackbarOpen' | 'handleSnackbarClose'>
>({ ...SnackbarContextDefaults })

const SnackbarContextProviderContainer: FC = ({ children }) => {
  const { snackbar, handleSnackbarOpen, handleSnackbarClose } = useSnackbar(
    SnackbarContextDefaults.snackbar
  )

  return (
    <SnackbarStateContext.Provider
      value={{
        snackbar,
      }}
    >
      <SnackbarHandlerContext.Provider
        value={{
          handleSnackbarOpen,
          handleSnackbarClose,
        }}
      >
        {children}
      </SnackbarHandlerContext.Provider>
    </SnackbarStateContext.Provider>
  )
}

export default SnackbarContextProviderContainer
