import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { login, loading, error } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await login(formData)
      navigate('/')
    } catch (err) {
      // Error is handled in AuthContext
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Iniciar <span className="text-gradient">Sesión</span></h1>
          <p className="auth-subtitle">Accede a tu cuenta para gestionar tus enlaces acortados</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            
            <ErrorMessage message={error} />
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block" 
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="light" />
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>¿No tienes una cuenta? <Link to="/register" className="auth-link">Regístrate</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login