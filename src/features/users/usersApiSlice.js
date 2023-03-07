import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Normalize state with createEntity using ids:
const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        // validate status:
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,

      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },

      // handling errors:
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

// export the generated hook:
export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object:
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector to use:
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

// getSelectors creates automatically these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state:
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
