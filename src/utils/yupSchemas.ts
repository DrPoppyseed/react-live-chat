import { SignInForm, SignUpForm } from '@/types/Forms'
import * as yup from 'yup'
import { SchemaOf } from 'yup'

export const MessageFormSchema = yup.object().shape({
  text: yup.string(),
})

export const AddFriendFormSchema = yup.object().shape({
  publicUserId: yup.string(),
})

export const SignInFormSchema: SchemaOf<SignInForm> = yup.object().shape({
  email: yup.string().email().required('please enter email'),
  password: yup.string().required('email is required'),
})

export const SignUpFormSchema: SchemaOf<SignUpForm> = yup.object().shape({
  name: yup.string().required('place enter username'),
  email: yup.string().email().required('please enter email'),
  password: yup
    .string()
    .required('email is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
})
