import './ApiDocs.css'

const ApiDocs = () => {
  return (
    <div className="api-docs">
      <h1>API Documentation</h1>
      
      <section className="api-section">
        <h2>Authentication</h2>
        <p>LinkSh3 API uses Bearer token authentication. Include the token in the Authorization header:</p>
        <pre><code>Authorization: Bearer your_token_here</code></pre>
      </section>

      <section className="api-section">
        <h2>URL Shortening</h2>
        
        <div className="endpoint">
          <h3>Create Short URL</h3>
          <p><span className="method">POST</span> /api/url/shorten</p>
          <div className="subsection">
            <h4>Request Body</h4>
            <pre><code>{JSON.stringify({
              longUrl: "https://example.com/very-long-url"
            }, null, 2)}</code></pre>
          </div>
          <div className="subsection">
            <h4>Response</h4>
            <pre><code>{JSON.stringify({
              urlCode: "abc123",
              longUrl: "https://example.com/very-long-url",
              shortUrl: "http://localhost:5000/abc123",
              createdAt: "2023-01-01T00:00:00.000Z"
            }, null, 2)}</code></pre>
          </div>
        </div>

        <div className="endpoint">
          <h3>Get URL Statistics</h3>
          <p><span className="method">GET</span> /api/url/stats</p>
          <div className="subsection">
            <h4>Response</h4>
            <pre><code>{JSON.stringify([
              {
                urlCode: "abc123",
                longUrl: "https://example.com/very-long-url",
                shortUrl: "http://localhost:5000/abc123",
                clicks: 42,
                createdAt: "2023-01-01T00:00:00.000Z"
              }
            ], null, 2)}</code></pre>
          </div>
        </div>

        <div className="endpoint">
          <h3>Get User's URLs</h3>
          <p><span className="method">GET</span> /api/url/my-urls</p>
          <p className="auth-required">Authentication required</p>
          <div className="subsection">
            <h4>Response</h4>
            <pre><code>{JSON.stringify([
              {
                urlCode: "abc123",
                longUrl: "https://example.com/very-long-url",
                shortUrl: "http://localhost:5000/abc123",
                clicks: 42,
                createdAt: "2023-01-01T00:00:00.000Z"
              }
            ], null, 2)}</code></pre>
          </div>
        </div>

        <div className="endpoint">
          <h3>Delete URL</h3>
          <p><span className="method">DELETE</span> /api/url/:id</p>
          <p className="auth-required">Authentication required</p>
          <div className="subsection">
            <h4>Response</h4>
            <pre><code>{JSON.stringify({
              message: "URL removed"
            }, null, 2)}</code></pre>
          </div>
        </div>
      </section>

      <section className="api-section">
        <h2>Authentication Endpoints</h2>
        
        <div className="endpoint">
          <h3>Register User</h3>
          <p><span className="method">POST</span> /api/auth/register</p>
          <div className="subsection">
            <h4>Request Body</h4>
            <pre><code>{JSON.stringify({
              username: "example_user",
              email: "user@example.com",
              password: "secure_password"
            }, null, 2)}</code></pre>
          </div>
        </div>

        <div className="endpoint">
          <h3>Login</h3>
          <p><span className="method">POST</span> /api/auth/login</p>
          <div className="subsection">
            <h4>Request Body</h4>
            <pre><code>{JSON.stringify({
              email: "user@example.com",
              password: "secure_password"
            }, null, 2)}</code></pre>
          </div>
        </div>
      </section>

      <section className="api-section">
        <h2>Rate Limits</h2>
        <p>To ensure service quality, the API has the following rate limits:</p>
        <ul>
          <li>Anonymous users: 10 requests per minute</li>
          <li>Authenticated users: 60 requests per minute</li>
        </ul>
      </section>
    </div>
  )
}

export default ApiDocs