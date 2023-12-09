import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000'
// const baseUrl = "http://localhost:8000"

const Login = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const INVALID_TOKEN = 'INVALID_TOKEN'
  const [token, setToken] = useState(
    localStorage.setItem('token', INVALID_TOKEN)
  )

  const [error, setError] = useState('')

  const onSetToken = (token) => {
    localStorage.setItem('token', token)
    setToken(token)
  }

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/checkLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          pwd: password
        })
      })
      // had to change access to request as body is coming with token
      const resBody = await response.json()
      const customerId = resBody._doc.customer
      const ourToken = resBody.token
      onSetToken(ourToken)
      props.setCustomerId(customerId)
      if (response.ok) {
        // Successful login logic here
        console.log('Login successful!')
        navigate('/transactions')
        window.location.reload()
      } else {
        // Failed login logic here
        setError('Login failed. Invalid username or password.')
        console.log('Login failed. Invalid username or password.')
      }
    } catch (error) {
      setError('Login failed. Error occured try again later')
      console.error('Error during login:', error)
    }
  }

  return (
    <div>
      {error && <div className='error-banner'>{error}</div>}
      <h1>LOGIN TO BUD</h1>
      <form>
        <label>
          Username:
          <br />
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name='username'
            required
          />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name='password'
            required
          />
        </label>
        <br />
        <br />
        <button
          type='button'
          className='loginButton'
          value='Login'
          onClick={handleLogin}
        >
          Login
        </button>
        <br />
        <br />
        <br />
      </form>
    </div>
  )
}

export default Login
