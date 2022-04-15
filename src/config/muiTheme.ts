import { createTheme } from '@mui/material'

const MuiTheme = createTheme({
  components: {
    MuiIconButton: {
      defaultProps: {
        size: 'large',
        color: 'inherit',
      },
    },
    MuiButton: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        type: 'text',
        fullWidth: true,
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'inherit',
        elevation: 0,
        variant: 'outlined',
      },
    },
  },
})

export default MuiTheme
