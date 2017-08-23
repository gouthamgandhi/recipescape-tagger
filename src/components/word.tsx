import * as React from 'react';

import { Word, Tag } from '../types';

type Props = {
  word: Word;
  selected: Boolean;
};

export default class WordComponent extends React.Component<Props, {}> {

  public render() {
    const { word: { content, tag }, selected } = this.props;

    let className = 'word';
    if (tag === Tag.Ingredient) {
      className += ' ingr';
    }
    if (tag === Tag.CookingAction) {
      className += ' action';
    }
    if (selected) {
      className += ' selected';
    }

    return (
      <div className={className}>
        <span>{content}</span>
      </div>
    );
  }
}
