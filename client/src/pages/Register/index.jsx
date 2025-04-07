import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const { register, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    
    // Clear password error when user types in password fields
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }
    
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = formData
      await register(userData)
      navigate('/')
    } catch (err) {
      // Error is handled in AuthContext
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Crear <span className="text-gradient">Cuenta</span></h1>
          <p className="auth-subtitle">Regístrate para gestionar tus enlaces acortados</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Elige un nombre de usuario"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Ingresa tu correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Crea una contraseña"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
            
            {passwordError && <div className="error-message">{passwordError}</div>}
            <ErrorMessage message={error} />
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="light" />
              ) : (
                'Registrarse'
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>¿Ya tienes una cuenta? <Link to="/login" className="auth-link">Iniciar Sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register