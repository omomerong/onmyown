// queries/useUserData.js
import { useQuery } from '@tanstack/react-query'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../../firebase.config'

// export const useUser = async () => {
//   const userQuery = query(collection(db, '/users'))
//   const userData = await getDocs(userQuery)
//   return userData.docs
// }

// TODO: stale time 설정
export function useUser() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const usersRef = collection(db, '/users')
      const userQuery = query(usersRef)
      const userData = await getDocs(userQuery)
      return userData.docs
    },
  })
}
