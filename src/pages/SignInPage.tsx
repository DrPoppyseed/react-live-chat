import GithubIcon from '@/assets/GithubIcon'
import GoogleIcon from '@/assets/GoogleIcon'
import PasswordTextField from '@/components/PasswordTextField'
import SocialAuthButton from '@/components/SocialAuthButton'
import { firebaseApp } from '@/config/firebase'
import { useSnackbarHandler } from '@/hooks/useSnackbar'
import AuthPageBase from '@/layout/AuthPageBase'
import PaddedDivider from '@/layout/PaddedDivider'
import { SignInForm } from '@/types/Forms'
import { SignInFormSchema } from '@/utils/yupSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, styled, TextField, Typography } from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useMemo } from 'react'
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {
  const navigate = useNavigate()
  const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp])
  const [signInWithGoogle] = useSignInWithGoogle(auth)
  const [signInWithGithub] = useSignInWithGithub(auth)
  const { handleSnackbarOpen } = useSnackbarHandler()

  const { register, handleSubmit } = useForm<SignInForm>({
    resolver: yupResolver(SignInFormSchema),
  })

  useEffect(() => {
    if (auth?.currentUser) {
      navigate('/')
    }
  }, [navigate, auth])

  const signin: SubmitHandler<SignInForm> = async (formData): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password)
      navigate('/')
    } catch (error) {
      console.log(error)
      handleSnackbarOpen({ message: 'ログインに失敗しました。' })
    }
  }

  return (
    <AuthPageBase
      title='signin_page.title'
      redirectText='signin_page.redirect_text'
      bottomText='signin_page.bottom_text'
      redirectTo='/signup'
      onSubmit={handleSubmit(signin)}
    >
      <AuthTextField
        {...register('email')}
        label={<FormattedMessage id='auth_textfield.label.email' />}
        autoComplete='username'
        autoFocus
      />
      <PasswordTextField register={register('password')} />
      <AuthButton type='submit'>
        <Typography variant='button'>
          <FormattedMessage id='signin_page.signin_button' />
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
  backgroundColor: theme.palette.info.main,
  marginTop: theme.spacing(2),
  '> span': {
    color: theme.palette.background.default,
  },
}))

export default SignInPage
