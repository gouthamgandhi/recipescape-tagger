import { KeyEvent, Recipe, Position, Tag } from './types';

export const updatePosition = (recipe: Recipe, pos: Position, key: KeyEvent): Position => {
  var newPosition: Position = [0, 0, 0];

  if (key === KeyEvent.Down) {
    newPosition = [pos[0], pos[1] + 1, 0];
  } else if (key === KeyEvent.Up) {
    newPosition = [pos[0], pos[1] - 1, 0];
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
    } else if (key === KeyEvent.Down) {
      if (pos[0] + 1 <= recipe.instructions.length - 1) {
        return [pos[0] + 1, 0, 0];
      }
    } else if (key === KeyEvent.Up) {
      if (pos[0] - 1 >= 0) {
        const prevInstruction = recipe.instructions[pos[0] - 1];
        return [pos[0] - 1, prevInstruction.sentences.length - 1, 0];
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
