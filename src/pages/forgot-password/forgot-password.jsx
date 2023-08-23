import React, { useEffect } from 'react'

const ForgotPassword = () => {
  useEffect(() => {

  })

  const forgotPass = async () => {
    await fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      body: JSON
    }).then(response => response.success && response.message)
    .catch(err => err.message)
  }
  return (
    <main><section styel>Вход</section></main>
  )
}

export default ForgotPassword