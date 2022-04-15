import GithubIcon from '@/assets/GithubIcon'
import GoogleIcon from '@/assets/GoogleIcon'
import PasswordTextField from '@/components/PasswordTextField'
import SocialAuthButton from '@/components/SocialAuthButton'
import { firebaseApp, firestore } from '@/config/firebase'
import Users from '@/entities/Users'
import { useSnackbarHandler } from '@/hooks/useSnackbar'
import AuthPageBase from '@/layout/AuthPageBase'
import PaddedDivider from '@/layout/PaddedDivider'
import { SignUpForm } from '@/types/Forms'
import { SignUpFormSchema } from '@/utils/yupSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, styled, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useEffect, useMemo } from 'react'
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate()
  const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp])
  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const [signInWithGithub] = useSignInWithGithub(auth)
  const { handleSnackbarOpen } = useSnackbarHandler()

  const { register, handleSubmit } = useForm<SignUpForm>({
    resolver: yupResolver(SignUpFormSchema),
  })

  useEffect(() => {
    if (auth?.currentUser) {
      navigate('/')
    }
  }, [navigate, auth])

  const signup: SubmitHandler<SignUpForm> = async (formData): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      const user = new Users(firestore, firebaseApp)
      await user.createUser({ name: formData.name })
      navigate('/')
    } catch (error) {
      console.log(error)
      handleSnackbarOpen({ message: 'アカウント作成に失敗しました。' })
    }
  }

  return (
    <AuthPageBase
      title='signup_page.title'
      redirectText='signup_page.redirect_text'
      bottomText='signup_page.bottom_text'
      redirectTo='/signin'
      onSubmit={handleSubmit(signup)}
    >
      <AuthTextField
        {...register('name')}
        label={<FormattedMessage id='auth_textfield.label.name' />}
        autoFocus
      />
      <AuthTextField
        {...register('email')}
        label={<FormattedMessage id='auth_textfield.label.email' />}
        autoComplete='username'
      />
      <PasswordTextField register={register('password')} />
      <AuthButton
        disableElevation
        variant='contained'
        type='submit'
        value='submit'
      >
        <Typography variant='button'>
          <FormattedMessage id='signup_page.signup_button' />
        </Typography>
      </AuthButton>
      <PaddedDivider>or</PaddedDivider>
      <SocialAuthButton
        onClick={() => signInWithGoogle()}
        label='signin_page.social_button.google'
        icon={<GoogleIcon />}
      />
      <SocialAuthButton
        onClick={() => signInWithGithub()}
        label='signin_page.social_button.github'
        icon={<GithubIcon />}
      />
    </AuthPageBase>
  )
}

const AuthTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const AuthButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  '> span': {
    color: theme.palette.background.default,
  },
}))

export default SignUpPage
