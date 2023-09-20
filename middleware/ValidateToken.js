import pkg from 'jsonwebtoken'; 
import asyncHandler from "express-async-handler";

export const ValidateToken =  asyncHandler(async (req, res, next) => {
    const jwt = pkg; 
    let token 
    let authHeader = req.headers.Authorization || req.headers.authorization; 
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]; 

        jwt.verify(
            token, 'eking@590', (err, decoded) => {
                if(err){
                    res.status(401)
                    throw new Error('User is not Authorized!')
                } 
                req.user = decoded.user.data; 
                next() 
            }) 

            if(token == undefined){
                res.status(401);
                throw new Error('User is not Authorized!!!')
            }
    }
})