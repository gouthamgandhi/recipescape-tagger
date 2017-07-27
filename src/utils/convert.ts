import { Response, Recipe, Tag } from '../types';

export const formatRecipe = (resp: Response): Recipe => {
  const instructions = resp.instructions.instructions.map(instruction => ({
    sentences: instruction.map(sentence => ({
      words: sentence.tokens.map(token => ({
        content: token.originalText + token.after.replace(/ /g, '\u00a0'),
        tag: Tag.None,
        pos: token.pos
      }))
    }))
  }));

  return {
    title: resp.title,
    origin_id: resp.origin_id,
    group_name: resp.group_name,
    instructions: instructions,
  };
};
