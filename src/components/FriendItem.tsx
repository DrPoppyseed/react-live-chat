import Avatar from '@/components/Avatar'
import { User } from '@/types/User'
import { AddCircleOutline } from '@mui/icons-material'
import {
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from '@mui/material'
import { FC } from 'react'

const FriendItem: FC<Pick<User, 'name' | 'url'> & { onClick: () => void }> = ({
  name,
  url,
  onClick,
}) => {
  return (
    <FriendItemBase
      secondaryAction={
        <IconButton onClick={onClick} edge='end'>
          <AddCircleOutline />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar alt={name} src={url} size='small' />
      </ListItemAvatar>
      <ListItemText primary={name} />
    </FriendItemBase>
  )
}

const FriendItemBase = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export default FriendItem
