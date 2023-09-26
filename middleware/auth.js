const jwt =require('jsonwebtoken')
const config = require('config')
const { message, statusCode } = require("../utilites/message");
const { successAction, faildAction } = require("../utilites/response");
const {generateToken} = require("../utilites/universal")
const { jwtKey } = config.get("app")



// exports.checkToken = (req, res, next) => {
//     try {
//         if(token)
//         {
//       const decoded = jwt.verify(token, jwtKey, { algorithms: [jwtAlgo] });
//       return decoded;
//     }
//     else {
//         return res.status(statusCode.unauthorized).json(faildAction(statusCode.unauthorized, null, message.unauthorized))
//     }
//     }

//  catch (err) {
//     console.log('error', err)
//     return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, null, message.tokenExpired))
// }

// };






exports.checkToken = async (req, res, next) => {
    try {
       
        let token = req.headers.authorization;
        if (token) {
            token = token.replace("Bearer ", "")
            const decoded = await jwt.verify(token, jwtKey);
            
            const validationTime = new Date(Date.now())
            if (auth && validationTime < new Date(auth.expiryTime)) {
                req.user = { ...decoded, token };
                next();
            } else {
                return res.status(statusCode.unauthorized).json(faildAction(statusCode.unauthorized, null, message.unauthorized))
            }
        } else {
            return res.status(statusCode.unauthorized).json(faildAction(statusCode.unauthorized, null, message.tokenRequired))
        }
    } catch (err) {
        console.log('error', err)
        return res.status(statusCode.serverError).json(faildAction(statusCode.serverError, null, message.tokenExpired))
    }
};
