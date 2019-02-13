// import { gql} from 'apollo-server';

export default `
scalar Upload
type Post{
   _id: ID!
   tittle: String
   text: String
   vote: Int
   by: UserShort
   createdat: String
   updatedat: String 
   comments: [UserShort]
   photo: String
}
type Comment{
  user: User
  text: String
}
input iBy {
    username: String!
}
input iPost{
    by: iBy
    tittle: String
    text: String
    photo: String
  }
type File {
    id: ID!
    path: String! 
    filename: String!
    mimetype: String!
    encoding: String!
  }
type Query{
    allPosts: [Post]!
    getPost(_id: ID!): Post!
    uploads: [File]
  }
type Mutation{
    createPost(post: iPost): Post!
    singleUpload(file: Upload!): File!
}`