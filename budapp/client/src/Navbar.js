import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from './bud_logo_transparent.png'

const Navbar = () => {
  return (
    <div className='Nav'>
      <nav>
        <ul className='navbar-links'>
          <li className='logo-container'>
            <img src={logo} alt='Logo' className='logo' />
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/transactions'>Transactions</Link>
          </li>
          <li>
            <Link to='/account'>Account</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
