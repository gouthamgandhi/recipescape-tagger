import * as React from 'react';

import { Sentence, Position } from '../types';
import WordComponent from './word';

type Props = {
  sentence: Sentence;
  currentWord: Position;
  index: [number, number];
};

export default class SentenceComponent extends React.Component<Props, {}> {

  public render() {
    const { sentence, currentWord, index } = this.props;
    const { words } = sentence;
    const hasCurrentWords = (currentWord[0] === index[0]) && (currentWord[1] === index[1]);
    return (
      <div className={`sentence ${hasCurrentWords ? '' : 'inactive'}`}>
        {words.map((w, i) => (
          <WordComponent
            key={i}
            selected={index[0] === currentWord[0] &&
                      index[1] === currentWord[1] &&
                      i === currentWord[2]}
            word={w}
          />
        ))}
      </div>
    );
  }
}
