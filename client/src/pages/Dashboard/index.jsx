import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import urlService from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import './Dashboard.css'

const Dashboard = () => {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchUserUrls = async () => {
      try {
        setLoading(true)
        const data = await urlService.getUserUrls()
        setUrls(data)
        setError(null)
      } catch (err) {
        setError(err)
        console.error('Error fetching user URLs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserUrls()
  }, [])

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(id)
        setTimeout(() => setCopied(null), 2000)
      })
      .catch(err => {
        console.error('Failed to copy:', err)
      })
  }

  const handleDelete = async (id) => {
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

  // Calculate statistics
  const totalUrls = urls.length
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0)
  const averageClicksPerUrl = totalUrls > 0 ? (totalClicks / totalUrls).toFixed(1) : 0

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <LoadingSpinner size="large" color="primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Mi <span className="text-gradient">Panel</span></h1>
        <p className="dashboard-subtitle">Gestiona tus enlaces acortados y visualiza sus estadísticas</p>
      </div>

      <div className="dashboard-welcome">
        <h2>Bienvenido, {user?.username || 'Usuario'}</h2>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <h3 className="stat-title">Mis Enlaces</h3>
          <p className="stat-value">{totalUrls}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Clics</h3>
          <p className="stat-value">{totalClicks}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Promedio Clics</h3>
          <p className="stat-value">{averageClicksPerUrl}</p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="urls-table-container">
        {urls.length > 0 ? (
          <table className="urls-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>URL Original</th>
                <th>URL Corta</th>
                <th>Clics</th>
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
                  <td className="url-date">{formatDate(url.createdAt)}</td>
                  <td className="url-actions">
                    <button 
                      className="copy-btn" 
                      onClick={() => copyToClipboard(url.shortUrl, url._id)}
                      title="Copiar URL corta"
                    >
                      {copied === url._id ? 'Copiado!' : 'Copiar'}
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(url._id)}
                      disabled={deleteLoading === url._id}
                      title="Eliminar URL"
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
            <p className="empty-state-text">No has acortado ningún enlace todavía.</p>
            <a href="/" className="btn btn-primary">Acortar un enlace</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard