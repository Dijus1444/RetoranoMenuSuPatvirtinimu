const asyncHandler = require("express-async-handler");
const {getUser, notAuthorizeMessage} = require("./helper/user.js");

const protectAdmin = asyncHandler(
    async(req, res, next)=>{
        //laukem atsakimo
        const {status, response}=await getUser(req);
     //jeigu 200 tai gaunam ir tikrinam ar adminas
        if(status===200){
            if(response.role === "admin"){
                req.user= response;next()
            } else{
                res.send(401, notAuthorizeMessage);
            }
        }else{
            res.send(status, response);
        }
    }
);

module.exports = {protectAdmin};