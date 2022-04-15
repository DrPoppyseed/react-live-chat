import FirestoreClient from '@/entities/FirestoreClient'
import { Message } from '@/types/Message'
import { FirebaseApp } from 'firebase/app'
import {
  arrayUnion,
  doc,
  Firestore,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'

export default class Messages extends FirestoreClient {
  constructor(firestore: Firestore, firebaseApp: FirebaseApp) {
    super(firestore, firebaseApp, 'rooms')
  }

  private createNewMessageObject = ({
    room,
    text,
  }: {
    room: string
    text: string
  }): Message => {
    return {
      id: nanoid(),
      room,
      text,
      sentAt: new Date().toISOString(),
      user: this.user.uid,
    }
  }

  public sendMessage = async ({
    room,
    text,
  }: {
    room: string | null
    text: string
  }): Promise<void> => {
    if (!room) throw new Error('Room is not specified')
    const message = this.createNewMessageObject({ room, text })
    await updateDoc(doc(this.collectionRef, room), {
      messages: arrayUnion(message),
    })
  }

  public getMessages = ({ room }: { room: string }) => {
    return query(this.collectionRef, where('room', '==', room), limit(25))
  }
}
