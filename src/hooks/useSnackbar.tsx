import {
  Snackbar,
  SnackbarHandlerContext,
  SnackbarStateContext,
} from '@/contexts/SnackbarContext'
import { SyntheticEvent, useContext, useState } from 'react'

const useSnackbarCore = (initialState: Snackbar) => {
  const [snackbar, setSnackbar] = useState<Snackbar>(initialState)

  const handleSnackbarOpen = ({
    message,
    severity = 'error',
  }: {
    message: string
    severity?: string
  }) => {
    setSnackbar({
      isOpen: true,
      message,
      severity,
    })
  }

  const handleSnackbarClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return
    setSnackbar({
      isOpen: false,
      message: '',
    })
  }

  return { snackbar, handleSnackbarClose, handleSnackbarOpen }
}

export const useSnackbarState = () => useContext(SnackbarStateContext)

export const useSnackbarHandler = () => useContext(SnackbarHandlerContext)

export default useSnackbarCore
