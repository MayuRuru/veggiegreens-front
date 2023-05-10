import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include", // we will always send httpOnly cookie

  // specific function from fetchBaseQuery:
  // we pass headers + API object from which we can destructure getState
  // and get the current state or token from authState
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    // if we have a token, we pass the specific format expected to very request we sent:
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// query wrapper => accepts args, own api and extraOptions

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // Optional: handle other status codes
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired. ";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  //baseQuery,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Order", "User"],
  endpoints: (builder) => ({}),
});
