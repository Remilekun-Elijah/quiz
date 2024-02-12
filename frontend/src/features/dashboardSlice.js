import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BACKEND from "../utils/backend";
import dayjs from "dayjs";
import { analytics, stats } from "../utils/mock";

export const getDashboardStats = createAsyncThunk(
  "/admin/getDashboard",
  async (thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "get",
        to: "/admin/stats",
        useAlert: false,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const getReport = createAsyncThunk(
  "/admin/getReport",
  async (prop, thunkAPI) => {
    const {
      pagination: {
        page,
        pageSize,
        search,
        startDate,
        endDate,
        filter: { via, isSent, gender, country },
      },
    } = thunkAPI.getState().dashboard;
    const url = `/admin/report/?pageNumber=${page}&pageSize=${
      prop.pageSize || pageSize
    }&search=${search || ""}&gender=${gender || ""}&country=${
      country || ""
    }&isSent=${isSent === null ? "" : isSent}&startDate=${
      startDate ? dayjs(startDate).toISOString() : ""
    }&endDate=${endDate ? dayjs(endDate).toISOString() : ""}&via=${via || ""}`;
    try {
      return new BACKEND().send({
        type: "get",
        to: url,
        useAlert: false,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  // analytics: [],

  stats: {},
  analytics: [],

  reports: [],

  userId: "",
  giftId: "",
  loading: false,
  modalLoading: false,
  preloading: false,
  modal: { open: false, close: false },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    length: 0,
    search: "",
    filter: {
      country: "",
      gender: "",
      isSent: null,
      via: "",
    },
    startDate: new Date(),
    endDate: null,
  },
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPagination: (state, { payload }) => {
      state.pagination = { ...state.pagination, ...payload };
    },
    clearFilter: (state) => {
      state.pagination.filter = {
        country: "",
        gender: "",
        isSent: null,
        via: "",
      };
    },
  },
  extraReducers: (builder) => {
    /** createUser Builder **/
    builder
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.stats = payload.data.stats;
          state.analytics = payload.data.analytics;
        }
      })
      .addCase(getDashboardStats.rejected, (state) => {
        state.loading = false;
      });
    /** createUser Builder |END| **/
    /** getReport Builder **/
    builder
      .addCase(getReport.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(getReport.fulfilled, (state, { payload }) => {
        state.modalLoading = false;
        if (payload?.success) {
          state.reports = payload?.data?.reports;

          state.pagination.total = payload?.data?.count;
          state.pagination.length =
            state.pagination.pageSize * state.pagination.page;
        }
      })
      .addCase(getReport.rejected, (state) => {
        state.modalLoading = false;
      });
    /** createUser Builder |END| **/
  },
});

export const getDashboardData = (state) => state.dashboard;
export const { setPagination, clearFilter } = dashboardSlice.actions;
export default dashboardSlice.reducer;
