import { SnackbarContextType } from '@/contexts/SnackbarContext'
import {
  Alert as MuiAlert,
  AlertProps,
  Snackbar as MuiSnackbar,
} from '@mui/material'
import { FC, forwardRef } from 'react'

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} variant='filled' {...props} ref={ref} />
))

const Snackbar: FC<
  Pick<SnackbarContextType, 'snackbar' | 'handleSnackbarClose'>
> = ({ snackbar, handleSnackbarClose }) => {
  return (
    <MuiSnackbar
      open={snackbar.isOpen}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={2500}
      onClose={() => handleSnackbarClose()}
    >
      <Alert onClose={handleSnackbarClose} severity='error'>
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  )
}

export default Snackbar
