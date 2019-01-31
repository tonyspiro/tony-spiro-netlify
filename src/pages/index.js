import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import take from 'lodash/take'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import { rhythm } from '../utils/typography'
class BlogIndex extends React.Component {
  constructor() {
    super()
    this.state = {limit: 5}
  }
  addPosts(e) {
    e.preventDefault()
    this.setState({
      limit: this.state.limit + 5
    })
  }
  render() {
    const siteTitle = get(this, 'props.data.cosmicjsSettings.metadata.site_title')
    const allPosts = get(this, 'props.data.allCosmicjsPosts.edges')
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const homgePageHero = get(this, 'props.data.cosmicjsSettings.metadata.homepage_hero.imgix_url')
    const posts = take(allPosts, this.state.limit)
    return (
      <div>
        <style>{`
          .load-more {
            margin-top: 60px;
            margin-bottom: 20px;
            text-align: center;
          }
        `}
        </style>
        <Helmet>
          <title>{siteTitle}</title>
          <link rel="shortcut icon" href={author.author_avatar.imgix_url + '?w=30'} type="image/x-icon"/>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@tonyspiro" />
          <meta name="twitter:title" content={siteTitle} />
          <meta name="twitter:url" content="https://tonyspiro.com" />
          <meta name="twitter:description" content="Tony Spiro's blog about technology, business, music and other interests" />
          <meta name="twitter:image" content={homgePageHero} />
        </Helmet>
        <Bio settings={author}/>
        {posts.map(({ node }) => {
          const title = get(node, 'title') || node.slug
          return (
            <div key={node.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={`/${node.slug}`}>
                  {title}
                </Link>
              </h3>
              <small>{node.created}</small>
              <p dangerouslySetInnerHTML={{ __html: node.metadata.teaser !== '<p><br></p>' ? node.metadata.teaser : node.content.replace(/(<([^>]+)>)/ig,"").substring(0,240) + '...' }} />
            </div>
          )
        })}
        {
          posts.length !== allPosts.length &&
          <div className="load-more">
            <a href="#" onClick={this.addPosts.bind(this)}>Load More Posts</a>
          </div>
        }
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    allCosmicjsPosts(sort: { fields: [created], order: DESC }, limit: 1000) {
      edges {
        node {
          metadata{
            teaser
          }
          content
          slug
          title
          created(formatString: "DD MMMM, YYYY")
        }
      }
    }
    cosmicjsSettings(slug: {eq: "general"}){
      metadata{
        site_title
        author_name
        author_bio
        author_avatar {
          imgix_url
        }
      }
    }
  }
`
