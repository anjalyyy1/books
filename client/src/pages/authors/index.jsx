import React from 'react';
import styled, { css } from 'styled-components';
import Layout from 'components/layout';
import { get, map } from 'lodash';
import Loader from 'components/loader';

import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { MdAdd } from 'react-icons/md';
import AuthorModal from './components/authorModal';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 20,
    maxWidth: '80%',
    cursor: 'pointer'
  },

  title: {
    fontSize: 14
  },

  fab: {
    position: 'fixed',
    bottom: '8%',
    right: '7%',
    backgroundColor: '#ffcd00',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f1d978'
    }
  }
});

const Authors = props => {
  let { showAuthorModal, isShowModal, getAuthors } = props;
  console.log(isShowModal, '==', props);
  const classes = useStyles();

  return (
    <Layout>
      {isShowModal && <AuthorModal {...props} />}
      <PageHeading>My Authors</PageHeading>
      {get(getAuthors, `loading`) ? (
        <Loader />
      ) : (
        <AuthorsList>
          {!get(getAuthors, `authors.length`) && (
            <NoAuthors>No authors :( Please add some... </NoAuthors>
          )}
          {map(get(getAuthors, `authors`), eachBook => {
            return (
              <Card className={classes.root} key={eachBook._id}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom
                  >
                    {get(eachBook, `name`)}
                  </Typography>
                  <Typography className={classes.pos} color='textSecondary'>
                    Age - {get(eachBook, `age`)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </AuthorsList>
      )}
      <Fab color='primary' className={classes.fab}>
        <IconWrapper onClick={showAuthorModal}>
          <MdAdd />
        </IconWrapper>
      </Fab>
    </Layout>
  );
};

const AuthorsList = styled.div``;

const NoAuthors = styled.span`
  ${props => props.theme.SNIPPETS.FONT_FAMILY};
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  align-items: center;
`;

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

const IconWrapper = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;

export default Authors;
