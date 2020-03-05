import React, { Component } from 'react'
import axios from 'axios'

import './App.scss'

import Album from './components/Album'

class App extends Component {
  state = {
    error: false,
    photoLoading: true,
    photoLoaded: false,
    pagesLoaded: 0,
    photos: [],
    showModal: false,
    modalTarget: {}
  }

  findPhotoByID = (index, eventId) => {
    const photos = this.state.photos
    if (photos[index].id == eventId) {
      return photos[index]
    }
  }

  closeModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  setModal = (event) => {
    if (event) {
      const photo = this.findPhotoByID(event.target.attributes.index.value, event.target.id)
      this.setState({
        showModal: !this.state.showModal,
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

  loadPhotos = (photos) => {
    this.setState({
      photoLoading: false,
      photoLoaded: true,
      pagesLoaded: photos.current_page,
      photos: [...this.state.photos, ...photos.photos]
    })
  }

  getPhotos = () => {
    axios.get(`https://api.500px.com/v1/photos?feature=popular
      &consumer_key=${process.env.REACT_APP_API_KEY_500PX}&page=${this.nextPage()}`)
      .then(
        (result) => {
          this.loadPhotos(result.data)
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
    if (typeof (photoURL) === 'string') {
      return photoURL
    } else if (photoURL && Array.isArray(photoURL)) {
      return photoURL[0]
    }
  }

  render() {
    const { photos, photoLoaded, photoLoading } = this.state
    return (
      <div className='App'>
        <Album
          getPhotos={this.getPhotos}
          photos={photos}
          photoLoaded={photoLoaded}
          photoLoading={photoLoading}
          setModal={this.setModal}
          closeModal={this.closeModal}
          showModal={this.state.showModal}
          modalTarget={this.state.modalTarget}
          photoURLChecker={this.photoURLChecker}
        />
      </div>
    )
  }

}

export default App
