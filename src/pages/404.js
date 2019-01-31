import React from 'react'
import Link from 'gatsby-link'

const NotFoundPage = () => (
  <div style={{ marginTop: 40 }}>
    <Link
      to="/">
      ← Back to Posts
    </Link>
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export default NotFoundPage
