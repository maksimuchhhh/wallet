import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MONOBANK_API_URL, MONOBANK_TOKEN_KEY, MONOBANK_IS_VALID_TOKEN } from '../constants'
import LocalStorage from '../utils/localStorage'
import { notification } from 'antd'

function MonobankAuth() {
  const [token, setToken] = useState(LocalStorage.get(MONOBANK_TOKEN_KEY) || '')

  const navigate = useNavigate()

  const clearToken = () => {
    localStorage.removeItem(MONOBANK_TOKEN_KEY)
    localStorage.removeItem(MONOBANK_IS_VALID_TOKEN)
    setToken('')
  }
  const saveToken = () => {
    LocalStorage.set(MONOBANK_TOKEN_KEY, token)
    localStorage.setItem(MONOBANK_IS_VALID_TOKEN, 'true')
  }
  const fetchPersonalData = async () => {
    const requestHeaders: HeadersInit = new Headers()
    requestHeaders.set('X-Token', token)
    return await fetch(`${MONOBANK_API_URL}/personal/client-info`, {
      headers: requestHeaders,
    })
  }

  const onSubmit = async () => {
    const response = await fetchPersonalData()

    if (response.status !== 200) {
      clearToken()
      switch (response.status) {
        case 403:
          notification.error({ message: 'Invalid token', description: 'Enter valid token' })
          return

        case 429:
          notification.error({ message: 'Too many requests', description: 'Try later' })
          return

        default:
          notification.error({ message: 'Something went wrong', description: 'Try later' })
          return
      }
    } else {
      saveToken()
      navigate('/')
    }
  }

  return (
    <div>
      <p>To integrate with Monobank you have to paste your token below</p>
      <label>
        Token
        <input value={token} onChange={(e) => setToken(e.target.value)} />
      </label>
      <button onClick={onSubmit}>Confirm</button>
      <p>
        Click to open instruction how to get your{' '}
        <a href="https://api.monobank.ua/" target="_blank" rel="noreferrer">
          token
        </a>
      </p>
    </div>
  )
}

export default MonobankAuth
