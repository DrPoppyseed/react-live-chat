import ActionableBadge from '@/components/ActionableBadge'
import CheckboxFriendItem from '@/components/CheckboxFriendItem'
import MuiIntlMessage from '@/components/MuiIntlMessage'
import GoBackHeader from '@/components/PageHeader'
import { firebaseApp, firestore } from '@/config/firebase'
import useGetUser from '@/hooks/useGetUser'
import FlexGrow from '@/layout/FlexGrow'
import { Friend } from '@/types/User'
import { Box, Button, Container, List, styled, TextField } from '@mui/material'
import Fuse from 'fuse.js'
import React, { ChangeEvent, useMemo, useState } from 'react'

const CreateRoomPage = () => {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [filter, setFilter] = useState('')
  const { user, loading } = useGetUser(firestore, firebaseApp)
  const fuse = useMemo(() => new Fuse(user?.friends ?? []), [Fuse, user])

  const filteredFriends: Friend[] = filter
    ? fuse.search(filter).map((el) => el.item)
    : user?.friends || []

  const handleOnChange = ({
    currentTarget,
  }: {
    currentTarget: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >['currentTarget']
  }) => {
    setFilter(currentTarget.value)
  }

  const handleSelectFriend = (friend: string): void => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(
        selectedFriends.filter((selectedFriend) => selectedFriend !== friend)
      )
    } else {
      setSelectedFriends([...selectedFriends, friend])
    }
  }

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {loading ? (
        'loading'
      ) : (
        <>
          <GoBackHeader>
            <MuiIntlMessage id='create_room_page.header' />
            <FlexGrow />
            <Button>Next</Button>
          </GoBackHeader>
          <BodyContainer>
            <TextField onChange={handleOnChange} />
            {selectedFriends.length ? (
              <SelectedFriendsAvatars>
                {selectedFriends.map((selectedFriend) => (
                  <ActionableBadge
                    onClick={() => handleSelectFriend(selectedFriend)}
                    key={selectedFriend}
                  />
                ))}
              </SelectedFriendsAvatars>
            ) : null}
            <List sx={{ margin: '0 -20px' }}>
              {filteredFriends.length ? (
                filteredFriends.map((friend) => {
                  return (
                    <CheckboxFriendItem
                      friend={friend}
                      key={friend.id}
                      selectFriend={handleSelectFriend}
                      selectedFriends={selectedFriends}
                    />
                  )
                })
              ) : (
                <NoMatchingFriendsText>
                  <MuiIntlMessage id='create_room_page.friend_not_found' />
                </NoMatchingFriendsText>
              )}
            </List>
          </BodyContainer>
        </>
      )}
    </Box>
  )
}

const BodyContainer = styled(Container)(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(14)})`,
  margin: `${theme.spacing(2)} 0`,
  display: 'flex',
  flexDirection: 'column',
}))

const SelectedFriendsAvatars = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const NoMatchingFriendsText = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export default CreateRoomPage
