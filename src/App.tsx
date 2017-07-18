import * as React from 'react';
import './App.css';

import { Position, Recipe, Tag, KeyEvent } from './types';
import RecipeComponent from './components/recipe';
import { getRecipe, defaultRecipe } from './agent';
import { updatePosition, updateRecipe } from './mutate';

type AppState = {
  recipe: Recipe,
  currentWord: Position,
};

class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      recipe: defaultRecipe,
      currentWord: [0, 0],
    };
    this.handleKey = this.handleKey.bind(this);
  }

  async componentDidMount() {
    document.body.addEventListener('keydown', this.handleKey);
    const recipe = await getRecipe();
    this.setState({ recipe });
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKey);
  }

  handleKey(e: KeyboardEvent): void {
    const { recipe, currentWord } = this.state;
    let newPosition: Position = currentWord;
    console.log(e.code);
    if (e.code === 'ArrowLeft') {
      newPosition = updatePosition(recipe!, currentWord, KeyEvent.Left);
    } else if (e.code === 'ArrowUp') {
      newPosition = updatePosition(recipe!, currentWord, KeyEvent.Up);
    } else if (e.code === 'ArrowRight') {
      newPosition = updatePosition(recipe!, currentWord, KeyEvent.Right);
    } else if (e.code === 'ArrowDown') {
      newPosition = updatePosition(recipe!, currentWord, KeyEvent.Down);
    }

    let newRecipe: Recipe = recipe;
    if (e.code === 'Digit1') {
      newRecipe = updateRecipe(recipe, currentWord, Tag.Action);
    } else if (e.code === 'Digit2') {
      newRecipe = updateRecipe(recipe, currentWord, Tag.Ingredient);
    } else if (e.code === 'Digit3') {
      newRecipe = updateRecipe(recipe, currentWord, Tag.None);
    }

    this.setState({ currentWord: newPosition, recipe: newRecipe });
  }

  render() {
    const {recipe, currentWord} = this.state;
    return (
      <div>
        <RecipeComponent currentWord={currentWord} recipe={recipe!} />
      </div>
    );
  }
}

export default App;
