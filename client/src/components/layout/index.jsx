import React from 'react';
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Header from 'components/header';

const Layout = props => {
  return (
    <>
      <Header />
      <ContainerWrapper>
        <Container maxWidth='md'>{props.children}</Container>
      </ContainerWrapper>
    </>
  );
};

const ContainerWrapper = styled.div`
  &:after {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background-color: ${props => props.theme.COLOR.BACKGROUND_COLOR};
  }
`;

export default Layout;
