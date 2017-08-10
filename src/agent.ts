import axios, { AxiosPromise } from 'axios';

// import { Recipe, POS, Tag } from './types';
import { Annotation, Recipe } from './types';
import { BASE_URL } from './constants';

const API_LOGIN = BASE_URL + '/rest-auth';
const API_ROOT = BASE_URL + '/tagger';

const makeHeader = (token: string): { headers: {Authorization: string}} =>
  ({headers: {Authorization: `Token ${token}`}});

export const getRecipe = (id: string): AxiosPromise => {
  return axios.get(API_ROOT + '/recipe/' + id);
};

export const getNewRecipe = (): AxiosPromise => {
  return axios.get(API_ROOT + '/recipe');
};

export const postRecipe = (note: Annotation, token: string) => {
  return axios.post(`${API_ROOT}/annotation/${note.origin_id}`, {
      annotator: note.annotator,
      annotation: note.annotations,
    },              makeHeader(token)
  );
};

export const getToken = (googToken: string) => {
  return axios.post(`${API_LOGIN}/google/`, {
    access_token: googToken,
  });
};

export function getUserProgress(token: string) {
  return axios.get(`${API_ROOT}/user`, makeHeader(token));
}

export const defaultRecipe: Recipe = {
  title: 'Loading..',
  origin_id: 'test',
  group_name: 'test',
  instructions: [],
};
