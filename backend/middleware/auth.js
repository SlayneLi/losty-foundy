const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    const authHeader = req.get("Auth");
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(authHeader, process.env.JWT_KEY);
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userID = decodedToken.userId;
    next();
}