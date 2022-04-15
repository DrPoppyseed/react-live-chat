import FirestoreClient from '@/entities/FirestoreClient'
import { friendRequestFactory, userFactory } from '@/factories/User'
import { FirebaseApp } from 'firebase/app'
import {
  arrayUnion,
  doc,
  Firestore,
  limit,
  Query,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'

export default class Users extends FirestoreClient {
  constructor(firestore: Firestore, firebaseApp: FirebaseApp) {
    super(firestore, firebaseApp, 'users')
  }

  public getUser = (): Query => {
    // TODO: handle invalid user id properly
    return query(
      this.collectionRef,
      where('id', '==', this.user?.uid ?? ''),
      limit(1)
    )
  }

  public searchUser = (publicUserId: string): Query => {
    return query(
      this.collectionRef,
      where('publicUserId', '==', publicUserId),
      limit(5)
    )
  }

  public sendFriendRequest = async (requested: string): Promise<void> => {
    if (requested === this.user.uid)
      throw new Error('Error: cannot send friend request to yourself.')
    if (requested === '')
      throw new Error(
        "Error: cannot send friend request to user with blank id (where id: '')"
      )

    const friendRequest = friendRequestFactory({
      requester: this.user.uid,
      requested,
    })
    await updateDoc(doc(this.collectionRef, requested), {
      friend_requests: arrayUnion(friendRequest),
    })
  }

  public createUser = async ({ name }: { name: string }): Promise<void> => {
    const newUser = userFactory({
      uid: this.user.uid,
      url: this.user.photoURL,
      name,
    })
    await setDoc(doc(this.db, 'users', this.user.uid), newUser)
  }
}
