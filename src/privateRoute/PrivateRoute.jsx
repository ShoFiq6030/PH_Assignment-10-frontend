import React from 'react'
import { useAuth } from '../hooks/useAuth'

export default function PrivateRoute({children}) {
const {user}=useAuth()
if (!user){
    return
}

  return (
    <>{children}</>
  )
}
