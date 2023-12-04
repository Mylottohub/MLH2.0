import { apiSlice } from "./apiSlice";

const USER_LOGIN = "/login";
const USER_REGISTER = "/register";
const USER_FORGOTPASSWORD = "/forgot";
const USER_RESETPASSWORD = "/reset";
const PAY_WITH_PAYSTACK = "/payment-initialize";
const USER_OTP = "/otp";
const OPERATOR_GAMES= "/get-games";
// const OPERATOR_TIMETABLE = "/mylotto_get_timetable";
// const { userInfo } = useSelector((state) => state.auth);

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
    resetpasword: builder.mutation({
      query: (data) => ({
        url: `${USER_RESETPASSWORD}`,
        method: "POST",
        body: data,
      }),
    }),
    paystackpayment: builder.mutation({
      query: (data) => ({
        url: `${PAY_WITH_PAYSTACK}`,
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
    // timetable: builder.mutation({
    //   query: (data) => ({
    //     url: `${OPERATOR_TIMETABLE}`,
    //     method: "GET",
    //     body: data,
    //     headers: {
    //       "Content-Type": "application/json", // Set the content type to JSON
    //         "Accept": "application/json",
    //     },
    //   }),
    // }),
    operatorgames: builder.mutation({
      query: (data) => ({
        url: `${OPERATOR_GAMES}`,
        method: "POST",
        body: JSON.stringify(data), // Send data as JSON in the request body
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
            "Accept": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistersMutation,
  useForgotpaswordMutation,
  useUserotpMutation,
  usePaystackpaymentMutation,
  useOperatorgamesMutation,
  // useTimetableMutation
} = userApiSlice;
