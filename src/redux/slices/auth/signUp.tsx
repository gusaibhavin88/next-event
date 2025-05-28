import { PostSignUp } from "@/api/auth/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

interface SigninState {
  loading: boolean;
}

interface PostSignUpResponse {
  status: boolean;
  message: string;
}

const initialState: SigninState = {
  loading: false,
};

export const postSignUp: any = createAsyncThunk(
  "signup/postSignup",
  async (data: any) => {
    try {
      const response: any = await PostSignUp(data);
      return response as any;
    } catch (error: any) {
      return {
        status: false,
        message: error.response.data.message,
      } as PostSignUpResponse;
    }
  }
);

export const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postSignUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(postSignUp.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.status == 1) {
          localStorage.setItem("token", action.payload.data.token);
          toast.success(action.payload.message);
        } else {
          toast.error(action.payload.message);
        }
      })
      .addCase(postSignUp.rejected, (state) => {
        state.loading = false;
      });
  },
});
// export const getUserData = (state: { signin: { userData: any } }) =>
//   state.signin.userData;
export default signUpSlice.reducer;
