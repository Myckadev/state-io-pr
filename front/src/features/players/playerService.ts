import {baseApi} from "../../app/api/baseApi";

type Player = {
  id: string;
  email: string;
  username: string;
}

type RegisterResponse = {
  message: string
}

type RegisterPlayer = Pick<Player, 'email' | 'username'> & { password: string };
type LoginPlayer = Pick<Player, 'username'> & { password: string };

export const playerApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerPlayer: builder.mutation<RegisterResponse, RegisterPlayer>({
      query: () => '/auth/register',
    }),
    refreshPlayerTokens: builder.mutation<void, void>({
      query: () => '/auth/token/refresh',
    }),
    loginPlayer: builder.mutation<void, LoginPlayer>({
      query: () => '/auth/login',
    }),
    logoutPlayer: builder.mutation<void, void>({
      query: () => '/auth/logout',
    }),
    getMe: builder.query<Player, void>({
      query: () => '/auth/user/me',
    }),
  }),
});

export const {
  useRegisterPlayerMutation,
  useRefreshPlayerTokensMutation,
  useLoginPlayerMutation,
  useLogoutPlayerMutation,
  useGetMeQuery,
} = playerApiSlice;