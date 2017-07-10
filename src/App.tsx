import * as React from 'react';
import './App.css';

import { Position, Recipe, Tag } from './types';
import RecipeComponent from './components/recipe'

const testRecipe: Recipe = {
  title: "Chocolate Chip Cookie",
  sentences: [
    { words: [
      { content: "Heat", tag: Tag.None },
      { content: " ", tag: Tag.None },
      { content: "oven", tag: Tag.None },
    ]},
    { words: [
      { content: "Cool", tag: Tag.None },
      { content: " ", tag: Tag.None },
      { content: "pan", tag: Tag.None },
    ]},
  ],
};

type AppState = {
  recipe: Recipe,
  currentWord: Position,
}

class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      recipe: testRecipe,
      currentWord: [0, 0],
    };
    this.handleKey = this.handleKey.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKey)
  }

  handleKey(e: KeyboardEvent): void {
    if (e.code === "ArrowLeft") {
      console.log('left')
    } else if (e.code === "ArrowUp") {
      console.log('up')
    } else if (e.code === "ArrowRight") {
      console.log('right')
    } else if (e.code === "ArrowDown") {
      console.log('down')
    }
  }

  render() {
    const {recipe, currentWord} = this.state;
    return (
      <div>
        <RecipeComponent currentWord={currentWord} recipe={recipe} />
      </div>
    )
  }
}

export default App;
