import { useState, useEffect, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import urlService from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import './Admin.css'

const Admin = () => {
  const [urls, setUrls] = useState([])
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('urls')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const { user, isAdmin } = useContext(AuthContext)

  // Redirect if not admin
  if (!user || !isAdmin()) {
    return <Navigate to="/" />
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (activeTab === 'urls') {
          const data = await urlService.getAdminStats()
          setUrls(data)
        } else if (activeTab === 'users') {
          const data = await urlService.getUsers()
          setUsers(data)
        }
        setError(null)
      } catch (err) {
        setError(err)
        console.error(`Error fetching ${activeTab}:`, err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  const handleDeleteUrl = async (id) => {
    try {
      setDeleteLoading(id)
      await urlService.deleteUrl(id)
      setUrls(urls.filter(url => url._id !== id))
    } catch (err) {
      setError(err)
      console.error('Error deleting URL:', err)
    } finally {
      setDeleteLoading(null)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="loading-container">
          <LoadingSpinner size="large" color="primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1 className="admin-title">Panel de <span className="text-gradient">Administración</span></h1>
        <p className="admin-subtitle">Gestiona todos los enlaces y usuarios del sistema</p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'urls' ? 'active' : ''}`}
          onClick={() => setActiveTab('urls')}
        >
          Enlaces
        </button>
        <button 
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Usuarios
        </button>
      </div>

      <ErrorMessage message={error} />

      {activeTab === 'urls' && (
        <div className="urls-table-container">
          {urls.length > 0 ? (
            <table className="urls-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>URL Original</th>
                  <th>URL Corta</th>
                  <th>Clics</th>
                  <th>Usuario</th>
                  <th>Creado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {urls.map((url) => (
                  <tr key={url._id}>
                    <td className="url-code">{url.urlCode}</td>
                    <td className="url-long" title={url.longUrl}>{url.longUrl}</td>
                    <td className="url-short">
                      <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td className="url-clicks">{url.clicks}</td>
                    <td className="url-user">{url.user ? url.user.username : 'Anónimo'}</td>
                    <td className="url-date">{formatDate(url.createdAt)}</td>
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteUrl(url._id)}
                        disabled={deleteLoading === url._id}
                      >
                        {deleteLoading === url._id ? (
                          <LoadingSpinner size="tiny" color="light" />
                        ) : (
                          'Eliminar'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <p className="empty-state-text">No hay enlaces en el sistema.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-table-container">
          {users.length > 0 ? (
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="user-id">{user._id}</td>
                    <td className="user-name">{user.username}</td>
                    <td className="user-email">{user.email}</td>
                    <td className="user-role">
                      <span className={`role-badge ${user.role}`}>
                        {user.role === 'admin' ? 'Administrador' : 'Usuario'}
                      </span>
                    </td>
                    <td className="user-date">{formatDate(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">👤</div>
              <p className="empty-state-text">No hay usuarios registrados.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Admin