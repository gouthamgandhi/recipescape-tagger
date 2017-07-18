import { KeyEvent, Recipe, Position, Tag } from './types';

export const updatePosition = (recipe: Recipe, pos: Position, key: KeyEvent): Position => {
  var newPosition: Position = [0, 0];

  if (key === KeyEvent.Down) {
    newPosition = [pos[0] + 1, pos[1]];
  } else if (key === KeyEvent.Up) {
    newPosition = [pos[0] - 1 , pos[1]];
  } else if (key === KeyEvent.Left) {
    newPosition = [pos[0], pos[1] - 1];
  } else if (key === KeyEvent.Right) {
    newPosition = [pos[0], pos[1] + 1];
  }
  const sentence = recipe.sentences[newPosition[0]];
  if (sentence) {
    const word = sentence.words[newPosition[1]];
    if (word) {
      return newPosition;
    }
  }
  return pos;
};

export const updateRecipe = (recipe: Recipe, location: Position, tag: Tag): Recipe => {
  const word = recipe.sentences[location[0]].words[location[1]];
  word.tag = tag;
  return recipe;
};
