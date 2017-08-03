import * as React from 'react';
import './App.css';

import { Position, Recipe, Tag, KeyEvent } from './types';
import RecipeComponent from './components/recipe';
import ControlComponent from './components/control';
import { getNewRecipe, defaultRecipe, postRecipe } from './agent';
import { updatePosition, updateRecipe } from './mutate';
import { formatRecipe, extractAnnotation, resetAnnotation } from './utils/convert';

type AppState = {
  recipe: Recipe,
  currentWord: Position,
};

class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      recipe: defaultRecipe,
      currentWord: [0, 0, 0],
    };
    this.handleKey = this.handleKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.getNewRecipe = this.getNewRecipe.bind(this);
  }

  async componentDidMount() {
    document.body.addEventListener('keydown', this.handleKey);
    this.getNewRecipe();
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKey);
  }

  async getNewRecipe() {
    const resp = await getNewRecipe();
    const recipe = formatRecipe(resp.data);
    this.setState({
      recipe,
      currentWord: [0, 0, 0],
    });
  }

  async handleSubmit(annotatorName: string) {
    const { recipe } = this.state;
    const annotation = extractAnnotation(recipe, annotatorName);
    await postRecipe(annotation);
    this.getNewRecipe();
  }

  handleReset() {
    this.setState({
      recipe: resetAnnotation(this.state.recipe),
      currentWord: [0, 0, 0],
    });
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
      newRecipe = updateRecipe(recipe, currentWord, Tag.CookingAction);
    } else if (e.code === 'Digit2') {
      newRecipe = updateRecipe(recipe, currentWord, Tag.Ingredient);
    } else if (e.code === 'Digit3') {
      newRecipe = updateRecipe(recipe, currentWord, Tag.None);
    }
    console.log(extractAnnotation(newRecipe, 'anonymous'));
    this.setState({ currentWord: newPosition, recipe: newRecipe });
  }

  render() {
    const {recipe, currentWord} = this.state;
    return (
      <div>
        <ControlComponent
          handleReset={this.handleReset}
          handleSubmit={this.handleSubmit}
        />
        <RecipeComponent currentWord={currentWord} recipe={recipe!} />
      </div>
    );
  }
}

export default App;
