import { Recipe, POS, Tag } from './types';

export const getRecipe = (): Recipe => {
  return testRecipe;
};

export const postRecipe = (recipe: Recipe) => {
  return;
};

const testRecipe: Recipe = {
  title: 'Chocolate Chip Cookie',
  sentences: [
    { words: [
      { content: 'Heat', pos: POS.Verb, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: 'oven', pos: POS.Noun, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: 'to', pos: POS.Noun, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: '30', pos: POS.Noun, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: 'degrees', pos: POS.Noun, tag: Tag.None },
    ]},
    { words: [
      { content: 'Cool', pos: POS.Verb, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: 'pan', pos: POS.Noun, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: 'to', pos: POS.Noun, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: '15', pos: POS.Noun, tag: Tag.None },
      { content: '_', pos: POS.Space, tag: Tag.None },
      { content: 'degrees', pos: POS.Noun, tag: Tag.None },
    ]},
  ],
};

export const defaultRecipe: Recipe = {
  title: 'Loading..',
  sentences: [],
};
