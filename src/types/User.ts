import { Preview } from '@/types/Preview'

export type Friend = {
  id: string
  name: string
  url: string
}

export type FriendRequest = {
  id: string
  createdAt: string
  requester: string
  requested: string
}

export type User = {
  id: string
  name: string
  url: string
  friends: Friend[]
  friend_requests: FriendRequest[]
  rooms: string[]
  previews: Preview[]
  publicUserId: string
}
