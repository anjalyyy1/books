// the schema here defines the schema for what goes into the graphlHttp which wld use this to understand our project and make a graph out of it so that we can traverse it

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  Gra
} = graphql;
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

// define type, relationship with other types, define root queries

// ================  books type ======================
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // parent has the object we found book(id: 2)-> this is the parent wch has id as 2
        return Author.findById(parent.authorId);
      }
    },
    description: { type: GraphQLString },
    price: { type: GraphQLString }
  })
});

// ================= authors type ===================

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({
          authorId: parent._id
        });
      }
    }
  })
});

// queries allowed from FE
const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { _id: { type: GraphQLID } }, // expect id to come along the query from FE
      resolve(parent, args) {
        // code to get data from db/other source
        // return _.find(dummyBooks, { _id: args._id });
        return Book.findById(args._id);
      }
    },
    author: {
      type: AuthorType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args._id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },

    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });

        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLString }
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          description: args.description,
          authorId: args.authorId,
          price: args.price
        });

        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation
});
