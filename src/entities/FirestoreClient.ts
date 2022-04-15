import { FirebaseApp } from 'firebase/app'
import { getAuth, User } from 'firebase/auth'
import { collection, CollectionReference, Firestore } from 'firebase/firestore'

export default class FirestoreClient {
  protected readonly collectionRef: CollectionReference
  protected readonly user: User
  protected readonly db: Firestore

  constructor(firestore: Firestore, firebaseApp: FirebaseApp, path: string) {
    this.collectionRef = FirestoreClient.setCollectionRef(firestore, path)!
    this.user = FirestoreClient.setUser(firebaseApp)!
    this.db = firestore
  }

  protected static setUser = (firebaseApp: FirebaseApp): User | null => {
    const auth = getAuth(firebaseApp)
    if (!auth) throw new Error('User not authenticated')
    return auth.currentUser
  }

  protected static setCollectionRef = (
    firestore: Firestore,
    path: string
  ): CollectionReference | null => {
    const collectionRef = collection(firestore, path)
    if (!collectionRef)
      throw new Error(`Failed to reference collection: ${path}`)
    return collectionRef
  }
}
