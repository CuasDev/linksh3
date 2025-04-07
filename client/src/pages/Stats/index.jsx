import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import urlService from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import './Stats.css'

const Stats = () => {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(null)
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true)
        // Si el usuario está autenticado, obtener sus URLs
        // Si no, obtener las URLs públicas
        const data = user ? await urlService.getUserUrls() : await urlService.getStats()
        setUrls(data)
        setError(null)
      } catch (err) {
        setError(err)
        console.error('Error fetching URLs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUrls()
  }, [user])

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
      <div className="stats-page">
        <div className="loading-container">
          <LoadingSpinner size="large" color="primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1 className="stats-title">URL <span className="text-gradient">Statistics</span></h1>
        <p className="stats-subtitle">
          {user 
            ? 'Seguimiento del rendimiento de tus enlaces acortados y sus clics.'
            : 'Estadísticas de los enlaces públicos acortados en nuestra plataforma.'}
        </p>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <h3 className="stat-title">Total URLs</h3>
          <p className="stat-value">{totalUrls}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Total Clicks</h3>
          <p className="stat-value">{totalClicks}</p>
        </div>
        <div className="stat-card">
          <h3 className="stat-title">Avg. Clicks/URL</h3>
          <p className="stat-value">{averageClicksPerUrl}</p>
        </div>
      </div>

      <ErrorMessage message={error} />

      <div className="urls-table-container">
        {urls.length > 0 ? (
          <table className="urls-table">
            <thead>
              <tr>
                <th>Short Code</th>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
                <th>Created</th>
                <th>Actions</th>
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
                  <td>
                    <button 
                      className="copy-btn" 
                      onClick={() => copyToClipboard(url.shortUrl, url._id)}
                      title="Copy short URL"
                    >
                      {copied === url._id ? 'Copied!' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <p className="empty-state-text">
              {user 
                ? 'No has acortado ningún enlace todavía.'
                : 'No hay enlaces públicos acortados todavía.'}
            </p>
            <Link to="/" className="btn btn-primary">Acortar un enlace</Link>
            {!user && (
              <p className="empty-state-login">
                <Link to="/login" className="auth-link">Inicia sesión</Link> o <Link to="/register" className="auth-link">regístrate</Link> para gestionar tus propios enlaces.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Stats