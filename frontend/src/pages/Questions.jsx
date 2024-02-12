/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
// import {  } from "../features/dashboardSlice";
import HomeLayout from "../layouts/Home";
import {
  Button,
  Container,
  Typography,
  Chip,
  Skeleton,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddQuestionModal from "../components/Modals/AddQuestion";
import { useNavigate } from "react-router-dom";
import config from "../utils/config";
import Storage from "../utils/storage";
import { Box, Card, CardActions, CardContent } from "@mui/joy";
import {
  deleteQuestion,
  getQuestionData,
  getQuestions,
  setPayload,
  setPagination,
} from "../features/questionSlice";
import dayjs from "dayjs";
import ViewModal from "../components/Modals/View";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CheckIcon from "@mui/icons-material/Check";
import Confirmation from "../components/Modals/Confirmation";
import Emptystate from "../components/Emptystate";

const Report = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate();

  const { loading, pagination, questions, modalLoading } =
      useSelector(getQuestionData),
    [open, setOpen] = useState(false),
    [open1, setOpen1] = useState(false),
    [deleteData, setDeleteData] = useState({ open: false, id: "" }),
    [question, setQuestion] = useState({});

  useEffect(() => {
    dispatch(setPagination({ page: 1, endDate: null }));

    const nav = Storage.get(config.authProps[0]);
    if (nav === null) navigate("/");
  }, []);

  useEffect(() => {
    let cb = () => {};
    if (pagination?.search) {
      dispatch(setPagination({ page: 1 }));
      cb = setTimeout(() => Promise.all([dispatch(getQuestions({}))]), 700);
    } else cb = Promise.all([dispatch(getQuestions({}))]);

    return () => {
      clearTimeout(cb);
    };
  }, [pagination.page, pagination.search]);

  function viewQuestion(question) {
    setOpen(true);
    setQuestion(question);
  }

  function handleEdit({
    question,
    answers,
    difficulty,
    category,
    correctAnswer,
    _id,
  }) {
    const newPayload = {
      _id,
      question,
      answers,
      difficulty,
      category: category?._id,
      correctAnswer,
    };
    setOpen1(true);
    setOpen(false);
    dispatch(setPayload(newPayload));
  }

  async function handleDelete() {
    try {
      const res = await dispatch(deleteQuestion(deleteData?.id)).unwrap();
      if (res?.success) {
        setDeleteData({ open: false, id: "" });
        await dispatch(getQuestions());
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <HomeLayout>
      <div className="mb-10">
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="#040316"
          fontSize="32px"
          className="sofiaProBold"
          sx={{ my: 3 }}
        >
          Questions
        </Typography>

        <div className="lg:grid lg:grid-cols-2 mb-8">
          <div className="col-span-1 lg:mb-0 mb-6 ">
            <SearchBar
              {...{
                value: pagination.search,
                onChange: ({ target: { value } }) =>
                  dispatch(setPagination({ page: 1, search: value.trim() })),
                placeholder: "Search by question...",
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              startIcon={<AddIcon />}
              onClick={() => {
                setPayload({
                  question: "",
                  answers: [],
                  difficulty: "",
                  category: "",
                  correctAnswer: "",
                });
                setOpen1(true);
              }}
              sx={{
                textTransform: "capitalize",
                py: "22px",
                bgcolor: "purple",
                color: "white",
                "&:hover": { bgcolor: "purple" },
              }}
              variant="contained"
              size="small"
              className="h-[40px] w-44 border-2 border-[purple] z-10 font-[500] md:text-[15px] text-[10px] rounded"
            >
              {" "}
              ADD
            </Button>
          </div>
        </div>

        <Container>
          {loading || pagination.length ? (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 w-full gap-10">
              {/* TODO - replace false with loading state  */}
              {loading
                ? [1, 2, 3].map((a) => (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      key={a}
                      component={Card}
                      height={"155px"}
                    />
                  ))
                : questions.map((question) => {
                    return (
                      <Card
                        key={question?._id}
                        variant="solid"
                        sx={{
                          boxShadow: "lg",
                          maxWidth: "100%",
                          overflow: "auto",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Chip
                            size="sm"
                            variant="filled"
                            color={`${
                              question?.difficulty === "Easy"
                                ? "success"
                                : question?.difficulty === "Medium"
                                ? "warning"
                                : "error"
                            }`}
                            label={question?.difficulty}
                          />
                          <Chip
                            color="secondary"
                            icon={<QueryBuilderIcon />}
                            size="sm"
                            label={dayjs(question.dateCreated).format("MMM DD")}
                            variant="filled"
                          />
                          <Chip
                            color="success"
                            icon={<CheckIcon />}
                            size="sm"
                            label={question?.correctCount}
                            variant="filled"
                          />
                          <Chip
                            color="error"
                            icon={<ClearIcon />}
                            size="sm"
                            label={question?.incorrectCount}
                            variant="filled"
                          />
                        </Box>
                        <CardContent>
                          <Typography level="title-lg">
                            {question?.category?.name}
                          </Typography>
                          <Typography level="body-md">
                            {question?.question}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            variant="contained"
                            startIcon={<VisibilityIcon />}
                            onClick={() => viewQuestion(question)}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={() =>
                              setDeleteData({ open: true, id: question?._id })
                            }
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    );
                  })}
            </div>
          ) : (
            <Emptystate
              {...{ pagination, msgArray: ["No question at the moment"] }}
            />
          )}
        </Container>

        {pagination.total !== 0 && (
          <div className="flex justify-center py-16">
            <Pagination
              count={pagination.length}
              page={pagination.page}
              defaultPage={1}
              variant="outlined"
              size="large"
              shape="rounded"
              onChange={(e, page) => dispatch(setPagination({ page }))}
            />
          </div>
        )}
      </div>

      {question && (
        <ViewModal
          {...{ open: open, setOpen: setOpen, data: question, handleEdit }}
        />
      )}
      <AddQuestionModal
        {...{
          open: open1,
          setOpen: setOpen1,
          refresh: async () => await dispatch(getQuestions()),
        }}
      />
      <Confirmation
        {...{
          title: "Delete Question",
          subtitle: "Are you sure you want to delete this question?",
          open: deleteData.open,
          loading: modalLoading,
          close: () => setDeleteData({ open: false }),
          handleConfirm: handleDelete,
        }}
      />
    </HomeLayout>
  );
};

export default Report;
