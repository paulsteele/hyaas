import React from 'react';
import axios from 'axios';

import './basePage.scss';

class BasePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      title: 'Loading',
      imageUrl: '/image',
      textboxContents: '',
    };
    this.getTitle();
  }

  setImage = () => {
    this.setState(prevState => ({
      imageUrl: `/image?url=${prevState.textboxContents}`,
    }));
  }

  getTitle = () => {
    axios.get('/plaintext')
      .then((res => (this.setState(() => ({ title: res.data })))));
  }

  setTextBox = (event) => {
    const val = event.target.value;
    this.setState(() => ({ textboxContents: val }));
  }

  render() {
    const { title, imageUrl, textboxContents } = this.state;
    return (
      <div>
        <h1 className="title">
          {title}
        </h1>
        <h2 className="subtitle">
          as a service
        </h2>
        <img
          className="image-box"
          src={imageUrl}
          alt={title}
        />
        <input
          className="text-input"
          type="text"
          value={textboxContents}
          onChange={this.setTextBox}
        />
        <button
          className="button-input"
          type="button"
          onClick={this.setImage}
        >
          Set Base Image
        </button>
      </div>
    );
  }
}

export default BasePage;
