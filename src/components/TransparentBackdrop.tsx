import { Backdrop, CircularProgress, styled, Typography } from '@mui/material'
import { FC } from 'react'

type TransparentBackdropProps = {
  open: boolean
}

const TransparentBackdrop: FC<TransparentBackdropProps> = ({ open }) => {
  return (
    <BackdropContainer open={open}>
      <Typography>Loading</Typography>
      <CircularProgress color='inherit' />
    </BackdropContainer>
  )
}

const BackdropContainer = styled(Backdrop)(({ theme }) => ({
  color: `${theme.palette.primary}`,
  zIndex: theme.zIndex.drawer + 1,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  '> p': {
    marginBottom: theme.spacing(2),
  },
}))

export default TransparentBackdrop
