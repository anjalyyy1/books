const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://admin123:admin123@librarydb-2qvbe.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.connection.once('open', () => {
  console.log('connection done');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema, // defines our graph(graphql based) and object types in our graph
    graphiql: true // use graphiql tool when /graphql is hit
  })
); // semd all graphql queries to this middlewrae

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
