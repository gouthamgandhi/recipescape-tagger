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
        <ColorMap />
        <h1>{recipe.title}</h1>
        <img src={recipe.pictureUrl} />
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
