const jwt = require("jsonwebtoken");

const verifyToken = (role) => {
  return (req, res, next) => {
    const token = req.header("token");
    console.log({ token });

    if (!token) {
      res.status(401).json("token is required");
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      console.log(decoded.user.role);
      if (decoded.user.role != role) {
        res.status(403).json("you are not access for this resourse");
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json("invalid authentication token");
    }
  };
};

module.exports = verifyToken;
