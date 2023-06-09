import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICharacter, ICharacterResponse } from '@/interfaces';
import { getEnvVariables } from '../../../shared/utils/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const rickApi = createApi({
  reducerPath: 'rickAndMortyApi',

  baseQuery: fetchBaseQuery({ baseUrl: VITE_API_URL }),

  tagTypes: ['Characters', 'Character'],

  endpoints: build => ({
    getCharacters: build.query<ICharacterResponse, void>({
      query: () => '/character',
      providesTags: ['Characters'],
    }),

    getCharactersPaged: build.query({
      query: ({ page }) => ({
        url: '/character',
        method: 'GET',
        params: { page },
      }),
      providesTags: ['Characters'],
    }),

    getCharacter: build.query<ICharacter, string>({
      query: id => `/character/${id}`,
      providesTags: ['Character'],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useGetCharactersPagedQuery,
} = rickApi;
