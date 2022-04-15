import ActionableTextField from '@/components/ActionableTextField'
import Avatar from '@/components/Avatar'
import MessageItem from '@/components/MessageItem'
import GoBackHeader from '@/components/PageHeader'
import { firebaseApp, firestore } from '@/config/firebase'
import Messages from '@/entities/Messages'
import useGetMessages from '@/hooks/useGetMessages'
import useGetUser from '@/hooks/useGetUser'
import { useSnackbarHandler } from '@/hooks/useSnackbar'
import FlexGrow from '@/layout/FlexGrow'
import { MessageFormSchema } from '@/utils/yupSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Send, Settings } from '@mui/icons-material'
import {
  Box,
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from '@mui/material'
import { useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { AnyObjectSchema } from 'yup'

export type MessageForm = {
  text: string
}

const RoomPage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { handleSnackbarOpen } = useSnackbarHandler()
  const { room } = useParams()
  const { user, loading: userLoading } = useGetUser(firestore, firebaseApp)
  const { messages, loading: messagesLoading } = useGetMessages(
    firestore,
    firebaseApp,
    room ?? ''
  )

  const { handleSubmit, register, reset } = useForm<MessageForm>({
    resolver: yupResolver<AnyObjectSchema>(MessageFormSchema),
  })

  const submitMessage: SubmitHandler<MessageForm> = async (
    formData
  ): Promise<void> => {
    try {
      const messages = new Messages(firestore, firebaseApp)
      await messages.sendMessage({ room: room || null, text: formData.text })
      ref.current?.scrollIntoView()
      reset()
    } catch (error) {
      console.log(error)
      handleSnackbarOpen({ message: 'メッセージ送信に失敗しました' })
    }
  }

  return (
    <BodyContainer>
      {room && !userLoading && !messagesLoading && user ? (
        <>
          <GoBackHeader>
            <Avatar src={user.url} alt={user.name} sx={{ marginRight: 1 }} />
            <Typography>User name</Typography>
            <FlexGrow />
            <IconButton edge={'end'}>
              <Settings />
            </IconButton>
          </GoBackHeader>
          <MessagesContainer>
            {messages.map((message) => (
              <MessageItem
                url={user.url}
                id={user.id}
                text={message.text}
                user={message.user}
                key={message.id}
              />
            ))}
            <div ref={ref} />
          </MessagesContainer>
          <MessageBoxContainer>
            <ActionableTextField
              register={register('text')}
              adornment={<Send />}
              onSubmit={handleSubmit(submitMessage)}
            />
          </MessageBoxContainer>
        </>
      ) : (
        <CenterProgress>
          <CircularProgress />
        </CenterProgress>
      )}
    </BodyContainer>
  )
}

const BodyContainer = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'grid',
  gridTemplateRows: `${theme.spacing(7)} auto ${theme.spacing(7)}`,
}))

const MessagesContainer = styled(Box)(() => ({
  gridRowStart: 2,
  gridRowEnd: 'span 1',
  overflowY: 'auto',
}))

const MessageBoxContainer = styled(Box)(({ theme }) => ({
  gridRowStart: 3,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
}))

const CenterProgress = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export default RoomPage
