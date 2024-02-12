const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_BAD_REQUEST,
  HTTP_OK,
  HTTP_NOT_FOUND,
} = require("../config/http.status.code");
const joi = require("joi");
const validateUser = joi.object({
    username: joi.string().min(3).max(100).required(),
    firstName: joi.string().min(3).max(100),
    lastName: joi.string().min(3).max(100),
    email: joi.string().email({ minDomainSegments: 2 }),
    country: joi.string(),
    gender: joi.string(),
    role: joi.string(),
  }),
  dayjs = require("dayjs"),
  helper = require("../config/helper");
const { UserModel } = require("../models/user");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (user) {
      const iscorrect = helper.comparePassword(user.password, password);
      if (iscorrect) {
        const token = helper.generateUserToken(user._id, user.role);

        // update last login
        await UserModel.findByIdAndUpdate(user._id, {
          lastLogin: dayjs(new Date()).format("YYYY-MM-DD HH:mm"),
        });

        res.status(HTTP_OK).json({
          success: true,
          message: "Logged in successfully",
          data: {
            token,
            user,
          },
        });
      } else {
        res.status(HTTP_BAD_REQUEST).json({
          success: false,
          message: "Username or password is incorrect",
        });
      }
    } else {
      res.status(HTTP_NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    req.body.role = req.body.role || "admin";
    const payload = await validateUser.validateAsync(req.body);
    const doc = await UserModel.create({ ...payload });
    if (doc) {
      res.json({
        success: true,
        message: "Saved",
        data: doc,
      });
    } else {
      res.json({
        success: true,
        message: "Could not process your data, please try again.",
      });
    }
  } catch (err) {
    if (err.details) {
      res.json({
        success: false,
        code: HTTP_UNPROCESSABLE_ENTITY,
        error: err.details[0].message,
      });
    } else next(err);
    //  respond with error to the client
  }
};
