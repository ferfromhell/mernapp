import auth from '../auth';
import bcrypt from 'bcrypt';
import {isAuthenticatedResolver} from '../permissions';


const formatErrors = (error,otherErrors)=>{
    const errors=error.errors;
    let objErrors = []
  
    if(errors){
      Object.entries(errors).map(error=>{
        const {path, message} = error[1];
        objErrors.push({path,message})
      })
      objErrors = objErrors.concat(otherErrors)
      return objErrors;
    }else if(otherErrors.length){
      return otherErrors;
    }
  
  
    const uknownError = {}
    switch(error.code){
      case 11000:
        uknownError.path = "email"
        uknownError.message = "Username taken"
      break;
      default:
        uknownError.path = "unknown"
        uknownError.message = error.message
    }
    return [uknownError]
  
  }

export default {
    Query:{
        allUsers: isAuthenticatedResolver.createResolver(
          (parent, args, {models}) => models.User.find()
        ),//
        getUser: (parent, args, {models}) => models.User.findOne(args)
    },
    Mutation: {
        login: async (parent, {email, password}, {models:{User}})=> auth.login(email, password, User),
        createUser: async (parent, {password,...args}, {models}) => {
            const otherErrors = []
            try{
              if(password.length<4){
                otherErrors.push({path: 'password', message:'Password debe ser mayor a 8 caracteres'})
              }
              if(otherErrors.length){
                throw otherErrors;
              }
              const hashPassword = await bcrypt.hash(password, 10)
              const user = await models.User.create({...args, password: hashPassword})
      
      
              return {
                success: user && user._id,
                errors: []
              };
            }catch(error){
              return {
                success: false,
                errors: formatErrors(error,otherErrors)
              };
            }
        }
    }
}