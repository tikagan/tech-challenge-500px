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
    modal: false,
    modalTarget: {}
  }

  findPhotoByID = (index, eventId) => {
    const photos = this.state.photos
    if (photos[index].id == eventId) {
      console.log("photos[index] ", photos[index])
      return photos[index]
    }
  }

  closeModal = (event) => {
    this.setState({
      modal: !this.state.modal
    })
  }

  selectModal = (event) => {
    if (event) {
      console.log(event)
      const photo = this.findPhotoByID(event.target.attributes.index.value, event.target.id)
      this.setState({
        modal: !this.state.modal,
        modalTarget: {
          id: photo.id,
          photoURL: this.photoURLChecker(photo.image_url),
          alt: photo.description,
          user: photo.user.fullname,
          name: photo.name
        }
      })
    }
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

  photoURLChecker = (photoURL) => {
    if (typeof (photoURL) === "string") {
      return photoURL
    } else if (photoURL && Array.isArray(photoURL)) {
      return photoURL[0]
    }
  }

  render() {
    const { error, photos, photoLoaded, photoLoading } = this.state
    // console.log("findPhotoByID ", this.findPhotoByID(35, 1011794681))
    return (
      <div className="App">
        <Album
          getPhotos={this.getPhotos}
          photos={photos}
          photoLoaded={photoLoaded}
          photoLoading={photoLoading}
          selectModal={this.selectModal}
          closeModal={this.closeModal}
          modal={this.state.modal}
          modalTarget={this.state.modalTarget}
          photoURLChecker={this.photoURLChecker}
        />
      </div>
    )
  }

}

export default App;
