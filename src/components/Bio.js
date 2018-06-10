import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    const settings = this.props.settings
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(1),
        }}
      >
        <img
          src={settings.author_avatar.imgix_url}
          alt={settings.author_name}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            height: rhythm(2),
          }}
        />
        <div dangerouslySetInnerHTML={{ __html: settings.author_bio }} />
      </div>
    )
  }
}

export default Bio
