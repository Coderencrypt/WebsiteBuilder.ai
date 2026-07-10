// import axios from 'axios'
// import React from 'react'
// import { useEffect } from 'react'
// import {serverUrl} from '../App'
// import { useDispatch } from 'react-redux'
// import { setUserData } from '../redux/userSlice'

// function useGetCurrentUser() {
// const dispatch = useDispatch()
//   useEffect(()=>{
//     const getCurrentUser = async ()=> {
//         try {
//             const result = await axios.get(`${serverUrl}/api/user/me`,
//             {withCredentials:true})
//             dispatch(setUserData(result.data))
//         } catch (error) {
//             console.log(error)
//         }
//     }
//   },[])
// }

// export default useGetCurrentUser


import axios from 'axios'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function useGetCurrentUser() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/me`, {
                withCredentials: true
            })
            dispatch(setUserData(result.data))
        } catch (error) {
            console.error("Failed to fetch current user:", error)
        }
    }

    getCurrentUser() // 🚀 FIX 1: Explicitly invoke the function here!
  }, [dispatch]) // Good practice: Include dispatch in dependencies
}

export default useGetCurrentUser // 🚀 FIX 2: Cleaned up trailing text/syntax error