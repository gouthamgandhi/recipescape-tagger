import * as React from 'react';
import { User } from '../types';
import GoogleLogin from 'react-google-login';

import { GOOGLE_APP_ID } from '../constants';

type Props = {
  user: User,
  handleLogin: (token: string, name: string) => void;
  handleLogout: () => void;
};

class Login extends React.Component<Props, {}> {
  constructor() {
    super();
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
  }

  handleGoogleLogin(resp: any) {
    this.props.handleLogin(resp.accessToken, resp.profileObj.name);
  }

  handleGoogleFailure(resp: any) {
    console.log(resp);
  }

  render() {
    const {user} = this.props;
    if (!user.loggedIn) {
      return (
        <GoogleLogin
          clientId={GOOGLE_APP_ID}
          buttonText="Login With Google"
          onSuccess={this.handleGoogleLogin}
          onFailure={this.handleGoogleFailure}
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
