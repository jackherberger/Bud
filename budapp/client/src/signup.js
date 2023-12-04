import React, { useState } from "react";
import "./login.css";
import "./signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comboName = formData.firstName + " " + formData.lastName;
    const email = formData.email;
    const pass = formData.confirmPassword;

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: comboName,
          email: email,
          password: pass,
        }),
      });

      if (response.ok) {
        // Successful sign-up logic here
        console.log("User signed up successfully!");
      } else if (response.status === 409) {
        setError("Email already used. Please choose another email.");
        console.log("User already exists");
      } else {
        console.log(response);
        // Failed sign-up logic here
        console.log("Sign-up failed. Please check your data.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  return (
    <div>
      {error && <div className="error-banner">{error}</div>}
      <h1>SIGN UP FOR BUD</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <div>
          <label>First Name:</label>
          <br />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <br />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button
          type="submit"
          value="signup"
          className="signupButton"
          onClick={handleSubmit}
        >
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
