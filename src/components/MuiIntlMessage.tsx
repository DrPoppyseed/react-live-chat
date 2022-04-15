import { Typography } from '@mui/material'
import { FC } from 'react'
import { FormattedMessage } from 'react-intl'

const MuiIntlMessage: FC<{ id: string }> = ({ id }) => (
  <Typography>
    <FormattedMessage id={id} />
  </Typography>
)

export default MuiIntlMessage
