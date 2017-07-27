import axios, { AxiosPromise } from 'axios';

// import { Recipe, POS, Tag } from './types';
import { Recipe } from './types';

const API_ROOT = 'http://localhost:8000/tagger/';

export const getRecipe = (id: string): AxiosPromise => {
  return axios.get(API_ROOT + id);
};

export const getNewRecipe = (): AxiosPromise => {
  return axios.get(API_ROOT + 'new');
};

export const postRecipe = (recipe: Recipe) => {
  // Not implemented, ye
  return;
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
