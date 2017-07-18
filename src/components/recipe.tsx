import * as React from 'react';

import { Recipe, Position } from '../types';
import SentenceComponent from './sentence';

type Props = {
  recipe: Recipe;
  currentWord: Position;
};

export default class RecipeComponent extends React.Component<Props, {}> {

  public render() {
    const {recipe, currentWord} = this.props;

    return (
      <div>
        <h2>{recipe.title}</h2>
        {recipe.sentences.map((s, i) => (
          <SentenceComponent
            key={i}
            sentence={s}
            currentWord={currentWord}
            index={i}
          />
        ))}
      </div>
    );
  }
}
