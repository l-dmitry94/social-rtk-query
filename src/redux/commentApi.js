import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_ENDPOINT = '/comments';
const BASE_URL = 'https://65c09f7adc74300bce8c5b25.mockapi.io/api/v1';

export const commentApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Comments'],
  endpoints: builder => ({
    getComments: builder.query({
      query: () => API_ENDPOINT,
      providesTags: ['Comments'],
    }),
    addComment: builder.mutation({
      query(comment) {
        return {
          url: API_ENDPOINT,
          method: 'POST',
          body: comment,
        };
      },
      invalidatesTags: ['Comments'],
    }),
    updateCommentCount: builder.mutation({
      query({ id, ...comment }) {
        return {
          url: `${API_ENDPOINT}/${id}`,
          method: 'PUT',
          body: comment,
        };
      },
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentCountMutation,
} = commentApi;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const api = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: '/' }),
//   tagTypes: ['Posts'],
//   endpoints: build => ({
//     getPosts: build.query({
//       query: () => 'posts',
//       providesTags: result =>
//         result
//           ? [
//               ...result.map(({ id }) => ({ type: 'Posts', id })),
//               { type: 'Posts', id: 'LIST' },
//             ]
//           : [{ type: 'Posts', id: 'LIST' }],
//     }),
//     addPost: build.mutation({
//       query(body) {
//         return {
//           url: `posts`,
//           method: 'POST',
//           body,
//         };
//       },
//       invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
//     }),
//   }),
// });
