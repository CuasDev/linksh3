import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">4<span className="text-gradient">0</span>4</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
      <div className="not-found-decoration">
        <div className="glitch-effect"></div>
      </div>
    </div>
  )
}

export default NotFound