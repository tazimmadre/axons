const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(400).send({ error: "Not Authenticated!!  SignIn" });
  }
  const token = authHeader.split(" ")[1];
  let decodeToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretcode");
  } catch (err) {
    res.status(400).send({error:"Not Valid Token"});
  }
  if (!decodedToken) {
    res.status(400).send({ error: "Not Valid Token" });
  }
  req.userId = decodedToken.userId;
  next();
};
