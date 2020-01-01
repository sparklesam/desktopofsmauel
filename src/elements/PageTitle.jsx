import React from "react";
import styled from "styled-components";

const PageTitleWrapper = styled.section``;

const Subtitle = styled.h2`
  font-family: var(--font-secondary);
  font-weight: 400;
  text-transform: uppercase;
  line-height: normal;
  font-size: 12px;
  letter-spacing: 0.075rem;
  margin-top: 0;
  color: var(--color-secondary-500);
`;

const Title = styled.h1`
  font-family: var(--font-primary);
`;

const Description = styled.p``;

class PageTitle extends React.Component {
  render() {
    const props = this.props;
    return (
      <PageTitleWrapper>
        <Subtitle>{props.subtitle}</Subtitle>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
      </PageTitleWrapper>
    );
  }
}

export default PageTitle;