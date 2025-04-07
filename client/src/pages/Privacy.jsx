import './Privacy.css'

const Privacy = () => {
  return (
    <div className="privacy-policy">
      <h1>Privacy Policy</h1>
      
      <section className="policy-section">
        <h2>Introduction</h2>
        <p>At LinkSh3, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our URL shortening service.</p>
      </section>

      <section className="policy-section">
        <h2>Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li>Email address and username when you create an account</li>
          <li>URLs you submit for shortening</li>
          <li>Any additional information you provide voluntarily</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <ul>
          <li>IP addresses</li>
          <li>Browser type and version</li>
          <li>Click statistics on shortened URLs</li>
          <li>Usage patterns and traffic data</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain our URL shortening service</li>
          <li>To track click statistics for shortened URLs</li>
          <li>To prevent abuse and ensure security</li>
          <li>To communicate with you about service updates</li>
          <li>To improve our service based on usage patterns</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
      </section>

      <section className="policy-section">
        <h2>Data Retention</h2>
        <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. You can request deletion of your account and associated data at any time.</p>
      </section>

      <section className="policy-section">
        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Export your data</li>
        </ul>
      </section>

      <section className="policy-section">
        <h2>Cookies</h2>
        <p>We use cookies to enhance your experience on our website. You can control cookie settings through your browser preferences.</p>
      </section>

      <section className="policy-section">
        <h2>Third-Party Services</h2>
        <p>We may use third-party services for analytics and security. These services may collect information sent by your browser as part of their service. Their use of this information is governed by their respective privacy policies.</p>
      </section>

      <section className="policy-section">
        <h2>Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.</p>
      </section>

      <section className="policy-section">
        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at privacy@linksh3.com</p>
      </section>

      <div className="policy-footer">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default Privacy