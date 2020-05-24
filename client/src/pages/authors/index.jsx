import React from 'react';
import Layout from 'components/layout';
import styled, { css } from 'styled-components';

const Authors = props => {
  return (
    <Layout>
      <PageHeading>My Authors</PageHeading>
    </Layout>
  );
};

const SharedTextCss = css`
  ${props => props.theme.SNIPPETS.FONT_FAMILY};
  font-size: 30px;
  margin-top: 50px;
  font-weight: bold;
  line-height: 1.2;
`;

const PageHeading = styled.h2`
  ${SharedTextCss};
  text-decoration: underline;
`;

export default Authors;
