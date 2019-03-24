import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
require("prismjs/themes/prism-okaidia.css");

import cosmicjsLogo from './cosmicjs.svg'
import gatsbyLogo from './gatsby.png'
import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const siteTitle = get(this, 'props.data.cosmicjsSettings.metadata.site_heading')
    const siteSubTitle = get(this, 'props.data.cosmicjsSettings.metadata.site_sub_heading')
    const homgePageHero = get(this, 'props.data.cosmicjsSettings.metadata.homepage_hero.imgix_url')

    let rootPath = `/`
    let postsPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
      postsPath = __PATH_PREFIX__ + `/`
    }
    const header = (
      <div
        style={{
          backgroundColor: "#007ACC",
          backgroundImage: `url("${homgePageHero}?w=2000")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: rhythm(14),
          position: 'relative',
          marginBottom: `${rhythm(1.5)}`,
        }}
      >
        <div 
          style={{
            ...scale(1.3),
            position: 'absolute',
            textAlign: 'center',
            left: 0,
            right: 0,
            top: rhythm(3),
            marginTop: '0',
            height: rhythm(2.5)
          }}
        >
        <h1>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: '#fff',
            }}
            to={'/'}
          >
            {siteTitle}
          </Link>
        </h1>
        <div style={{ fontSize: 20, color: '#fff' }}>{siteSubTitle}</div>
        </div>
      </div>
    )
    return (
      <div>
        {location.pathname === rootPath || location.pathname === 'posts' ? header : ''}
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `0 ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(3 / 4)}`,
            minHeight: 'calc(100vh - 42px)',
          }}
        >
          {children()}
        </div>
        <footer
          style={{
            textAlign: 'center',
            padding: `0 20px 80px 0`,
          }}
        >
          <div style={{ marginBottom: 30 }}>
            This blog is powered by&nbsp;
            <a target="_blank" href="https://gatsbyjs.org"
              style={{
                color: '#191919',
                boxShadow: 'none'
              }}
            >
              <img src={gatsbyLogo} alt="Gatsby JS"
                style={{
                  width: '20px',
                  margin: '0 4px -3px 2px'
                }}
              /><strong>Gatsby</strong>
            </a>
            &nbsp;and&nbsp;
            <a target="_blank" href="https://cosmicjs.com"
              style={{
                color: '#191919',
                boxShadow: 'none'
              }}
            >
              <img src={cosmicjsLogo} alt="Cosmic JS"
                style={{
                  width: '18px',
                  margin: '0 4px -2px 5px'
                }}
              /><strong>Cosmic JS</strong>
            </a>
          </div>
          <div>
          <a href="https://cosmicjs.com/add-bucket?import_bucket=5b19c0f1476bc3141464c446"
              style={{
                color: '#191919',
                boxShadow: 'none',
              }}><img src="https://s3-us-west-2.amazonaws.com/cosmicjs/f2360dd0-4e5b-11e9-a745-47794448775c-clone-to-cosmic.svg" class="w-150"/>
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

export default Template
export const query = graphql`
  query LayoutQuery {
    cosmicjsSettings(slug: {eq: "general"}){
      metadata{
        site_heading
        site_sub_heading
        homepage_hero{
          imgix_url
        }
      }
    }
  }
`
