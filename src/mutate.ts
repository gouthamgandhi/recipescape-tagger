import { KeyEvent, Recipe, Position, Tag } from './types';

export const updatePosition = (recipe: Recipe, pos: Position, key: KeyEvent): Position => {
  var newPosition: Position = [0, 0, 0];

  if (key === KeyEvent.Down) {
    newPosition = [pos[0] + 1, pos[1], pos[2]];
  } else if (key === KeyEvent.Up) {
    newPosition = [pos[0] - 1 , pos[1], pos[2]];
  } else if (key === KeyEvent.Left) {
    newPosition = [pos[0], pos[1], pos[2] - 1];
  } else if (key === KeyEvent.Right) {
    newPosition = [pos[0], pos[1], pos[2] + 1];
  }
  const instruction = recipe.instructions[newPosition[0]];
  if (instruction) {
    const sentence = instruction.sentences[newPosition[1]];
    if (sentence) {
      const word = sentence.words[newPosition[2]];
      if (word) {
        return newPosition;
      }
    }
  }
  return pos;
};

export const updateRecipe = (recipe: Recipe, location: Position, tag: Tag): Recipe => {
  const word = recipe.instructions[location[0]].sentences[location[1]].words[location[2]];
  word.tag = tag;
  return recipe;
};
