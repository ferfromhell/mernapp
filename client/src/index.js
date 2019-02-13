import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, ApolloLink} from 'apollo-boost';
// import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
// import { setContext } from 'apollo-link-context';

import "semantic-ui-css/semantic.min.css";
import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';

const uploadLink = createUploadLink({
  uri: 'http://localhost:3456/graphql',
  credentials: 'include'
});

// const httpLink = createHttpLink({
//   uri: 'http://localhost:3456/graphql',
//   credentials: 'include'
// });
//middleware
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      "x-token": localStorage.getItem('tokenbbs') || null,
    }
  });
  return forward(operation);
})
const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    // console.log(operation.getContext());
    const context= operation.getContext();
     const { response: { headers } } = context;
    // console.log(context);
    if (headers) {
      const refreshToken = headers['x-token'];
      if(refreshToken){
        localStorage.setItem('tokenbbs',refreshToken)
      }
    }
    if(response.errors && response.errors.length){
      if(response.errors[0].message==="User not login"){
        localStorage.removeItem('tokenbbs')
        window.location = "/login"
      }
    };
    // console.log(response);
    return response;
  });
});
const client = new ApolloClient({
  link: authAfterware.concat(authLink.concat(uploadLink)),
  cache: new InMemoryCache()
});

// Pass your GraphQL endpoint to uri
// const client = new ApolloClient({ 
//   uri: 'http://localhost:3456/graphql' 
// });
const ApolloApp = AppComponent => (
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  );
  

ReactDOM.render(ApolloApp(App), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();



