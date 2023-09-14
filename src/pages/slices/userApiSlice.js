import { apiSlice } from "./apiSlice";

const USER_LOGIN = "/login";
const USER_REGISTER = "/register";
const USER_FORGOTPASSWORD = "/login";
const USER_OTP = "/otp";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_LOGIN}`,
        method: "POST",
        body: data,
      }),
    }),
    registers: builder.mutation({
      query: (data) => ({
        url: `${USER_REGISTER}`,
        method: "POST",
        body: data,
      }),
    }),
    forgotpasword: builder.mutation({
      query: (data) => ({
        url: `${USER_FORGOTPASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    userotp: builder.mutation({
      query: (data) => ({
        url: `${USER_OTP}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistersMutation,
  useForgotpaswordMutation,
  useUserotpMutation,
} = userApiSlice;
