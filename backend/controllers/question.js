const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_OK,
  HTTP_CONFLICT,
  HTTP_NOT_FOUND,
  HTTP_CREATED,
  HTTP_INTERNAL_SERVER_ERROR,
} = require("../config/http.status.code");
const QuestionModel = require("../models/question");
const joi = require("joi");
const returnSearch = (words) => {
  return {
    $regex: new RegExp(`.*${words}*.`),
    $options: "i",
  };
};
const validateQuestion = joi.object({
  question: joi.string().min(3).required(),
  answers: joi.array().items(joi.any()).length(4),
  category: joi.string().required(),
  correctAnswer: joi.string().required(),
  difficulty: joi.string().required(),
});
const validateQuestionUpdate = joi.object({
  question: joi.string().min(3),
  answers: joi.array().items(joi.any()).length(4),
  category: joi.string(),
  correctAnswer: joi.string(),
  difficulty: joi.string(),
});

exports.createQuestion = async (req, res, next) => {
  try {
    const { question, answers, difficulty, category, correctAnswer } =
      await validateQuestion.validateAsync(req.body);
    let isExist = await QuestionModel.findOne({
      question,
      user: res.locals.user.id,
    });

    if (isExist) {
      res.status(HTTP_CONFLICT).json({
        success: false,
        message: "This question has already been added by you",
        data: null,
      });
    } else {
      const doc = await QuestionModel.create({
        question,
        answers,
        difficulty,
        category,
        correctAnswer,
        user: res.locals.user.id,
      });

      if (doc) {
        res.status(HTTP_CREATED).json({
          success: true,
          message: "Question successfully added",
          data: doc,
        });
      } else {
        res.status(HTTP_INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Could not complete request, please try again.",
        });
      }
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

exports.getQuestions = async (req, res, next) => {
  try {
    let { search, pageSize, pageNumber, ...date } = req.query,
      filter = {};

    if (search) filter.question = returnSearch(search.split(" ")[0] || "");

    pageSize = pageSize || Infinity;
    pageNumber = pageNumber > 0 ? pageNumber - 1 : 0;
    const limit = Number(pageSize),
      skip = pageNumber * pageSize;

    if (date.startDate && date.endDate) {
      filter.createdAt = { $gte: date.startDate, $lte: date.endDate };
    }

    const docs = await QuestionModel.find(filter)
        .populate("category")
        .limit(limit)
        .skip(skip)
        .sort({
          createdAt: -1,
        }),
      pageCount = await QuestionModel.countDocuments({ ...filter });

    const data = {
      questions: docs,
      perPage: docs.length,
      count: pageCount,
    };

    res.status(HTTP_OK).json({
      success: true,
      message: "Questions retrieved",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

exports.editQuestion = async (req, res, next) => {
  try {
    const { question, answers, difficulty, category, correctAnswer } =
      await validateQuestionUpdate.validateAsync(req.body);
    let isExist = await QuestionModel.findById(req.params.id);

    if (isExist) {
      const doc = await QuestionModel.findByIdAndUpdate(req.params.id, {
        $set: { question, answers, difficulty, category, correctAnswer },
      });

      res.status(HTTP_OK).json({
        success: true,
        message: "Question updated",
        data: doc,
      });
    } else {
      res.status(HTTP_NOT_FOUND).json({
        success: false,
        message: "Question not found. The question may have been removed.",
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

exports.deleteQuestion = async (req, res, next) => {
  try {
    let isExist = await QuestionModel.findByIdAndDelete(req.params.id);

    if (isExist) {
      res.status(HTTP_OK).json({
        success: true,
        message: "Question deleted",
        data: isExist,
      });
    } else {
      res.status(HTTP_NOT_FOUND).json({
        success: false,
        message: "Question not found. The question may have been removed.",
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
