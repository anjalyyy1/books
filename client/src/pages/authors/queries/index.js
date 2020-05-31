import { gql } from 'apollo-boost';

const getAuthors = gql`
  {
    authors {
      name
      age
      _id
    }
  }
`;

const addAuthorMutation = gql`
  mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
      name
    }
  }
`;

export { getAuthors, addAuthorMutation };
