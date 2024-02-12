/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import Stack from "@mui/joy/Stack";
import FormHelperText from "@mui/joy/FormHelperText";
import { Sheet, Textarea } from "@mui/joy";
import { useFormik } from "formik";
import { vQuestion } from "../../utils/validators";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import SelectInput from "../SelectInput";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestion,
  getQuestionData,
  setPayload,
  updateQuestion,
} from "../../features/questionSlice";
import { getCategories, getCategoryData } from "../../features/categorySlice";

export default function AddQuestion({ open, setOpen, refresh }) {
  const {
    payload: { _id, ...initialValues },
    modalLoading,
  } = useSelector(getQuestionData);
  const { categories, loading } = useSelector(getCategoryData);
  const _answer = {
    value: "",
    error: "",
    idx: null,
  };

  function clearFormAndCloseModal() {
    const emptyPayload = {
      question: "",
      answers: [],
      difficulty: "",
      category: "",
      correctAnswer: "",
    };
    setValues(emptyPayload);
    setOptions([]);
    setAnswer(_answer);
    dispatch(setPayload(emptyPayload));
    setOpen(false);
  }
  const [answer, setAnswer] = React.useState(_answer);
  const [options, setOptions] = React.useState([]),
    dispatch = useDispatch();

  const {
    setValues,
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    validationSchema: vQuestion,
    initialValues: initialValues,
    onSubmit: async (values, { resetForm }) => {
      try {
        let action = createQuestion;
        if (_id) {
          action = updateQuestion;
          values.id = _id;
        }

        const res = await dispatch(action(values)).unwrap();
        if (res.success) {
          resetForm();
          clearFormAndCloseModal();
          await refresh?.();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  React.useEffect(() => {
    dispatch(getCategories({ pageSize: Infinity }));
  }, []);

  React.useEffect(() => {
    if (_id) {
      setValues(initialValues);
      setOptions(initialValues?.answers);
    }
  }, [_id, open]);

  const addAnswer = () => {
    if (options.includes(answer.value)) {
      setAnswer({ ...answer, error: "Same answer has already been added" });
    } else if (!answer.value.length)
      setAnswer({ ...answer, error: "Answer is required" });
    // if you're not editing and answer is already 4 or more
    else if (options.length >= 4 && answer.idx === null)
      setAnswer({ ...answer, error: "Answers cannot be more than 4" });
    else if (answer.idx !== null) {
      const newOption = [...options];

      // updates the correct answer if it being updated from the options
      const correctAnswer =
        newOption[answer.idx] === values.correctAnswer
          ? answer.value
          : values.correctAnswer;
      // updates edited option
      newOption[answer.idx] = answer.value;

      setOptions(newOption);
      setValues({ ...values, answers: newOption, correctAnswer });

      setAnswer({ error: "", value: "", idx: null });
    } else {
      // adds new option to the possible answers
      const newOption = [...options, answer.value];
      setOptions(newOption);
      setValues({ ...values, answers: newOption });

      setAnswer({ error: "", value: "", idx: null });
    }
  };
  const handleEditAnswer = ({ value, idx }) => {
    setAnswer({ error: "", value, idx: idx });
  };
  const handleRemoveAnswer = (idx) => {
    let correctAnswer = values.correctAnswer;
    const newOptions = options.filter((a, i) => {
      if (a === values.correctAnswer) correctAnswer = "";

      return i !== idx;
    });
    setOptions(newOptions);
    setValues({ ...values, answers: newOptions, correctAnswer });
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={clearFormAndCloseModal}>
        <ModalDialog minWidth={500} className="overflow-y-auto">
          <DialogTitle>{_id ? "Update" : "Add New"} Question</DialogTitle>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <SelectInput
                  loading={loading}
                  helperText={touched.category && errors.category}
                  options={categories?.map((a) => ({
                    id: a._id,
                    value: a.name,
                  }))}
                  name={"category"}
                  placeholder="Select a category"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.category}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Difficulty Level</FormLabel>
                <SelectInput
                  helperText={touched.difficulty && errors.difficulty}
                  options={["Easy", "Medium", "Hard"]}
                  value={values.difficulty}
                  name={"difficulty"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder="Select a category"
                />
              </FormControl>
              <FormControl error={touched.question && Boolean(errors.question)}>
                <FormLabel>Question</FormLabel>
                <Textarea
                  size="lg"
                  value={values.question}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="question"
                  placeholder={`Enter your question...`}
                  minRows={3}
                />

                <FormHelperText className="px-[14px]">
                  {touched.question && errors.question}
                </FormHelperText>
              </FormControl>
              <div className="w-full">
                <FormLabel>Answer</FormLabel>
                <div className="mt-1 flex w-full">
                  <Input
                    size="lg"
                    name="answer"
                    value={answer.value}
                    onChange={({ target }) =>
                      setAnswer({ ...answer, error: "", value: target.value })
                    }
                    style={{
                      borderTopRightRadius: "0px",
                      borderBottomRightRadius: "0px",
                    }}
                    className="w-full border rounded-r-none"
                    placeholder={`Enter your answer`}
                  />
                  <Button
                    onClick={addAnswer}
                    style={{
                      borderTopLeftRadius: "0px",
                      borderBottomLeftRadius: "0px",
                    }}
                  >
                    Add
                  </Button>
                </div>
                <FormHelperText
                  sx={{ color: "#c41c1c", marginLeft: "5px", px: "14px" }}
                >
                  {answer.error}
                </FormHelperText>
              </div>
              <div className="my-10">
                {(options.length > 0 || errors.answers) && (
                  <Sheet
                    variant="outlined"
                    sx={{
                      boxShadow: "sm",
                      borderRadius: "sm",
                      p: 2,
                      bgcolor: "#eee",
                      color: "black",
                    }}
                  >
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                      >
                        {options?.map((a, i) => {
                          return (
                            <div
                              key={i}
                              className="flex justify-between items-center"
                            >
                              <FormControlLabel
                                value={a}
                                control={
                                  <Radio
                                    checked={a === values.correctAnswer}
                                    onChange={() =>
                                      setValues({
                                        ...values,
                                        correctAnswer: a,
                                      })
                                    }
                                    checkedIcon={<CheckBoxIcon />}
                                    color="success"
                                  />
                                }
                                label={a}
                              />
                              <div className="flex">
                                <EditIcon
                                  color="info"
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleEditAnswer({ value: a, idx: i })
                                  }
                                />
                                <DeleteIcon
                                  color="error"
                                  className="cursor-pointer"
                                  onClick={() => handleRemoveAnswer(i)}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </RadioGroup>
                      <FormHelperText
                        sx={{ color: "#C41C1C" }}
                        className="text-[#C41C1C] px-[14px]"
                      >
                        {options.length === 4
                          ? touched.correctAnswer && errors.correctAnswer
                          : touched.answers && errors.answers}
                      </FormHelperText>
                    </FormControl>
                  </Sheet>
                )}
              </div>

              <Button loading={modalLoading} type="submit">
                {_id ? "Update" : "Submit"}
              </Button>
              <Button
                type="clear"
                color="neutral"
                onClick={clearFormAndCloseModal}
              >
                Close
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
