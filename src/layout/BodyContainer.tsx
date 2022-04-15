import { Container, styled } from '@mui/material'
import { FC } from 'react'

const BodyContainer: FC = ({ children }) => <Body>{children}</Body>

const Body = styled(Container)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}))

export default BodyContainer
