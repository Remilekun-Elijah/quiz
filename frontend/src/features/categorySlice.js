import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../utils/config";
import Storage from "../utils/storage";
import BACKEND from "../utils/backend";
// import { deleteCategory } from "../../../backend/controllers/category";

export const getCategories = createAsyncThunk(
  "/getCategories",
  async ({ pageSize }, thunkAPI) => {
    const { pagination } = thunkAPI.getState().category;
    pageSize = pageSize || pagination.pageSize;
    try {
      return new BACKEND().send({
        type: "get",
        to: `/categories?pageNumber=${pagination.page}&pageSize=${
          pageSize === Infinity ? "" : pageSize
        }&search=${pagination.search}`,
        useAlert: false,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "/deleteCategories",
  async (id, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "delete",
        to: `/categories/${id}`,
        useAlert: true,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const createCategory = createAsyncThunk(
  "/admin/createCategory",
  async (payload, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "post",
        to: "/categories",
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const updateCategory = createAsyncThunk(
  "/admin/updateCategory",
  async ({ id, ...payload }, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "patch",
        to: `/categories/${id}`,
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
    name: "",
  },
  categories: [],
  loading: false,
  modalLoading: false,
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    length: 0,
    search: "",
  },
};

export const categorySlice = createSlice({
  name: "category",
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
    /** createCategory Builder **/
    builder
      .addCase(createCategory.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.modalLoading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.modalLoading = false;
      });
    /** createCategory Builder |END| **/
    /** updateCategory Builder **/
    builder
      .addCase(updateCategory.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.modalLoading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.modalLoading = false;
      });
    /** updateCategory Builder |END| **/
    /** deleteQuestion Builder **/
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.modalLoading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.modalLoading = false;
      });
    /** updateQuestion Builder |END| **/

    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload?.success) {
          state.categories = payload?.data?.categories;

          state.pagination.total = payload?.data?.count;
          state.pagination.length = Math.ceil(
            payload?.data?.count / state.pagination.pageSize
          );
        }
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const getCategoryData = (state) => state.category;
export const { setPayload, setPagination } = categorySlice.actions;
export default categorySlice.reducer;
