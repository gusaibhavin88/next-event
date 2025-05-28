import { PostSignin } from "@/api/auth/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

type UserData = {
  email: string;
  password: string;
};

interface SigninState {
  loading: boolean;
  userData: {};
}

interface PostSigninResponse {
  status: boolean;
  message: string;
}

const initialState: SigninState = {
  loading: false,
  userData: {},
};

export const postSignin: any = createAsyncThunk(
  "signin/postSignin",
  async (data: UserData) => {
    try {
      const response: any = await PostSignin(data);
      return response as UserData;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostSigninResponse;
    }
  }
);

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignin.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSignin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status == 1) {
          localStorage.setItem("token", action.payload.data.token);
          state.userData = action.payload.data.user;
        } else {
        }
      })
      .addCase(postSignin.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const getUserData = (state: { signin: { userData: any } }) =>
  state.signin.userData;
export default signinSlice.reducer;
