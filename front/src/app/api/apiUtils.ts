import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from 'async-mutex';
import { BASE_API_URL } from '../env';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_API_URL}`,
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
  credentials: 'include',
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  await mutex.waitForUnlock(); // Attendre que le mutex soit déverrouillé (en cas de refresh en cours)

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Vérifier si un refresh token est déjà en cours
    if (!mutex.isLocked()) {
      const release = await mutex.acquire(); // Verrouiller le mutex

      try {
        // Tenter de rafraîchir le token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        if (refreshResult.data) {
          // Si le refresh réussit, réessayer la requête d'origine
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Si le refresh échoue, déconnecter l'utilisateur
          console.log('nice')
          // api.dispatch(logout());
        }
      } finally {
        release(); // Libérer le mutex après utilisation
      }
    } else {
      // Attendre que le mutex soit libéré et essayer à nouveau
      await mutex.waitForUnlock();
      // Éviter de réessayer la requête d'origine si le refresh a échoué précédemment
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};