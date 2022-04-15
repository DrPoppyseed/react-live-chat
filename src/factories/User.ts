import { FriendRequest, User } from '@/types/User'
import { nanoid } from 'nanoid'

export const userFactory = ({
  uid,
  name,
  url,
}: {
  uid: string
  name: string
  url: string | null
}): User => {
  return {
    id: uid,
    name,
    url: url || '',
    friends: [],
    friend_requests: [],
    rooms: [],
    previews: [],
    publicUserId: '',
  }
}

export const friendRequestFactory = ({
  requester,
  requested,
}: {
  requester: string
  requested: string
}): FriendRequest => {
  return {
    id: nanoid(),
    createdAt: new Date().toISOString(),
    requester,
    requested,
  }
}
