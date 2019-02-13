import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import models from '../models';

const auth ={
    cehckHeaders: async (req,res,next)=> {
        const token = req.headers["x-token"];
        // console.log(`req.cookie: ${req}`);
        if(token){
            try{
                const {user}= jwt.verify(token,process.env.SECRET);
                req.user= user; 
                // console.log(user);
            }catch(error){

                const newToken = await auth.checkToken(token);
                req.user=newToken.user;
                if(newToken.token){
                    res.cookie('tokenBBS',newToken.token, { maxAge: 50000, httpOnly: true })
                    // console.log(`new token check headers:${newToken.token}`);
                    res.set("Access-Control-Expose-Headers", "x-token");
                    res.set("x-token",newToken.token);
                }
                // console.log(error);
            }
        }
        next();
    },
    checkToken: async (token)=>{
        let idUser= null;
        try{
            const {user} = await jwt.decode(token);
            idUser= user;
        }catch(err){
            return{}
        }
        const user = await models.User.findOne({_id:idUser});
        const [newToken] = auth.getToken(user);
        return {
            user: user._id,
            token: newToken
        }
    },
    getToken: ({_id}) => {
        const newToken = jwt.sign({user: _id},process.env.SECRET,{ expiresIn: '10s'});
        // console.log(`newtoken: ${newToken}`);
        return [newToken];
    },
    login: async (email,password,User) =>{
        // console.log("Login",email,password,User,SECRET);
        const user = await User.findOne({email});
        if(!user){
            return{
                success: false,
                errors: [{path:'email',message: 'User does not exist'}]
            }
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return{
                success: false,
                errors: [{path:'email',message: 'Password does not match'}]
            }
        }

        const [newToken] = auth.getToken(user)
        //res.cookie('tokenBBS',newToken.token, { maxAge: 50000, httpOnly: true })
        return{
            success: true,
            token: newToken,
            errors: []
        }
    }
}

export default auth;