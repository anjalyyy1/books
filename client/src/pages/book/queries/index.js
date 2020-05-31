import { gql } from 'apollo-boost';

const getBookDetail = gql`
  query($_id: ID!) {
    book(_id: $_id) {
      _id
      genre
      name
      description
      price
      author {
        name
      }
    }
  }
`;

export { getBookDetail };
