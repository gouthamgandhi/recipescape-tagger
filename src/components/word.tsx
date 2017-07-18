import * as React from 'react';

import { Word, Tag, POS } from '../types';

type Props = {
  word: Word;
  selected: Boolean;
};

export default class WordComponent extends React.Component<Props, {}> {

  public render() {
    const { word: { content, tag, pos }, selected } = this.props;

    let className = 'word';
    if (tag === Tag.Ingredient) {
      className += ' ingr';
    }
    if (tag === Tag.Action) {
      className += ' action';
    }
    if (selected) {
      className += ' selected';
    }

    if (pos === POS.Space) {
      return (<div className={className}><span>&nbsp;</span></div>);
    } else {
      return (
        <div className={className}>
          <div className="pos-chip">{POS[pos]}</div>
          <span>{content}</span>
        </div>
      );
    }
  }
}
