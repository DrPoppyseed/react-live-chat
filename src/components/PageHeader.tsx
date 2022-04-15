import { ArrowBack } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type PageHeaderProps = {
  to?: string
  removeGoBack?: boolean
  removeOutline?: boolean
}

const PageHeader: FC<PageHeaderProps> = ({
  children,
  to = '/',
  removeGoBack = false,
  removeOutline = false,
}) => (
  <AppBar position='static' variant={removeOutline ? 'elevation' : 'outlined'}>
    <Toolbar>
      {!removeGoBack && (
        <IconButton
          component={RouterLink}
          to={to}
          edge='start'
          aria-label='go back to home page'
        >
          <ArrowBack />
        </IconButton>
      )}
      {children}
    </Toolbar>
  </AppBar>
)

export default PageHeader
