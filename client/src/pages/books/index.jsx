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
import BookModal from './component/bookModal';

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

const Books = props => {
  const classes = useStyles();

  let {
    showBookAddModal,
    isShowModal,
    getBooksQuery,
    onBookClickHandler
  } = props;
  return (
    <Layout>
      {isShowModal && <BookModal {...props} />}
      <PageHeading>My Books</PageHeading>
      {get(getBooksQuery, `loading`) ? (
        <Loader />
      ) : (
        <BookList>
          {!get(getBooksQuery, `books.length`) && (
            <NoBooks>No books :( Please add some... </NoBooks>
          )}
          {map(get(getBooksQuery, `books`), eachBook => {
            return (
              <Card
                className={classes.root}
                key={eachBook._id}
                onClick={() => onBookClickHandler(eachBook._id)}
              >
                <CardContent>
                  <Typography
                    className={classes.title}
                    color='textSecondary'
                    gutterBottom
                  >
                    {get(eachBook, `name`)}
                  </Typography>
                  <Typography className={classes.pos} color='textSecondary'>
                    Genre - {get(eachBook, `genre`)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </BookList>
      )}
      <Fab color='primary' className={classes.fab}>
        <IconWrapper onClick={showBookAddModal}>
          <MdAdd />
        </IconWrapper>
      </Fab>
    </Layout>
  );
};

const IconWrapper = styled.div`
  svg {
    width: 30px;
    height: 30px;
  }
`;

const NoBooks = styled.span`
  ${props => props.theme.SNIPPETS.FONT_FAMILY};
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  align-items: center;
`;

const BookList = styled.div``;

const SharedTextCss = css`
  ${props => props.theme.SNIPPETS.FONT_FAMILY};
  font-size: 30px;
  margin-top: 50px;
  font-weight: bold;
  line-height: 1.2;
`;

const PageHeading = styled.h2`
  ${SharedTextCss};
  margin-bottom: 10px;
  text-decoration: underline;
`;

export default Books;
