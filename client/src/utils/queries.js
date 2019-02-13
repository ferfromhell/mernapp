import {gql} from 'apollo-boost';

export default{
    query:{

    },
    mutation:{
        login: gql`
        mutation($email: String!, $password: String!){
            login(email: $email, password: $password) {
              success
              token
              errors{
                path
                message
              }
            }
          }
        `,
        createUser: gql`
        mutation($firstname:String!, $lastname:String!, $username:String! ,$email:String!, $password:String!){
            createUser(firstname: $firstname, lastname:$lastname, username:$username, email:$email,password:$password){
                   succes
                   errors{
                       path
                       message
                   }
            }
          }
        `
    },
    // subscriptions:{}
}