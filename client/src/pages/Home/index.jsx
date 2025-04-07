import { useState } from 'react'
import urlService from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import ErrorMessage from '../../components/ErrorMessage'
import './Home.css'

const Home = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Reset states
    setError('')
    setShortUrl('')
    setCopied(false)
    
    // Validate URL
    if (!longUrl) {
      setError('Please enter a URL')
      return
    }
    
    // Prepare URL - add https:// if no protocol is specified
    let urlToShorten = longUrl
    if (!/^https?:\/\//i.test(urlToShorten)) {
      urlToShorten = 'https://' + urlToShorten
    }
    
    try {
      setLoading(true)
      const response = await urlService.shortenUrl(urlToShorten)
      setShortUrl(response.shortUrl)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      })
      .catch(err => {
        console.error('Failed to copy:', err)
      })
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">
          Shorten Your Links with <span className="text-gradient">Style</span>
        </h1>
        <p className="hero-subtitle">
          Transform long, unwieldy URLs into sleek, memorable links that are easy to share
        </p>
        
        <div className="url-shortener-card">
          <form onSubmit={handleSubmit} className="shortener-form">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your long URL here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
            >
              {loading ? (
                <LoadingSpinner size="small" color="primary" />
              ) : (
                'Shorten URL'
              )}
            </button>
          </form>
          
          <ErrorMessage message={error} />
          
          {shortUrl && (
            <div className="result-container">
              <h3 className="result-title">Your shortened URL:</h3>
              <div className="short-url-display">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="short-url-link"
                >
                  {shortUrl}
                </a>
                <button 
                  className="copy-btn" 
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="features-section">
        <h2 className="section-title">Why Choose <span className="text-gradient">LinkSh3</span>?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Lightning Fast</h3>
            <p className="feature-description">Generate shortened URLs instantly with our optimized backend</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Detailed Analytics</h3>
            <p className="feature-description">Track clicks and monitor the performance of your links</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3 className="feature-title">Secure & Reliable</h3>
            <p className="feature-description">Your links are safe and always available when you need them</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3 className="feature-title">Works Everywhere</h3>
            <p className="feature-description">Share your links across any platform or device seamlessly</p>
          </div>
        </div>
      </div>
      
      <div className="how-it-works-section">
        <h2 className="section-title">How It <span className="text-gradient">Works</span></h2>
        
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Paste Your URL</h3>
            <p className="step-description">Enter your long URL in the input field above</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Generate Short Link</h3>
            <p className="step-description">Click the button and get your shortened URL instantly</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Share Anywhere</h3>
            <p className="step-description">Copy and share your link on social media, emails, or messages</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home