import Snackbar from '@/components/Snackbar'
import TransparentBackdrop from '@/components/TransparentBackdrop'
import { firebaseApp } from '@/config/firebase'
import { useSnackbarHandler, useSnackbarState } from '@/hooks/useSnackbar'
import RoomsPage from '@/pages/HomePage'
import ProtectedRoute from '@/utils/ProtectedRoute'
import { getAuth } from 'firebase/auth'
import { lazy, Suspense } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Route, Routes } from 'react-router-dom'

const RoomPage = lazy(() => import('./pages/RoomPage'))
const SignInPage = lazy(() => import('./pages/SignInPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const CreateRoomPage = lazy(() => import('./pages/CreateRoomPage'))
const AddFriendPage = lazy(() => import('./pages/AddFriendPage'))

const App = () => {
  const [user, loading] = useAuthState(getAuth(firebaseApp))
  const { snackbar } = useSnackbarState()
  const { handleSnackbarClose } = useSnackbarHandler()

  return (
    <Suspense fallback={<TransparentBackdrop open />}>
      {!loading && user && (
        <Routes>
          <Route index element={<RoomsPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='create-room' element={<CreateRoomPage />} />
          <Route path='add-friend' element={<AddFriendPage />} />
          <Route
            path='rooms/:room'
            element={
              <ProtectedRoute user={user}>
                <RoomPage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      )}
      {!loading && !user && (
        <Routes>
          <Route index element={<SignInPage />} />
          <Route path='signin' element={<SignInPage />} />
          <Route path='signup' element={<SignUpPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      )}
      {loading && <TransparentBackdrop open />}
      <Snackbar snackbar={snackbar} handleSnackbarClose={handleSnackbarClose} />
    </Suspense>
  )
}

export default App
