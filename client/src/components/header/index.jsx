import React, { useState } from 'react';
import { map, get } from 'lodash';
import styled from 'styled-components';
import { MdViewHeadline } from 'react-icons/md';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import headerOptions from '../constants';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import LogoImage from 'assets/books-logo.svg';

const useStyles = makeStyles({
  list: {
    width: 250
  }
});

const ListOptions = () => {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {map(headerOptions, (eachOption, index) => (
        <StyledLink to={get(eachOption, `link`)} key={index}>
          <ListItem
            key={get(eachOption, `name`)}
            style={{
              cursor: 'pointer'
            }}
          >
            <ListItemIcon>{get(eachOption, `icon`)}</ListItemIcon>
            <ListItemText primary={get(eachOption, `name`)} />
          </ListItem>
        </StyledLink>
      ))}
    </List>
  );
};

const Header = props => {
  const [anchor, setDrawer] = useState(false);

  return (
    <HeaderWrapper>
      <LogoPlaceholder title='My Library'>
        <LogoImg src={LogoImage} alt='My Books' />
      </LogoPlaceholder>
      <HamburgerIconWrapper onClick={() => setDrawer(true)}>
        <MdViewHeadline color='#2b32368a' />
      </HamburgerIconWrapper>
      <Drawer anchor='right' open={anchor} onClose={() => setDrawer(false)}>
        {ListOptions()}
      </Drawer>
    </HeaderWrapper>
  );
};

const LogoImg = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.COLOR.BLACK};
`;

const LogoPlaceholder = styled.div`
  width: 50px;
  height: 50px;
  display: inline-block;
  cursor: pointer;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 10px 30px;
  background-color: ${props => props.theme.COLOR.PRIMARY_COLOR};
`;

const HamburgerIconWrapper = styled.div`
  float: right;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export default Header;
