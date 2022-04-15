import { Button, styled } from '@mui/material'
import { FC, ReactNode } from 'react'
import { FormattedMessage } from 'react-intl'

type SocialAuthButtonProps = {
  onClick: () => void
  icon: ReactNode | JSX.Element
  label: string
}

const SocialAuthButton: FC<SocialAuthButtonProps> = ({
  onClick,
  icon,
  label,
}) => {
  return (
    <SocialAuthButtonBase onClick={onClick} variant='outlined'>
      {icon}
      <FormattedMessage id={label} />
    </SocialAuthButtonBase>
  )
}

const SocialAuthButtonBase = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
  borderColor: theme.palette.text.disabled,
  '> svg': {
    marginRight: theme.spacing(1),
  },
}))

export default SocialAuthButton
