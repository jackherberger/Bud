import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "./login.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(localStorage.setItem("token", INVALID_TOKEN));

  const [error, setError] = useState("");

  const handleGoogleLoginSuccess = (response) => {
    // Handle successful Google login
    console.log("Google login successful:", response);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle failed Google login
    console.error("Google login failed:", error);
  };

  const onSetToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  }

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/checkLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          pwd: password,
        }),
      });
      // had to change access to request as body is coming with token
      const resBody = await response.json();
      const customerId = resBody._doc.customer;
      const ourToken = resBody.token;
      onSetToken(ourToken);
      props.setCustomerId(customerId);
      if (response.ok) {
        // Successful login logic here
        console.log("Login successful!");
        navigate("/transactions")
      } else {
        // Failed login logic here
        setError("Login failed. Invalid username or password.");
        console.log("Login failed. Invalid username or password.");
      }
    } catch (error) {
      setError("Login failed. Error occured try again later");
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      {error && <div className="error-banner">{error}</div>}
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
        <br />
        <button type="button" className="loginButton" onClick={handleLogin}>
          Login
        </button>
        <br />
        <br />

        {/* Google Login Button */}
        {/* <GoogleOAuthProvider clientId="1069227459562-apu19fh635p21a78pdq4r4h96g5k2am2.apps.googleusercontent.com">
          <GoogleLogin
            clientId="1069227459562-apu19fh635p21a78pdq4r4h96g5k2am2.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy="single_host_origin"
            className="googleLoginButton"
          />
        </GoogleOAuthProvider> */}
        <br />
      </form>
    </div>
  );
};

export default Login;
