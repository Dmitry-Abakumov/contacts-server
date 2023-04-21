const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw HttpError(401);

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    console.log(user);

    if (!user || !user.token) throw HttpError(401);

    req.user = user;
    next();
  } catch (err) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
