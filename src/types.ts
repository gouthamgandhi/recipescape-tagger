// export type POS = 'verb' | 'noun' | 'etc';

export enum Tag {
  CookingAction,
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
  pos: string;
};

export type Sentence = {
  words: Array<Word>;
};

export type Instruction = {
  sentences: Array<Sentence>
};

export type Recipe = {
  title: string;
  pictureUrl?: string;
  instructions: Array<Instruction>;
  origin_id: string;
  group_name: string;
};

export type Response = {
  origin_id: string,
  group_name: string,
  title: string,
  image_url: string,
  instructions: {
    instructions: Array<Array<{
      index: number,
      tokens: Array<{
        pos: string,
        word: string,
        originalText: string,
        after: string,
      }>
    }>>
  }
};

export type Annotation = {
  origin_id: string;
  annotator: string;
  annotations: Array<Note>
};

export type Note = {
  index: Position;
  tag: Tag
};

export type User = {
  loggedIn: Boolean,
  token: string,
  name: string,
};

export type Position = [number, number, number];
// ( instruction_index, sentence_index, position_index )
