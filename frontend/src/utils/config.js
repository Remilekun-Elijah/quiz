const environment = {};

const routes = {
  home: "/",
  dashboard: "/dashboard",
  create: "/create-list",
  categories: "/categories",
  questions: "/questions",
};

environment.development = {
  authProps: ["g/token", "g/user"],
  backendUrl: "http://localhost:9000/v1",
  routes,
  frontendUrl: "http://localhost:5173/",
};

environment.staging = {
  authProps: ["g/token", "g/user"],
  backendUrl: "https://api-quiz.cyclic.app/v1",
  routes,
  frontendUrl: "https://quizshore.vercel.app/",
};

environment.production = {
  authProps: ["g/token", "g/user"],
  backendUrl: "https://api-quiz.cyclic.app/v1",
  routes,
  frontendUrl: "https://quizshore.vercel.app/",
};

const env = environment[import.meta.env.MODE];

export default env;
