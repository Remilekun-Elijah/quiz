const joi = require("joi");
const CategoryModel = require("../models/category");
const {
  HTTP_OK,
  HTTP_CONFLICT,
  HTTP_CREATED,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_NOT_FOUND,
} = require("../config/http.status.code");

const returnSearch = (words) => {
  return {
    $regex: new RegExp(`.*${words}*.`),
    $options: "i",
  };
};

const validateCategory = joi.object({
  name: joi.string().min(3).required(),
});
const validateEditCategory = joi.object({
  name: joi.string().min(3),
});

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = await validateCategory.validateAsync(req.body);
    let isExist = await CategoryModel.findOne({
      name,
      user: res.locals.user.id,
    });

    if (isExist) {
      res.status(HTTP_CONFLICT).json({
        success: false,
        message: "This category has already been added by you",
        data: null,
      });
    } else {
      const doc = await CategoryModel.create({
        name,
        user: res.locals.user.id,
      });

      if (doc) {
        res.status(HTTP_CREATED).json({
          success: true,
          message: "Category successfully added",
          data: doc,
        });
      } else {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Could not complete request, please try again.",
        });
      }
    }
  } catch (error) {
    if (err.details) {
      res.status(HTTP_UNPROCESSABLE_ENTITY).json({
        success: false,
        code: HTTP_UNPROCESSABLE_ENTITY,
        error: err.details[0].message,
      });
    } else next(err);
  }
};

exports.editCategory = async (req, res, next) => {
  try {
    const { name } = await validateEditCategory.validateAsync(req.body);
    let isExist = await CategoryModel.findById(req.params.id);

    if (isExist) {
      const doc = await CategoryModel.findByIdAndUpdate(req.params.id, {
        $set: { name },
      });

      res.status(HTTP_OK).json({
        success: true,
        message: "Category updated",
        data: doc,
      });
    } else {
      res.status(HTTP_NOT_FOUND).json({
        success: false,
        message: "Category not found. The category may have been removed.",
      });
    }
  } catch (error) {
    if (err.details) {
      res.status(HTTP_UNPROCESSABLE_ENTITY).json({
        success: false,
        code: HTTP_UNPROCESSABLE_ENTITY,
        error: err.details[0].message,
      });
    } else next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    let isExist = await CategoryModel.findByIdAndDelete(req.params.id);

    if (isExist) {
      res.status(HTTP_OK).json({
        success: true,
        message: "Category deleted",
        data: isExist,
      });
    } else {
      res.status(HTTP_NOT_FOUND).json({
        success: false,
        message: "Category not found. The category may have been removed.",
      });
    }
  } catch (err) {
    if (err.details) {
      res.status(HTTP_UNPROCESSABLE_ENTITY).json({
        success: false,
        code: HTTP_UNPROCESSABLE_ENTITY,
        error: err.details[0].message,
      });
    } else next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    let { search, pageSize, pageNumber } = req.query,
      filter = {};

    if (search) filter.name = returnSearch(search.split(" ")[0] || "");

    pageSize = pageSize || Infinity;
    pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
    const limit = Number(pageSize),
      skip = pageNumber * pageSize;

    const docs = await CategoryModel.find(filter)
        .populate("user")
        .limit(limit)
        .skip(skip)
        .sort({
          createdAt: -1,
        }),
      pageCount = await CategoryModel.countDocuments({ ...filter });

    const data = {
      categories: docs,
      perPage: docs.length,
      count: pageCount,
    };

    res.status(HTTP_OK).json({
      success: true,
      message: "Categories retrieved",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
