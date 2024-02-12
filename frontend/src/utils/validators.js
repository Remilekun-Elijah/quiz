import * as Yup from "yup";

const lettersRegex = /^[A-Za-z\s{2,}]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/gi;

const email = Yup.string()
    .required("Email Address is required")
    .email("Email Address is invalid")
    .matches(emailRegex, "Email Address is invalid"),
  firstName = Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .matches(
      lettersRegex,
      "Username cannot contain numbers and special characters"
    ),
  lastName = Yup.string()
    .required("Last Name is required")
    .min(3, "Last Name must be at least 3 characters")
    .max(30, "Last Name must be less than 30 characters")
    .matches(lettersRegex, "cannot contain numbers and special characters"),
  password = Yup.string().required("Password is required");

export const vCreateUser = Yup.object({
  username: firstName,
  firstName,
  lastName,
  email,
  country: Yup.string(),
  gender: Yup.string().required("Gender is required"),
  purpose: Yup.string().required("Purpose of Gift is required"),
  others: Yup.string().required("Others is required"),
});

export const vQuestion = Yup.object({
  question: Yup.string().required("Question is required"),
  answers: Yup.array(Yup.string().required("Answer is required")).length(
    4,
    "Answers must be at least 4"
  ),
  difficulty: Yup.string().required("Difficulty Level is required"),
  category: Yup.string().required("Category is required"),
  correctAnswer: Yup.mixed().required("You must select a correct answer"),
});

export const vAdminLogin = Yup.object({
  email: Yup.string().required("Username is required"),
  // password,
});
export const vAddCategory = Yup.object({
  name: Yup.string().required("Category Name is required"),
});
