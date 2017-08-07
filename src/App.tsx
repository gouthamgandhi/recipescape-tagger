import * as React from 'react';
import './App.css';

import { Position, Recipe, Tag, KeyEvent, User } from './types';
import RecipeComponent from './components/recipe';
import Login from './components/login';
import { getNewRecipe, defaultRecipe, postRecipe, getToken, getUserProgress } from './agent';
import { updatePosition, updateRecipe } from './mutate';
import { formatRecipe, extractAnnotation, resetAnnotation } from './utils/convert';

type AppState = {
  recipe: Recipe,
  currentWord: Position,
  user: User,
};

const defaultUser: User = {
  loggedIn: false,
  token: '',
  name: '',
  count: {
    recipe: 0,
  }
};

class App extends React.Component<{}, AppState> {
  constructor() {
    super();
    this.state = {
      recipe: defaultRecipe,
      currentWord: [0, 0, 0],
      user: defaultUser,
    };
    this.handleKey = this.handleKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
    const recipeResp = await getNewRecipe();
    const recipe = formatRecipe(recipeResp.data);
    this.setState({
      recipe,
      currentWord: [0, 0, 0],
    });
  }

  async handleSubmit() {
    const confirm = window.confirm('Proceed to next recipe?');
    if (!confirm) {
      return;
    }
    const { recipe, user: { name, token } } = this.state;
    const annotation = extractAnnotation(recipe, name);
    await postRecipe(annotation, token);
    this.getNewRecipe();
    const countResp = await getUserProgress(token);
    this.setState({
      user: {
        ...this.state.user,
        count: countResp.data.count,
      }
    });
  }

  async handleLogin(fbToken: string, name: string) {
    const resp: any = await getToken(fbToken);
    const token = resp.data.key;
    const countResp = await getUserProgress(token);
    this.setState({
      user: {
        ...this.state.user,
        loggedIn: true,
        token,
        name,
        count: countResp.data.count,
      }
    });
  }

  handleLogout() {
    this.setState({ user: defaultUser });
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
    if (e.code === 'Enter') {
      this.handleSubmit();
      return;
    }

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
      newPosition = updatePosition(recipe!, currentWord, KeyEvent.Right);
    } else if (e.code === 'Digit2') {
      newRecipe = updateRecipe(recipe, currentWord, Tag.Ingredient);
      newPosition = updatePosition(recipe!, currentWord, KeyEvent.Right);
    } else if (e.code === 'Digit3') {
      newRecipe = updateRecipe(recipe, currentWord, Tag.None);
      newPosition = updatePosition(recipe!, currentWord, KeyEvent.Right);
    }
    console.log(extractAnnotation(newRecipe, 'anonymous'));
    this.setState({ currentWord: newPosition, recipe: newRecipe });
  }

  render() {
    const {recipe, currentWord, user: { loggedIn } } = this.state;
    return (
      <div>
        <Login
          user={this.state.user}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        { loggedIn ?
          <div>
            <RecipeComponent currentWord={currentWord} recipe={recipe!} />
            <button onClick={this.handleSubmit}>Submit</button>
          </div> :
          null
        }
      </div>
    );
  }
}

export default App;
