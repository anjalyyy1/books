import React from 'react';
import styled from 'styled-components';

function POPUPComponent(props) {
  return (
    <>
      <Container onClick={props.closePopup} />
      <LoaderContainer>
        <ChildContainer>{props.children}</ChildContainer>
      </LoaderContainer>
    </>
  );
}

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

const LoaderContainer = styled.div`
  position: fixed;
  max-width: 768px;
  width: 100%;
  z-index: 10;
  top: calc(50%);
  left: calc(50% + 12px);
  transform: translate(-50%, -50%);
`;

const ChildContainer = styled.div`
  background-color: white;
  border-radius: 0.3rem;
  padding: 2px 1em;
  position: relative;
`;

export default POPUPComponent;
