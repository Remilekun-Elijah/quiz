const environment = {};

const routes = {
  home: "/",
  dashboard: "/dashboard",
  create: "/create-list",
  categories: "/categories",
  questions: "/questions",
};

environment.development = {
  // appUser: import.meta.env.VITE_APP_USER || "admin",
  authProps: ["g/token", "g/user"],
  backendUrl: "http://localhost:9000/v1",
  // backendUrl: "https://api-quiz.cyclic.app/v1",
  routes,
  frontendUrl: "https://quiz-jade-omega.vercel.app/",
};

environment.staging = {
  authProps: ["g/token", "g/user"],
  backendUrl: "https://api-quiz.cyclic.app/v1",
  routes,
  frontendUrl: "https://quiz-jade-omega.vercel.app/",
};

environment.production = {
  // appUser: import.meta.env.VITE_APP_USER,
  authProps: ["g/token", "g/user"],
  // backendUrl: "https://api.giftshores.com/v1/",
  backendUrl: "https://fine-gray-dog-gown.cyclic.app/v1/",
  routes,
  frontendUrl: "https://www.giftshores.com/",
};

const env = environment[import.meta.env.MODE];

export default env;
