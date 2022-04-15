import { User } from 'firebase/auth'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  user?: User | null
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, user }) => {
  return user ? <>{children}</> : <Navigate to='/signin' />
}

export default ProtectedRoute
