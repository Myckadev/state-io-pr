import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './apiUtils';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PRODUCT'],
  endpoints: () => ({})
})