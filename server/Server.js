const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema/Schema');

const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');
