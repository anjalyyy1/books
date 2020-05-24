import React from 'react';
import styled, { css } from 'styled-components';
import Layout from 'components/layout';

export default function index() {
  return (
    <Layout>
      <PageHeading>My Books</PageHeading>
    </Layout>
  );
}

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
