import ActionableTextField from '@/components/ActionableTextField'
import FriendItem from '@/components/FriendItem'
import MuiIntlMessage from '@/components/MuiIntlMessage'
import GoBackHeader from '@/components/PageHeader'
import { firebaseApp, firestore } from '@/config/firebase'
import Users from '@/entities/Users'
import useSearchUser from '@/hooks/useSearchUser'
import { useSnackbarHandler } from '@/hooks/useSnackbar'
import BodyContainer from '@/layout/BodyContainer'
import { AddFriendForm } from '@/types/Forms'
import { AddFriendFormSchema } from '@/utils/yupSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Search } from '@mui/icons-material'
import { Box } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'

const AddFriendPage = () => {
  const { handleSnackbarOpen } = useSnackbarHandler()
  const { setPublicUserId, matchedUsers, loading } = useSearchUser(
    firestore,
    firebaseApp
  )
  const { handleSubmit, register } = useForm<AddFriendForm>({
    resolver: yupResolver(AddFriendFormSchema),
  })

  const submitIdOrFriend: SubmitHandler<AddFriendForm> = async (
    formData
  ): Promise<void> => {
    setPublicUserId(formData.publicUserId)
  }

  const handleSendFriendRequest = async (id: string): Promise<void> => {
    try {
      const user = new Users(firestore, firebaseApp)
      await user.sendFriendRequest(id)
    } catch (error) {
      console.log(error)
      handleSnackbarOpen({ message: '友達申請の送信に失敗しました。' })
    }
  }

  return (
    <Box>
      <GoBackHeader>
        <MuiIntlMessage id='add_friend_page.header' />
      </GoBackHeader>
      <BodyContainer>
        <ActionableTextField
          register={register('publicUserId')}
          adornment={<Search />}
          onSubmit={handleSubmit(submitIdOrFriend)}
        />
        {loading
          ? 'loading...'
          : matchedUsers.length
          ? matchedUsers.map(({ name, url, id }) => (
              <FriendItem
                key={id}
                name={name}
                url={url}
                onClick={() => handleSendFriendRequest(id)}
              />
            ))
          : 'non matched'}
      </BodyContainer>
    </Box>
  )
}

export default AddFriendPage
