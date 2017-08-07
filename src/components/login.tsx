import * as React from 'react';
import { User } from '../types';
import FacebookLogin from 'react-facebook-login';

import { FB_APP_ID } from '../constants';

type Props = {
  user: User,
  handleLogin: (token: string, name: string) => void;
  handleLogout: () => void;
};

class Login extends React.Component<Props, {}> {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(resp: any) {
    this.props.handleLogin(resp.accessToken, resp.name);
  }

  render() {
    const {user} = this.props;
    if (!user.loggedIn) {
      return (
        <FacebookLogin
          appId={FB_APP_ID}
          callback={this.handleLogin}
        />
      );
    }
    return (
      <div>
        <h4>Hello {user.name}</h4>
        <button onClick={this.props.handleLogout}>logout</button>
        <p>Total recipe tagged: {user.count.recipe}</p>
      </div>
    );
  }
}

export default Login;
