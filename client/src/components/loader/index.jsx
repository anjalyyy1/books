import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled, { css } from 'styled-components';

const Loader = props => {
  return (
    <Container>
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(17, 17, 17, 0.36);
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
`;

export default Loader;
