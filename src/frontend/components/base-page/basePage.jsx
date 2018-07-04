import React from 'react';
import axios from 'axios';

class BasePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      message: 'Loading',
    };
    this.getText();
  }

  getText() {
    axios.get('/plaintext')
      .then((res => (this.setState(() => ({ message: res.data })))));
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>
          {message}
        </h1>
      </div>
    );
  }
}

export default BasePage;
