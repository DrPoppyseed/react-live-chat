import { Divider, styled } from '@mui/material'
import { FC } from 'react'

const PaddedDivider: FC = ({ children }) => (
  <DividerBase>{children}</DividerBase>
)

const DividerBase = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}))

export default PaddedDivider
