const dayjs = require("dayjs");
const Question = require("../models/question");

const returnSearch = (words) => {
  return {
    $regex: new RegExp(`.*${words}*.`),
    $options: "i",
  };
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = {};
    const totalCount = await Question.estimatedDocumentCount({});

    stats.totalAnswered = 0;
    stats.totalUnanswered = totalCount;
    stats.totalQuestions = totalCount;

    const analytics = await Question.aggregate([
      {
        $match: {
          dateAdded: {
            $gte: dayjs(dayjs().startOf("month").toISOString()).format(
              "DD/MM/YYYY"
            ),
          },
        },
      },
      {
        $group: { _id: "$dateAdded", totalCount: { $sum: 1 } },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    res.json({
      success: true,
      message: "Stats retrieved successfully",
      data: { stats, analytics },
    });
  } catch (err) {
    next(err);
  }
};
