import React, { useState } from "react"
import bcrypt from "bcryptjs"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import "./login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState('');

  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google login
    console.log("Google login successful:", response)
  }

  const handleGoogleLoginFailure = (error) => {
    // Handle failed Google login
    console.error("Google login failed:", error)
  }

  const handleLogin = async () => {
    console.log(
      `Logging in with username: ${username}, hashed password: ${password}`
    )

    try {
      const response = await fetch('http://localhost:8000/checkLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          hashedPassword: password,
        }),
      })

      if (response.ok) {
        // Successful login logic here
        console.log('Login successful!')
        window.location.href = 'http://localhost:3000/transactions';
      } else {
        // Failed login logic here
        setError('Login failed. Invalid username or password.');
        console.log('Login failed. Invalid username or password.')
      }
    } catch (error) {
      setError('Login failed. Error occured try again later');
      console.error('Error during login:', error)
    }
  }

  return (
    <div>
      {error && (
      <div className="error-banner">
        {error}
      </div>
      )}
      <h1>LOGIN TO BUD</h1>
      <form>
        <label>
          Username:
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {/* Google Login Button */}
        <GoogleOAuthProvider clientId="1069227459562-apu19fh635p21a78pdq4r4h96g5k2am2.apps.googleusercontent.com">
          <GoogleLogin
            clientId="1069227459562-apu19fh635p21a78pdq4r4h96g5k2am2.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider>
      </form>
    </div>
  )
}

export default Login
