import * as React from 'react';
import axios from 'axios';

import './basePage.scss';

type MyProps = {};

type MyState = {
  title: string,
  imageUrl: string,
  textboxContents: string
};

class BasePage extends React.PureComponent<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
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

  setTextBox = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const val = target.value;
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
        <div className="text-field-container">
          <label htmlFor="base-image-field" className="text-label">
            Enter base image URL:
            <input
              id="base-image-field"
              className="text-input"
              type="text"
              value={textboxContents}
              onChange={this.setTextBox}
            />
          </label>
        </div>
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
