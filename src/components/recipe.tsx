import * as React from 'react';

import { Recipe, Position } from '../types';
import InstructionComponent from './instruction';
import ColorMap from './colorMap';

type Props = {
  recipe: Recipe;
  currentWord: Position;
};

export default class RecipeComponent extends React.Component<Props, {}> {

  public render() {
    const {recipe, currentWord} = this.props;

    return (
      <div>
        <h1>{recipe.title}</h1>
        <ColorMap />
        {recipe.instructions.map((s, i) => (
          <InstructionComponent
            key={i}
            instruction={s}
            currentWord={currentWord}
            index={[i]}
          />
        ))}
      </div>
    );
  }
}
