import React from 'react';
import styled from 'styled-components';

export default function index() {
  return <Heading>book list</Heading>;
}

const Heading = styled.h2`
  ${props => props.theme.FONT_FAMILY}
`;
