import { Cancel } from '@mui/icons-material'
import { Avatar, Badge, styled } from '@mui/material'
import { FC } from 'react'

type ActionableBadgeProps = {
  onClick: any
}

const ActionableBadge: FC<ActionableBadgeProps> = ({ onClick }) => {
  return (
    <BadgeBase
      overlap={'circular'}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      badgeContent={<Cancel />}
      onClick={onClick}
    >
      <Avatar
        alt={''}
        src={''}
        sx={{
          height: '36px',
          width: '36px',
        }}
      />
    </BadgeBase>
  )
}

const BadgeBase = styled(Badge)(({ theme }) => ({
  margin: theme.spacing(1),
}))

export default ActionableBadge
