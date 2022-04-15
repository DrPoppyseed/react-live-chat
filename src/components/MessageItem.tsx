import Avatar from '@/components/Avatar'
import { Message } from '@/types/Message'
import { User } from '@/types/User'
import { Box, Card, styled, Typography } from '@mui/material'
import { FC } from 'react'

type MessageItemProps = Pick<Message, 'text' | 'user'> &
  Pick<User, 'url' | 'id'>

const MessageItem: FC<MessageItemProps> = ({ url, id, text, user }) => {
  const isSender = user === id
  return (
    <MessageItemContainer isSender={isSender}>
      {!isSender && <Avatar src={url} alt={user} sx={{ marginRight: 1 }} />}
      <MessageBubble
        elevation={0}
        variant={isSender ? 'elevation' : 'outlined'}
        isSender={isSender}
      >
        <Typography>{text}</Typography>
      </MessageBubble>
    </MessageItemContainer>
  )
}

const MessageItemContainer = styled(Box)<{ isSender: boolean }>(
  ({ isSender, theme }) => ({
    wordWrap: 'break-word',
    display: 'flex',
    flexDirection: isSender ? 'row-reverse' : 'row',
    alignItems: 'flex-end',
    margin: theme.spacing(1),
  })
)

const MessageBubble = styled(Card)<{ isSender: boolean }>(
  ({ isSender, theme }) => ({
    backgroundColor: isSender
      ? `${theme.palette.action.disabledBackground}`
      : 'inherit',
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(2),
  })
)

export default MessageItem
