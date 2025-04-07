import './Terms.css'

const Terms = () => {
  return (
    <div className="terms-of-service">
      <h1>Terms of Service</h1>
      
      <section className="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing and using LinkSh3's URL shortening service, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the service.</p>
      </section>

      <section className="terms-section">
        <h2>2. Description of Service</h2>
        <p>LinkSh3 provides a URL shortening service that allows users to create shortened versions of long URLs. The service may be used both with and without registration.</p>
      </section>

      <section className="terms-section">
        <h2>3. User Responsibilities</h2>
        <p>You agree not to use the service for:</p>
        <ul>
          <li>Distributing malware, viruses, or other malicious code</li>
          <li>Phishing or fraudulent activities</li>
          <li>Spamming or mass unsolicited messaging</li>
          <li>Violating any applicable laws or regulations</li>
          <li>Infringing on intellectual property rights</li>
          <li>Distributing adult, explicit, or inappropriate content</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>4. Account Terms</h2>
        <p>If you create an account with us, you are responsible for:</p>
        <ul>
          <li>Maintaining the security of your account credentials</li>
          <li>All activities that occur under your account</li>
          <li>Providing accurate and complete information</li>
          <li>Updating your information as needed</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>5. Service Limitations</h2>
        <p>We reserve the right to:</p>
        <ul>
          <li>Modify or terminate the service for any reason without notice</li>
          <li>Delete URLs that violate our terms</li>
          <li>Refuse service to anyone for any reason</li>
          <li>Enforce rate limits on API usage</li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>6. Intellectual Property</h2>
        <p>The service, including its original content, features, and functionality, is owned by LinkSh3 and is protected by international copyright, trademark, and other intellectual property laws.</p>
      </section>

      <section className="terms-section">
        <h2>7. Disclaimer of Warranties</h2>
        <p>The service is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, secure, or error-free.</p>
      </section>

      <section className="terms-section">
        <h2>8. Limitation of Liability</h2>
        <p>In no event shall LinkSh3 be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
      </section>

      <section className="terms-section">
        <h2>9. Changes to Terms</h2>
        <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the bottom of this page. Continued use of the service after changes constitutes acceptance of the new terms.</p>
      </section>

      <section className="terms-section">
        <h2>10. Contact Information</h2>
        <p>For any questions about these Terms of Service, please contact us at terms@linksh3.com</p>
      </section>

      <div className="terms-footer">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default Terms