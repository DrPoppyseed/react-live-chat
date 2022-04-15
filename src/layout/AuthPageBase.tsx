import GoBackHeader from '@/components/PageHeader'
import FlexGrow from '@/layout/FlexGrow'
import Space from '@/layout/Space'
import { Box, styled, Typography } from '@mui/material'
import { FC, FormEventHandler } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

type AuthPageBaseProps = {
  title: string
  bottomText: string
  redirectText: string
  redirectTo: string
  onSubmit: FormEventHandler<HTMLFormElement>
}

const AuthPageBase: FC<AuthPageBaseProps> = ({
  children,
  title,
  redirectTo,
  redirectText,
  bottomText,
  onSubmit,
}) => {
  return (
    <Box>
      <GoBackHeader removeGoBack removeOutline />
      <AuthPageBaseContainer>
        <TitleContainer>
          <Typography variant='h4'>
            <FormattedMessage id={title} />
          </Typography>
        </TitleContainer>
        <FieldsContainer onSubmit={onSubmit}>{children}</FieldsContainer>
        <FlexGrow />
        <BottomTextContainer>
          <Typography>
            <FormattedMessage id={bottomText} />
          </Typography>
          <Space />
          <Link to={redirectTo}>
            <FormattedMessage id={redirectText} />
          </Link>
        </BottomTextContainer>
      </AuthPageBaseContainer>
    </Box>
  )
}

const AuthPageBaseContainer = styled(Box)(({ theme }) => ({
  height: `calc(100% - ${theme.spacing(8)})`,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

const TitleContainer = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  margin: `${theme.spacing(2)} 0`,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
}))

const FieldsContainer = styled('form')(({ theme }) => ({
  padding: theme.spacing(2),
}))

const BottomTextContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}))

export default AuthPageBase
