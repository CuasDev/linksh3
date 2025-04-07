import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/api-docs" className="footer-link">API Documentation</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} LinkSh3. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer