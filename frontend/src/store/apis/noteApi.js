import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const noteApi = createApi({
  reducerPath: "noteApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",

    //  token gjithmonë i update nga Redux
    prepareHeaders: (headers, { getState }) => {
      const user = getState().user;

      if (user?.token) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Note"], //  për cache invalidation

  endpoints: (builder) => ({

    //  GET NOTES
    getNotes: builder.query({
      query: () => "/notes",
      providesTags: ["Note"],
    }),

    //  CREATE NOTE
    createNote: builder.mutation({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: ["Note"],
    }),

    //  UPDATE NOTE
    updateNote: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Note"],
    }),

    //  DELETE NOTE
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Note"],
    }),

  }),
});

//  export hooks
export const {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = noteApi;