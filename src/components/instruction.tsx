import * as React from 'react';

import { Instruction, Position } from '../types';
import SentenceComponent from './sentence';

type Props = {
  instruction: Instruction;
  currentWord: Position;
  index: [number],
};

export default class InstructionComponent extends React.Component<Props, {}> {

  public render() {
    const {instruction, currentWord, index} = this.props;

    return (
      <div>
        {instruction.sentences.map((s, i) => (
          <SentenceComponent
            key={i}
            sentence={s}
            currentWord={currentWord}
            index={[index[0], i]}
          />
        ))}
      </div>
    );
  }
}
