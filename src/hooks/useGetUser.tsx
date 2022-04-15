import Users from '@/entities/Users'
import { Preview } from '@/types/Preview'
import { User } from '@/types/User'
import { FirebaseApp } from 'firebase/app'
import { Firestore } from 'firebase/firestore'
import { useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const useGetUser = (firestore: Firestore, firebaseApp: FirebaseApp) => {
  const [data, loading, error] = useCollectionData(
    new Users(firestore, firebaseApp).getUser()
  )

  const user = useMemo<User | null>(() => {
    return data && data?.length ? (data[0] as User) : null
  }, [data])

  const previews = useMemo<Preview[]>(() => {
    return data && data?.length ? data[0].previews : []
  }, [data])

  return { user, previews, loading, error }
}

export default useGetUser
