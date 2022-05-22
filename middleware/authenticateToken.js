
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

    if (!token)
        return res
            .status(401)
            .send({ success: false, message: "Authorization token is requred" });

    try {
        const decodedToken = jwt.decode(token);
        if (!decodedToken)
            return res.status(403).send({ success: false, message: "Invalid token" });
        req.userId = decodedToken.id;
        next();
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}
module.exports = authenticateToken;