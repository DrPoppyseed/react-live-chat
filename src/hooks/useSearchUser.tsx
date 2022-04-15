import Users from '@/entities/Users'
import { User } from '@/types/User'
import { FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'
import { useMemo, useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const useSearchUser = (firestore: Firestore, firebaseApp: FirebaseApp) => {
  const [publicUserId, setPublicUserId] = useState('')
  const [data, loading, error] = useCollectionData(
    new Users(firestore, firebaseApp).searchUser(publicUserId)
  )
  const auth = useMemo(() => getAuth(firebaseApp), [firebaseApp])

  const matchedUsers = useMemo<User[]>(() => {
    return data && data?.length
      ? (data as User[]).filter((user) => user.id !== auth.currentUser?.uid)
      : []
  }, [data])

  return { setPublicUserId, matchedUsers, loading, error }
}

export default useSearchUser
