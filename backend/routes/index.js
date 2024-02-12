const api = require("express")();
const user = require("../controllers/users");
const admin = require("../controllers/admin");
const question = require("../controllers/question");
const authorization = require("../middleware/auth.middleware");
const category = require("../controllers/category");

api.post("/auth/login", user.login);
api.post("/user", user.createUser);

api.post("/questions", authorization, question.createQuestion);
api.get("/questions", authorization, question.getQuestions);
api.patch("/questions/:id", authorization, question.editQuestion);
api.delete("/questions/:id", authorization, question.deleteQuestion);

api.get("/admin/stats", authorization, admin.getStats);

api.post("/categories", authorization, category.createCategory);
api.get("/categories", authorization, category.getCategories);
api.patch("/categories/:id", authorization, category.editCategory);
api.delete("/categories/:id", authorization, category.deleteCategory);

module.exports = api;
