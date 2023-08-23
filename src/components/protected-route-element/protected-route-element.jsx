import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRouteElement = ({element}) => {
   const [isAuth, setIsAuth] = useState(false)
   const navigate = useNavigate()

   const getUser = async () => {
      await f
   }
  return (
    {isAuth ? element : navigate('/login', {replace: true})}
  )
}

export default ProtectedRouteElement