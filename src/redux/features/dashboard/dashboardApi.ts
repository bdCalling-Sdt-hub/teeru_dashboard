import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserRatio: builder.query({
      query: () => {
        return {
          url: "/users/all-users-overview",
          method: "GET",
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
    getNotification: builder.query({
      query: ({ page, limit }) => {
        return {
          url: "notifications/my-notifications",
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetUserRatioQuery, useGetNotificationQuery } = dashboardApi;
