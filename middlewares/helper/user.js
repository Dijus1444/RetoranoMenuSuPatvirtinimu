const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel.js");

const NOT_AUTHORIZED = "Not authorized";
const NOT_AUTHORIZED_NO_TOKEN = "Not authorized, no token";

async function getUser(req){
    /// patikrina ar turi tokena
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){  //["bearer", "waerwdfaertregerg"]
        // pajiema token is arrey
        try{
             const token = req.headers.authorization.split(" ")[1];

             if(!token){
                return{ status:401, response: NOT_AUTHORIZED_NO_TOKEN };
             }

             //atkodojame musu tokena
             const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // surandam vartotoja pagal atkodtuota tokena ir passwardo nerodititi
             const user = await User.findById(decoded.id).select("-password");
             return {status: 200, response: user};
        }
        catch(err){
            console.error(err);
            return {status: 401, response: NOT_AUTHORIZED};
        }
    }
    return {status: 401, response: NOT_AUTHORIZED};
}

module.exports = {getUser, notAuthorizeMessage: NOT_AUTHORIZED};