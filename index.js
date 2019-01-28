import express from 'express';
// import bodyParser from 'body-parser';
// import { graphqlExpress,  } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const { ApolloServer, gql, graphiqlExpress } = require('apollo-server-express');

import typeDefs from './schemas'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
const PORT = 3456;

//Apollo documentation 
const server = new ApolloServer({ schema});

const app = express();
server.applyMiddleware({ app });

// app.get(server.graphqlPath,graphiqlExpress({endpointURL: '/graphql'}));


app.listen(PORT, () =>
  console.log(`🚀 Server ready at ${PORT}${server.graphqlPath}`)
);

// bodyParser is needed just for POST. part of tutorial
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

// app.listen(PORT, ()=>{
//   console.log('Running GRAPHQL server...');
// });