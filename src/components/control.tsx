import * as React from 'react';

type Props = {
  handleSubmit: (annotator: string) => void,
  handleReset: () => void,
};

type States = {
  name: string;
};

class Control extends React.Component<Props, States> {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
    };
  }

  handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    this.setState({name: value});
  }

  handleSubmit() {
    this.props.handleSubmit(this.state.name);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Tell us your name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleSubmit}>Submit</button>
        <button type="button" onClick={this.props.handleReset}>Reset</button>
      </div>
    );
  }
}

export default Control;
