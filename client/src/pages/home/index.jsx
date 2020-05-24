import React from 'react';
import styled, { css } from 'styled-components';
import Layout from 'components/layout';
import { FaRegSmileWink } from 'react-icons/fa';

const WELCOME_TEXT = `
  This is the collection of your personal library. You can catalogue your favourite books and favourite authors in here. Please add new books if you read one. Please add new authors if you found one. 
  
	`;

const HomePage = props => {
  return (
    <Layout>
      <PageHeading>My Books Collection</PageHeading>
      <WelcomeText>{WELCOME_TEXT}</WelcomeText>
      <EnjoyText>
        <br />
        Enjoy... <FaRegSmileWink />
      </EnjoyText>
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

const EnjoyText = styled.span`
  ${SharedTextCss};
`;

const PageHeading = styled.h2`
  ${SharedTextCss};
  text-decoration: underline;
`;

const WelcomeText = styled.p`
  ${SharedTextCss};
`;

export default HomePage;
