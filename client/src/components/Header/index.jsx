import { useState, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAdmin } = useContext(AuthContext)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">Link<span className="logo-highlight">Sh3</span></span>
        </Link>

        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/stats" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                Statistics
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                    Mi Panel
                  </NavLink>
                </li>
                {isAdmin() && (
                  <li className="nav-item">
                    <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                      Admin
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <button className="nav-link logout-btn" onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}>
                    Cerrar Sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={() => setIsMenuOpen(false)}>
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header