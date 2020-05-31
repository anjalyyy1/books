import React from 'react';
import Layout from 'components/layout';
import styled, { css } from 'styled-components';
import { getBookDetail } from './queries';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { get } from 'lodash';
import Loader from 'components/loader';

const Book = props => {
  let { getBookDetail } = props;
  console.log(getBookDetail, 'getBookDetail');

  let { book: bookDetail } = getBookDetail;
  console.log(bookDetail);

  return (
    <Layout>
      {get(getBookDetail, `loading`) && <Loader />}
      <PageWrapper>
        <BookHeading>Your Book Detail goes here...</BookHeading>
        <FieldRow>
          <Heading>Book name:</Heading>
          <BookName>{get(bookDetail, `name`)}</BookName>
        </FieldRow>
        <FieldRow>
          <Heading>Genre: </Heading>
          <BookGenre>{get(bookDetail, `genre`)}</BookGenre>
        </FieldRow>
        <FieldRow>
          <Heading>Author: </Heading>
          <AuthorName>{get(bookDetail, `author.name`)} </AuthorName>
        </FieldRow>
        <FieldRow>
          <Heading>Price: </Heading>
          <AuthorName>{get(bookDetail, `price`)}</AuthorName>
        </FieldRow>
        <FieldRow>
          <Heading>Description: </Heading>
          <BookDescription>{get(bookDetail, `description`)}</BookDescription>
        </FieldRow>
      </PageWrapper>
    </Layout>
  );
};

const BookName = styled.span``;

const BookGenre = styled.span``;

const AuthorName = styled.span``;

const BookDescription = styled.p``;

const FieldRow = styled.div`
  margin-bottom: 20px;
`;

const Heading = styled.span`
  font-weight: bold;
  display: inline-block;
  margin-right: 10px;
  font-size: 20px;
  margin-bottom: 10px;
`;

const PageWrapper = styled.div`
  ${props => props.theme.SNIPPETS.FONT_FAMILY};
`;

const BookHeading = styled.h3`
  ${props => props.theme.SNIPPETS.FONT_FAMILY};
  font-size: 30px;
  margin: 40px 0 30px;
  font-weight: bold;
  line-height: 1.2;
  text-decoration: underline;
`;

export default compose(
  graphql(getBookDetail, {
    name: 'getBookDetail',
    options: (props, test) => {
      return {
        variables: {
          _id: get(props, `match.params.bookId`)
        }
      };
    }
  })
)(Book);
