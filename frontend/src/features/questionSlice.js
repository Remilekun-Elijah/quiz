import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../utils/config";
import Storage from "../utils/storage";
import BACKEND from "../utils/backend";

export const getQuestions = createAsyncThunk(
  "/getQuestions",
  async (_, thunkAPI) => {
    const { pagination } = thunkAPI.getState().question;
    try {
      return new BACKEND().send({
        type: "get",
        to: `/questions?pageNumber=${pagination.page}&pageSize=${pagination.pageSize}&search=${pagination.search}`,
        useAlert: false,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const createQuestion = createAsyncThunk(
  "/admin/createQuestion",
  async (payload, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "post",
        to: "/questions",
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const updateQuestion = createAsyncThunk(
  "/admin/updateQuestion",
  async ({ id, ...payload }, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "patch",
        to: `/questions/${id}`,
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);
export const deleteQuestion = createAsyncThunk(
  "/admin/deleteQuestion",
  async (id, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "delete",
        to: `/questions/${id}`,
        useAlert: true,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  payload: {
    question: "",
    answers: [],
    difficulty: "",
    category: "",
    correctAnswer: "",
  },
  questions: [],
  loading: false,
  preloading: false,
  modalLoading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    length: 0,
    search: "",
    startDate: new Date(),
    endDate: null,
  },
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setPayload: (state, { payload }) => {
      state.payload = { ...payload };
    },
    setPagination: (state, { payload }) => {
      state.pagination = { ...state.pagination, ...payload };
    },
  },
  extraReducers: (builder) => {
    /** loginAdmin Builder **/
    builder
      .addCase(createQuestion.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.modalLoading = false;
      })
      .addCase(createQuestion.rejected, (state) => {
        state.modalLoading = false;
      });
    /** loginAdmin Builder |END| **/
    /** updateQuestion Builder **/
    builder
      .addCase(updateQuestion.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(updateQuestion.fulfilled, (state) => {
        state.modalLoading = false;
      })
      .addCase(updateQuestion.rejected, (state) => {
        state.modalLoading = false;
      });
    /** updateQuestion Builder |END| **/
    /** deleteQuestion Builder **/
    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state) => {
        state.modalLoading = false;
      })
      .addCase(deleteQuestion.rejected, (state) => {
        state.modalLoading = false;
      });
    /** updateQuestion Builder |END| **/

    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getQuestions.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload?.success) {
          state.questions = payload?.data?.questions;

          state.pagination.total = payload?.data?.count;
          state.pagination.length = Math.ceil(
            payload?.data?.count / state.pagination.pageSize
          );
        }
      })
      .addCase(getQuestions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getQuestionData = (state) => state.question;
export const { setPayload, setPagination } = questionSlice.actions;
export default questionSlice.reducer;
