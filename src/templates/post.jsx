import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import styled from "styled-components";
import Link from "gatsby-link";
import UserInfo from "../components/UserInfo/UserInfo";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import kebabCase from 'lodash/kebabCase';
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./post.css";

const Post = styled.article`
  display: block;
  margin: 0 auto;

  @media screen and (min-width: 1280px) {
    display: grid;
    grid-gap: 36px;
    grid-template-columns: [head] minmax(auto, 40ch) [main] minmax(23ch,55ch) [meta] 20%;
  }

  @media screen and (min-width: 768px) and (max-width: 1280px)  {
    display: grid;
    grid-gap: 48px;
    grid-template-columns: 2fr 3fr;
    grid-template-areas: "head main"
    "meta main";
  }

`

const Header = styled.div`
  overflow-wrap: break-word;
  grid-area: head;
  padding-bottom: 3rem;
`

const Meta = styled.div`
  display: grid;
  grid-gap: 8px 0;
  grid-template-rows: [date] 1fr [category] 1fr [tag] 1fr [share] 1fr;
  grid-template-columns: [date category tag share] 1fr;

  @media screen and (max-width: 425px) {
    grid-template-columns: [date] 1fr [share] 1fr;
    grid-template-rows: [date share] 1fr;
  }

  @media screen and (min-width: 425px) and (max-width: 768px) {
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
  "date category"
  "tag share";
  }
`


const Main = styled.div`
  grid-area: main;
  overflow: auto;
`

const Sidebar = styled.div`
  grid-area: meta;
`

const PostTitle = styled.h1`
  grid-area: title;
`
const PostMeta = styled.small`
margin: 0;
color: var(--color-grey-500);
`

const PostDate = styled.div`
grid-area: date;
`

const PostCategory = styled.div`
grid-area: category;

@media screen and (max-width: 425px) {
  display: none;
}
`

const PostTag = styled.div`
grid-area: tag;
@media screen and (max-width: 425px) {
  display: none;
}
`

const PostShare = styled.div`
grid-area: share;

`

export default class PostTemplate extends React.Component {
  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.post;
    const relateNode = this.props.data.related;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }
    if (relateNode === null) {
      console.log("error")
    } else {

    }

    return (
      <Layout>  
          <Helmet>
            <title>{`${post.title} | ${config.siteTitle}`}</title>
          </Helmet>
          <SEO postPath={slug} postNode={postNode} postSEO />
          <Link to="/lab"><h6>Back</h6></Link>
          <Post>
            
            <Header>
              <PostTitle>{post.title}</PostTitle>
              <Meta>
                <PostDate>
                  <PostMeta>Published On</PostMeta>
                  <h5>{post.date}</h5>
                </PostDate>
                <PostCategory>
                  <PostMeta>Category</PostMeta>
                  <h5><Link to={`/categories/${kebabCase(post.category)}`}>{post.category}</Link></h5>
                </PostCategory>
                <PostTag>
                  <PostMeta>Tag</PostMeta>
                  <PostTags tags={post.tags} />
                </PostTag>
                <PostShare>
                  <SocialLinks postPath={slug} postNode={postNode} />
                </PostShare>
              </Meta>
            </Header>
            <Main><div dangerouslySetInnerHTML={{ __html: postNode.html }} /></Main>
            <Sidebar>
              <small>Also in</small> <h5><Link to={`/categories/${kebabCase(post.category)}`}>{post.category}</Link></h5>
              {relateNode !=null && 
              <div>{relateNode.edges.map(relatepost => {
                    return (
                      <h3 key={relatepost.node.id}><Link to={relatepost.node.fields.slug}>{relatepost.node.frontmatter.title}</Link></h3>
                      )})}
              </div>
              }
            </Sidebar>
          </Post>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
query BlogPostBySlug($slug: String!, $category: String!) {
  post: markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    timeToRead
    excerpt
    frontmatter {
      path
      title
      cover {
        publicURL
        size
        childImageSharp {
          sizes(maxWidth: 1140) {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
          }
        }
      }
      date(formatString: "MMM DD, YYYY", locale: "en")
      category
      tags
    }
    fields {
      nextTitle
      nextSlug
      prevTitle
      prevSlug
      slug
      date
    }
  }
  related: allMarkdownRemark(
    sort: {fields: [fields___date], 
      order: DESC},limit: 3, 
      filter: {
        frontmatter: {category: {eq: $category}},
        fields: { slug: { ne: $slug}},
      }
  ) {
    edges {
      node {
        frontmatter {
          title
          path
        }
        fields {
          slug
        }
      }
    }
  }
}

`;
