const  ApolloServer = require('apollo-server');
const { find, filter } = require('lodash');
const typeDefs = require("./typeDefs");
import { Author, Book } from './store';

const books = [
    { id: 1, title: 'The Trials of Brother Jero',  cover_image_url: 'ssdsds', average_rating: 8, authorId: 1 },
    { id: 2, title: 'Half of a Yellow Sun',  cover_image_url: 'dsdsds', average_rating: 9, authorId: 3 },
    { id: 3, title: 'Americanah',  cover_image_url: 'dsdsds', average_rating: 9, authorId: 3 },
    { id: 4, title: 'King Baabu',  cover_image_url: 'sdsds', average_rating: 7, authorId: 1 },
    { id: 5, title: 'Children of Blood and Bone',  cover_image_url: 'sdsds', average_rating: 7, authorId: 2 },
  ];

  const authors = [
    { id: 1, first_name: 'Wole', last_name: 'Soyinka' },
    { id: 2, first_name: 'Tomi', last_name: 'Adeyemi' },
    { id: 3, first_name: 'Chimamanda', last_name: 'Adichie' }
  ];

 
  let book_id = 5;
  let author_id = 3;

  const resolvers = {
    Query: {
      books: () => Book.findAll(),
      book: (_, args ) => Book.find({ where: args }),
      author: (_, args) => Author.find({ where: args })
    },
    
    Author: {
      books: (author) => author.getBooks(),
    },
    
    Book: {
     author: (book) => book.getAuthor(),
    },
    
    Mutation: {
      addBook: (_, {title, cover_image_url, average_rating, authorId }) => {
    
       return Book.create({
          title: title,
          cover_image_url: cover_image_url,
          average_rating: average_rating,
          authorId: authorId
        }).then(book => {
          return book;
        });
      }
    }
  }  
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  server.listen({port: process.env.PORT||4000}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });