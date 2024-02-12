const helper = require("../config/helper");
const { HTTP_UNAUTHORIZED } = require("../config/http.status.code");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token.trim()) {
      const isVerified = helper.verifyToken(token);
      if (
        isVerified === "token_expired" ||
        isVerified === "invalid signature"
      ) {
        return res
          .status(HTTP_UNAUTHORIZED)
          .json({ message: "Unauthorized user", success: true });
      } else {
        res.locals.user = isVerified;
        next();
      }
    } else {
      const data = res.status(HTTP_UNAUTHORIZED).json({
        success: true,
        message: "No token provided",
      });
      return res.status(data.code).json(data);
    }
  } catch (err) {
    return res
      .status(HTTP_UNAUTHORIZED)
      .json({ success: false, message: "Bad Token" });
  }
};
