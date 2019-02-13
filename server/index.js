
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
// import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServer,gql} from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'; 
import fs from 'fs';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

import models from './models';
import auth from './auth';
import path from 'path';
import 'dotenv/config';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let port = process.env.PORT || 3234;

//Apollo documentation 
const server = new ApolloServer({ schema, context: ({req})=>{
    // console.log('req.headers:', req.user);
    return{
            models,
            SECRET: process.env.SECRET,
            user: req.user
        }
}});

const app = express();
const corsOptions= {
    origin: ["http://localhost:3000"],
    methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true, //allow setting of cookies
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(auth.cehckHeaders);

server.applyMiddleware({ app, cors:{origin: ["http://localhost:3000"]}});

mongoose.connect('mongodb://localhost:27017/bbs',{ useNewUrlParser: true }).then(
    () =>{
        console.log('Connected to mongo db');
        app.listen(port, () =>
            console.log(`🚀 Server ready at ${port}${server.graphqlPath}`)
        );
    }
) 

// app.get(server.graphqlPath,graphiqlExpress({endpointURL: '/graphql'}));



// bodyParser is needed just for POST. part of tutorial
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
