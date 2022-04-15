import { User } from '@/types/User'

export type SignInForm = {
  email: string
  password: string
}

export type SignUpForm = SignInForm & {
  name: string
}

export type AddFriendForm = Pick<User, 'publicUserId'>
