import axios, { AxiosPromise } from 'axios';

// import { Recipe, POS, Tag } from './types';
import { Annotation, Recipe } from './types';

const BASE_URL = 'https://play.hyeungshikjung.com';
const API_LOGIN = BASE_URL + '/rest-auth';
const API_ROOT = BASE_URL + '/tagger';
// const API_ROOT = 'http://52.196.95.113:8000/tagger/';

export const getRecipe = (id: string): AxiosPromise => {
  return axios.get(API_ROOT + '/recipe/' + id);
};

export const getNewRecipe = (): AxiosPromise => {
  return axios.get(API_ROOT + '/recipe');
};

export const postRecipe = (note: Annotation, token: string) => {
  const headers = {
    'Authorization': `Token ${token}`
  };
  console.log(headers);
  return axios.post(`${API_ROOT}/annotation/${note.origin_id}`, {
      annotator: note.annotator,
      annotation: note.annotations,
    },              {
      headers,
    }
  );
};

export const getToken = (fbToken: string) => {
  return axios.post(`${API_LOGIN}/facebook/`, {
    access_token: fbToken,
  });
};

// const testRecipe: Recipe = {
//   title: 'Chocolate Chip Cookie',
//   sentences: [
//     { words: [
//       { content: 'Heat', pos: POS.Verb, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: 'oven', pos: POS.Noun, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: 'to', pos: POS.Noun, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: '30', pos: POS.Noun, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: 'degrees', pos: POS.Noun, tag: Tag.None },
//     ]},
//     { words: [
//       { content: 'Cool', pos: POS.Verb, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: 'pan', pos: POS.Noun, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: 'to', pos: POS.Noun, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: '15', pos: POS.Noun, tag: Tag.None },
//       { content: '_', pos: POS.Space, tag: Tag.None },
//       { content: 'degrees', pos: POS.Noun, tag: Tag.None },
//     ]},
//   ],
// };

export const defaultRecipe: Recipe = {
  title: 'Loading..',
  origin_id: 'test',
  group_name: 'test',
  instructions: [],
};
