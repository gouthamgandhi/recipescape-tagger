import * as React from 'react';

import { Sentence } from '../types';
import WordComponent from './word';

type Props = {
  sentence: Sentence;
  currentWord: [number, number];
  index: Number;
};

export default class SentenceComponent extends React.Component<Props, {}> {

  public render() {
    const { sentence, currentWord, index } = this.props;
    const { words } = sentence;
    return (
      <div className="sentence">
        {words.map((w, i) => (
          <WordComponent
            key={i}
            selected={index === currentWord[0] && i === currentWord[1]}
            word={w}
          />
        ))}
      </div>
    );
  }
}
