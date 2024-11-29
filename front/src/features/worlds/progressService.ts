import {baseApi} from "../../app/api/baseApi";

export const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: builder.query<any, void>({
      query: () => ({
        url: 'game/progress/',
      }),
      providesTags: ['PROGRESS'],
    }),
    completeLevel: builder.mutation({
      query: (levelCode: string) => ({
        url: 'game/complete/',
        method: 'POST',
        body: { level_code: levelCode },
      }),
      invalidatesTags: ['PROGRESS'],
    }),
  }),
});

export const {
  useGetProgressQuery,
  useCompleteLevelMutation
} = progressApi;
