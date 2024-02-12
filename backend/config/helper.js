const jwt = require("jsonwebtoken"),
  config = require("./index"),
  bcrypt = require("bcryptjs"),
  secret = config.smtp_secret,
  saltRounds = 10;

exports.generateUserToken = (id, role) => {
  let data = {
    id,
    role,
  };
  const token = jwt.sign(data, secret, {
    expiresIn: "3d",
  });
  return `Bearer ${token}`;
};

exports.verifyToken = (token) => {
  const token_slice = token.replace(/Bearer/g, "").trim();
  const decode = jwt.decode(token_slice);
  var seconds = 1000;
  var d = new Date();
  var t = d.getTime();
  if (decode === "invalid signature") return "invalid_signature";
  else if (decode == (undefined || null)) return "token_expired";
  else if (decode.exp < Math.round(t / seconds)) {
    return "token_expired";
  } else {
    const isVerified = jwt.verify(token_slice, secret);
    return isVerified;
  }
};

exports.hashPassword = (password) => bcrypt.hashSync(password, saltRounds);
/**
 * @description compares the password with the hashed password
 * @param {string} hashedPassword - the saved hashed password
 * @param {string} password - the password to be compared
 * @returns {boolean}  true if the password is correct, false if not
 */
exports.comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};
