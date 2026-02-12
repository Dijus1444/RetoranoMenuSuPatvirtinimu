const asyncHandler = require("express-async-handler");
const {getUser} = require("./helper/user.js");

//middleware leidzia naudoti async lengviau
const protect = asyncHandler(
    async(req, resp, next)=>{
        //deconstrukcia gaunamo user requesto
        const {status, response}=await getUser(req);
        if(status === 200){
            req.user = response;
            next();
        } else{
            //koki koda gavai toki nusiuncia
            resp.status(status).send(response);
        }
    }
)

module.exports = {protect};