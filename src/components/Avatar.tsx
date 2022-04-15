import { Avatar as MuiAvatar, styled } from '@mui/material'
import { FC } from 'react'

type AvatarSizes = 'verySmall' | 'small' | 'normal'

type AvatarProps = {
  src: string
  alt: string
  size?: AvatarSizes
  sx?: any
}

const Avatar: FC<AvatarProps> = ({ src, alt, size = 'normal', sx }) => {
  const spacings = { verySmall: 3, small: 4, normal: 6 }

  return (
    <AvatarContainer src={src} alt={alt} spacings={spacings[size]} sx={sx} />
  )
}

const AvatarContainer = styled(MuiAvatar)<{ spacings: number }>(
  ({ theme, spacings }) => ({
    height: theme.spacing(spacings),
    width: theme.spacing(spacings),
  })
)

export default Avatar
