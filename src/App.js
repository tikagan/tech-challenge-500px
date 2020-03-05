import React, { Component } from 'react';
import axios from 'axios'

import './App.scss';

import Album from './components/Album'


class App extends Component {
  state = {
    error: false,
    photoLoading: true,
    photoLoaded: false,
    pagesLoaded: 0,
    photos: [],
  }

  nextPage = () => {
    return this.state.pagesLoaded + 1
  }

  getPhotos = () => {
    axios.get(`https://api.500px.com/v1/photos?feature=popular&consumer_key=${process.env.REACT_APP_API_KEY_500PX}&page=${this.nextPage()}`)
      .then(
        result => {
          this.setState({
            photoLoading: false,
            photoLoaded: true,
            pagesLoaded: result.data.current_page,
            photos: [...this.state.photos, ...result.data.photos]
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
    const { error, photos, photoLoaded, photoLoading } = this.state
    return (
      <div className="App">
        <Album getPhotos={this.getPhotos} photos={photos} photoLoaded={photoLoaded} photoLoading={photoLoading} />
      </div>
    )
  }

}

export default App;
