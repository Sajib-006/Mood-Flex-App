const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  //const token = req.headers.token;
  //console.log('token', token)
  const token = req.get("Authorization");
  //const tokens = req.headers.Authorization;
  console.log("tokens......", token);
  //console.log(tokens["token"], "not yet verified");
  try {
    const data = jwt.verify(token, process.env.JWT_KEY, { algorithm: "HS256" });
    //console.log(data)
    const user = await User.findOne({
      _id: data._id,
    });

    if (!user) {
      throw new Error();
    }
    console.log(user, "verified");
    req.user = user;
    req.token = token;
    console.log("heliok");
    next();
    console.log("helio");
  } catch (error) {
    res.status(401).send({
      error: "Not authorized to access this resource",
    });
  }
};

module.exports = auth;
