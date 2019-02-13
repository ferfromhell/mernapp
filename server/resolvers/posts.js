import {isAuthenticatedResolver} from '../permissions';
import { GraphQLUpload } from 'graphql-upload';
import fs from 'fs';
import mkdirp from 'mkdirp';
import shortid from 'shortid';


const uploadDir = './uploads'
// Ensure upload directory exists
mkdirp.sync(uploadDir)

const storeFS = ({ stream, filename }) => {
  console.log(`stream: ${stream}`);
  const id = shortid.generate()
  const path = `${uploadDir}/${id}-${filename}`
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(path)
        reject(error)
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  )
}

const processUpload = async upload => {
  const { stream, filename, mimetype, encoding } = await upload
  //  const stream = createReadStream();
  console.log('upload: ',upload)
  const { id, path } = await storeFS({ stream, filename })
  return ({ id, filename, mimetype, encoding, path })
}

export default {
    Upload: GraphQLUpload,
    Query:{
        allPosts: isAuthenticatedResolver.createResolver(
            (parent, args, {models}) => models.Post.find()
          ),//
        getPost: (parent, args, {models}) => models.Post.findOne(args)
    },
    Mutation: {
        // createPost: (parent, args, {models, user}) => models.Post.create({...args.post, by: user}),
        createPost: (parent, args, {models, user}) => models.Post.create({...args.post, by: user}),
        //  singleUpload: (obj, { file }) => processUpload(file)
        // singleUpload: async (obj, { file, ...rest }) => {
        //   console.log('file: ', file, rest, obj)
        //   return await processUpload(file)
        //   }
        async singleUpload(parent, { file }) {
          console.log(file);
          const { createReadStream, filename, mimetype,encoding } = await file
          const stream = createReadStream()
          //const { stream, filename, mimetype, encoding } = await file;
          const { id, path } = await storeFS({ stream, filename })
          // 1. Validate file metadata.

          // 2. Stream file contents into cloud storage:
          // https://nodejs.org/api/stream.html

          // 3. Record the file upload in your DB.
          // const id = await recordFile( … )

          return { filename, mimetype, encoding };
        }
    }
}