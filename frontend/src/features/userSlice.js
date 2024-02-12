import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../utils/config";
import Storage from "../utils/storage";
import BACKEND from "../utils/backend";

export const getUsers = createAsyncThunk("/user/getUsers", async (thunkAPI) => {
  try {
    return new BACKEND().send({
      type: "get",
      to: "/users",
      useAlert: false,
    });
  } catch (error) {
    thunkAPI.rejectWithValue("An error occurred somewhere");
  }
});

export const createUser = createAsyncThunk(
  "/user/createUser",
  async (payload, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "post",
        to: "/user",
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const loginAdmin = createAsyncThunk(
  "/user/loginAdmin",
  async (payload, thunkAPI) => {
    try {
      return new BACKEND().send({
        type: "post",
        to: "/auth/login",
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const createGift = createAsyncThunk(
  "/user/createGift",
  async (payload, thunkAPI) => {
    const { userId } = thunkAPI.getState().user;
    try {
      return new BACKEND().send({
        type: "post",
        to: `/gift/${userId}`,
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const sendGift = createAsyncThunk(
  "/user/sendGift",
  async (payload, thunkAPI) => {
    const { giftId } = thunkAPI.getState().user;
    try {
      return new BACKEND().send({
        type: "post",
        to: `/send/${giftId}`,
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

export const sendToWhatsapp = createAsyncThunk(
  "/user/sendGift/?type=whatsapp",
  async (payload, thunkAPI) => {
    const { giftId } = thunkAPI.getState().user;
    try {
      return new BACKEND().send({
        type: "post",
        to: `/send/${giftId}/?type=whatsapp`,
        useAlert: true,
        payload,
      });
    } catch (error) {
      thunkAPI.rejectWithValue("An error occurred somewhere");
    }
  }
);

const initialState = {
  payload: {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    gender: "",
    purpose: "",
    others: "none",
  },
  userId: "",
  giftId: "",
  users: [],
  loading: false,
  preloading: false,
  modalLoading: false,
  modal: { open: false, close: false },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => {
      Storage.remove(config.authProps[0]);
      Storage.remove(config.authProps[1]);
    },
  },
  extraReducers: (builder) => {
    /** loginAdmin Builder **/
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          Storage.set(config.authProps[0], payload?.data?.token);
          Storage.set(config.authProps[1], payload?.data);
        }
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.loading = false;
      });
    /** loginAdmin Builder |END| **/

    /** createUser Builder **/
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.userId = payload?.data?._id;
        }
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
      });
    /** createUser Builder |END| **/

    /** createGift Builder **/
    builder
      .addCase(createGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGift.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.success) {
          state.giftId = payload?.data?._id;
        }
      })
      .addCase(createGift.rejected, (state) => {
        state.loading = false;
      });
    /** createGift Builder |END| **/

    /** sendGift Builder **/
    builder
      .addCase(sendGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendGift.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendGift.rejected, (state) => {
        state.loading = false;
      });
    /** sendGift Builder |END| **/

    /** sendToWhatsapp Builder **/
    builder
      .addCase(sendToWhatsapp.pending, (state) => {
        state.modalLoading = true;
      })
      .addCase(sendToWhatsapp.fulfilled, (state) => {
        state.modalLoading = false;
      })
      .addCase(sendToWhatsapp.rejected, (state) => {
        state.modalLoading = false;
      });
    /** sendGift Builder |END| **/
  },
});

export const getUserData = (state) => state.user;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
