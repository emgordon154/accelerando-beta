import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => (
  <nav>
      <Link to="/" className="navlink">
        Game
      </Link>
      <Link to="/about" className="navlink">
        About
      </Link>
  </nav>
)

export default Navbar
