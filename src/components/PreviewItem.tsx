import { Preview } from '@/types/Preview'
import {
  Avatar,
  Divider,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'

const PreviewItem: FC<Omit<Preview, 'message'>> = ({
  url,
  text,
  sentAt,
  name,
  room,
}) => (
  <>
    <ListItemButton
      alignItems='flex-start'
      component={NavLink}
      to={`/rooms/${room}`}
    >
      <ListItemAvatar>
        <Avatar alt={name} src={url} />
      </ListItemAvatar>
      <ListItemText
        primary={text}
        secondary={
          <Typography sx={{ display: 'inline' }} component='span'>
            {name}
          </Typography>
        }
      />
    </ListItemButton>
    <Divider variant='inset' component='li' />
  </>
)

export default PreviewItem
