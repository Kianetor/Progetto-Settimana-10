import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        end //serve perché "/" altrimenti risulterebbe attivo anche su /cerca e /citta ecc
        className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
      >
        Home
      </NavLink>
      <NavLink
        to="/cerca"
        className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
      >
        Cerca città
      </NavLink>
    </nav>
  )
}

export default Navbar
