import { Friend } from '@/types/User'
import {
  Avatar,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { FC } from 'react'

type CheckboxFriendItemProps = {
  friend: Friend
  selectFriend: (friend: string) => void
  selectedFriends: string[]
}

const CheckboxFriendItem: FC<CheckboxFriendItemProps> = ({
  friend,
  selectFriend,
  selectedFriends,
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => selectFriend(friend.id)} dense>
        <ListItemIcon>
          <Checkbox
            edge='end'
            checked={selectedFriends.includes(friend.id)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemAvatar>
          <Avatar alt={friend.name} src={friend.url} />
        </ListItemAvatar>
        <ListItemText primary={friend} />
      </ListItemButton>
    </ListItem>
  )
}

export default CheckboxFriendItem
