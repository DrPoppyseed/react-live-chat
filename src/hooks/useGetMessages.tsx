import Messages from '@/entities/Messages'
import { Message } from '@/types/Message'
import { FirebaseApp } from 'firebase/app'
import { Firestore } from 'firebase/firestore'
import { useMemo } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const useGetMessages = (
  firestore: Firestore,
  firebaseApp: FirebaseApp,
  room: string
) => {
  const [data, loading, error] = useCollectionData(
    new Messages(firestore, firebaseApp).getMessages({ room })
  )

  const messages = useMemo<Message[]>(() => {
    return data ? data[0].messages : []
  }, [data])

  return { messages, loading, error }
}

export default useGetMessages
