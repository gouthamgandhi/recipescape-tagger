import { Response, Recipe, Tag, Annotation, Note } from '../types';

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

export const extractAnnotation = (recipe: Recipe, annotator: string): Annotation => {
  const annotations = [];
  for (let i = 0; i < recipe.instructions.length - 1; i++) {
    const instruction = recipe.instructions[i];
    for (let j = 0; j < instruction.sentences.length - 1; j++) {
      const sentence = instruction.sentences[j];
      for (let k = 0; k < sentence.words.length - 1; k++) {
        const word = sentence.words[k];
        const note: Note = {
          index: [i, j, k],
          tag: word.tag,
        };
        annotations.push(note);
      }
    }
  }
  const onlyActionIngredeint = annotations.filter((a: Note) => a.tag !== Tag.None);
  return {
    origin_id: recipe.origin_id,
    annotator,
    annotations: onlyActionIngredeint,
  };
};

export const resetAnnotation = (recipe: Recipe): Recipe => {
   for (let i = 0; i < recipe.instructions.length - 1; i++) {
    const instruction = recipe.instructions[i];
    for (let j = 0; j < instruction.sentences.length - 1; j++) {
      const sentence = instruction.sentences[j];
      for (let k = 0; k < sentence.words.length - 1; k++) {
        const word = sentence.words[k];
        word.tag = Tag.None;
      }
    }
  }
   return recipe;
};
