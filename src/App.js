import React, { Component } from 'react';
import axios from 'axios'

import './App.scss';

import Album from './components/Album'


class App extends Component {
  state = {
    photoLoaded: false,
    photos: {}
  }

  initialGetPhotos = () => {
    axios.get(`https://api.500px.com/v1/photos?feature=popular&consumer_key=${process.env.REACT_APP_API_KEY_500PX}`)
      .then(
        result => {
          this.setState({
            photoLoaded: true,
            photos: result.data.photos
          })
        },
        (error) => {
          this.setState({
            photoLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, photos, photoLoaded } = this.state
    return (
      <div className="App">
        <Album initialGetPhotos={this.initialGetPhotos} photos={photos} photoLoaded={photoLoaded} />
      </div>
    )
  }

}

export default App;
