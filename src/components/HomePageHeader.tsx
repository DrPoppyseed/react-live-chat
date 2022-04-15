import PageHeader from '@/components/PageHeader'
import FlexGrow from '@/layout/FlexGrow'
import {
  AccountCircle,
  AddComment,
  PersonAdd,
  Settings,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const HomePageHeader = () => {
  return (
    <PageHeader removeGoBack removeOutline>
      <IconButton
        component={RouterLink}
        to='profile'
        edge='start'
        aria-label='profile of current user'
      >
        <AccountCircle />
      </IconButton>
      <FlexGrow />
      <IconButton
        component={RouterLink}
        to='add-friend'
        edge='end'
        aria-label='add friend'
      >
        <PersonAdd />
      </IconButton>
      <IconButton
        component={RouterLink}
        to='create-room'
        edge='end'
        aria-label='create new room'
      >
        <AddComment />
      </IconButton>
      <IconButton
        component={RouterLink}
        to='settings'
        edge='end'
        aria-label='app settings'
      >
        <Settings />
      </IconButton>
    </PageHeader>
  )
}

export default HomePageHeader
