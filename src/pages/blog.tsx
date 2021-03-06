import React from "react";
import { PageProps, graphql } from "gatsby";
import Boxed from "components/utils/Boxed";
import PageTitle from "components/PageTitle";
import styled from "styled-components";
import Layout from "../layout";
import BlogDetail from "../components/page/BlogDetail";
import { SmallText } from "components/common/TextStyles";
import BlogParallel from "components/page/BlogParallel";

const Row = styled.section`
  padding: var(--var-padding-m) 0;
  background: var(--color-background);
`;

const BlogPage: React.FC<PageProps> = ({ data }) => {
  const postEdges = data.feature.edges;
  const blogEdges = data.blog.edges;

  return (
    <Layout
      title="Blog"
      description="Blog on design process, technology and productivity."
      keywords="Design,Blog,Web,App,UI,UX,Interface,Portfolio,Hong Kong,Writing,Samuel Wong, Tech, Productivity"
    >
      <Boxed>
        <PageTitle
          title="Blog"
          description="A collection of posts I wrote about design process, technology and
                productivity."
        />
        <SmallText>Featured posts</SmallText>
        <Row id="featured">
          <BlogDetail postEdges={postEdges} />
        </Row>
      </Boxed>
      <Boxed size="large">
        <SmallText>All posts</SmallText>
        <Row id="latest">
          <BlogParallel postEdges={blogEdges} />
        </Row>
      </Boxed>
    </Layout>
  );
};

export default BlogPage;

/* eslint no-undef: "off" */

export const pageQuery = graphql`
  query BlogQuery {
    feature: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true }, feature: { eq: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 8
    ) {
      ...bloglist
    }
    blog: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      ...bloglist
    }
  }
`;
