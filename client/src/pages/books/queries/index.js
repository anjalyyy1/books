import { gql } from 'apollo-boost';

const getBooksQuery = gql`
  query {
    books {
      name
      genre
      _id
    }
  }
`;

const getAuthors = gql`
  {
    authors {
      name
      _id
    }
  }
`;

const addBookMutation = gql`
  mutation(
    $name: String!
    $genre: String!
    $authorId: ID!
    $description: String!
    $price: String!
  ) {
    addBook(
      name: $name
      genre: $genre
      authorId: $authorId
      description: $description
      price: $price
    ) {
      name
    }
  }
`;

export { getAuthors, getBooksQuery, addBookMutation };
