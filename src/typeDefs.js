const { gql } = require("@apollo/client");

export const typeDefs= gql`
type Author {
  id: Int!
  first_name: String!
  last_name: String!
  books: [Book]!
}

type Book {
  id: Int!
  title: String!
  cover_image_url: String!
  average_rating: Float!
  author: Author!
}

type Query {
  books {
    id
    title
    cover_image_url
    author {
      first_name
      last_name
    }
  }
}



type Mutation {
  addBook(title: String!, cover_image_url: String!, average_rating: Float!, authorId: Int!): Book!
}
`;
