import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const ordersAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = ordersAdapter.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getorders: builder.query({
      query: () => "/orders",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedOrders = responseData.map((order) => {
          order.id = order._id;
          return order;
        });
        return ordersAdapter.setAll(initialState, loadedOrders);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Order", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Order", id })),
          ];
        } else return [{ type: "Order", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetordersQuery } = ordersApiSlice;

// returns the query result object
export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select();

// creates memoized selector
const selectOrdersData = createSelector(
  selectOrdersResult,
  (ordersResult) => ordersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
  // Pass in a selector that returns the orders slice of state
} = ordersAdapter.getSelectors(
  (state) => selectOrdersData(state) ?? initialState
);