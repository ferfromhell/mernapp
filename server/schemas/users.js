export default `
type UserShort{
    _id: ID,
    username: String!
}
type User{
   _id: ID!
   firstname: String!
   lastname: String!
   username: String!
   email: String!
   password: String!
}
type Error{
    path: String!
    message: String!
}
type Query{
    allUsers: [User]!
    getUser(_id: ID!): User!
  }
type Response{
    success: Boolean!
    token: String
    errors: [Error]
}
type Mutation{
    login(email: String!, password:String!): Response!
    createUser(firstname: String!, lastname: String!, username: String!, email: String!, password: String!): Response!
}`