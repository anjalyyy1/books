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

// disabling cors
app.use((req, res, next) => {
  // this will not send any response but would adjust/enhance it
  res.header('Access-Control-Allow-Origin', '*'); // * -> give access to any origin (any webpage, or we can specify the url to whom we want to give the access)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  ); // cld be * also (these headers can also be appended to an incoming request)

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, GET');
    return res.status(200).json({}); // we return so tht further code is not executed if the req method is OPTIONS
  }
  next();
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
