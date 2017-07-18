export enum POS {
  Verb,
  Noun,
  Etc
}

export enum Tag {
  Action,
  Ingredient,
  None
}

export enum KeyEvent {
  Left,
  Right,
  Up,
  Down
}

export type Word = {
  content: string;
  tag: Tag;
  pos: POS;
};

export type Sentence = {
  words: Array<Word>;
};

export type Recipe = {
  title: String;
  pictureUrl?: String;
  sentences: Array<Sentence>;
};

export type Position = [number, number];
