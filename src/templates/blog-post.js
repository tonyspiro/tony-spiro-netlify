import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'
import { relative } from 'path';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.cosmicjsPosts
    const siteTitle = get(this.props, 'data.cosmicjsSettings.metadata.site_title')
    const author = get(this, 'props.data.cosmicjsSettings.metadata')
    const { previous, next } = this.props.pathContext

    return (
      <div>
        <style>{`
          .post-content {
            text-align: justify;
          }
          .post-hero {
            width: calc(100% + ${rhythm(8)});
            margin-left: ${rhythm(-4)};
            height: ${rhythm(18)};
          }
          @media (max-width: ${rhythm(32)}) {
            .post-hero {
              width: calc(100% + ${rhythm((3/4) * 2)});
              margin-left: ${rhythm(-3/4)};
              height: ${rhythm(13)};
            }
          }
        `}
        </style>
        <Helmet>
          <title>{`${post.title} | ${siteTitle}`}</title>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@tonyspiro" />
          <meta name="twitter:title" content={`${post.title} | ${siteTitle}`} />
          <meta name="twitter:url" content="https://tonyspiro.com" />
          <meta name="twitter:description" content={ post.metadata.teaser.replace(/(<([^>]+)>)/ig,"") } />
          <meta name="twitter:image" content={post.metadata.hero.imgix_url} />
        </Helmet>
        <div
          style={{
            marginTop: rhythm(1),
          }}
        >
          <Link
            to="/">
            ← Back to Posts
          </Link>
          <h3
            style={{
              fontFamily: 'Montserrat, sans-serif',
              marginTop: 0,
              marginBottom: rhythm(1  ),
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: rhythm(24),
              paddingTop: `${rhythm(1.5)}`,
            }}
          >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
              to={'/'}
            >
              {siteTitle}
            </Link>
          </h3>
        </div>
        <h1
          style={{
            marginTop: rhythm(1),
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(0.6),
            marginTop: rhythm(-0.6),
          }}
        >
          {post.created}
        </p>
        { 
          post.metadata.hero.imgix_url.replace('https://cosmic-s3.imgix.net/', '') &&
          <div
          className="post-hero"
          style={{
            backgroundColor: "#007ACC",
            backgroundImage: `url("${post.metadata.hero.imgix_url}?w=2000")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: rhythm(0.6),
            position: 'relative',
          }}
        ></div>
        }
        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio settings={author} />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    cosmicjsPosts(slug: { eq: $slug }) {
      id
      content
      title
      created(formatString: "MMMM DD, YYYY")
      metadata{
        hero{
          imgix_url
        }
        teaser
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
