import React, { Component } from 'react'
import axios from 'axios'

import './App.scss'

import Navigation from './components/Navigation'
import Album from './components/Album'

class App extends Component {
  state = {
    error: false,
    photosLoading: true,
    photosLoaded: false,
    pagesLoaded: 0,
    photos: [],
    showModal: false,
    modalTarget: {},
    selectedFeed: 'popular',
    loadMorePhotos: true,
    NSFW: false,
    showNav: false
  }

  toggleNav = () => {
    this.setState({ showNav: !this.state.showNav })
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

  loadPhotos = (photos) => {
    if (this.state.loadMorePhotos) {
      this.setState({
        photosLoading: false,
        photosLoaded: true,
        pagesLoaded: photos.current_page,
        photos: [...this.state.photos, ...photos.photos],
        loadMorePhotos: true,
        modalTarget: {
          id: photos.photos[0].id,
          photoURL: this.photoURLChecker(photos.photos[0].image_url),
          alt: photos.photos[0].description,
          user: photos.photos[0].user.fullname,
          name: photos.photos[0].name
        }
      })
    } else {
      this.setState({
        photosLoading: false,
        photosLoaded: true,
        pagesLoaded: photos.current_page,
        photos: photos.photos,
        pagesLoaded: 0,
        loadMorePhotos: true
      })
    }
  }

  selectFeed = (event) => {
    this.setState({
      selectedFeed: event.target.value,
      pagesLoaded: 0,
      photosLoading: true,
      loadMorePhotos: false
    }, this.getPhotos)
    window.scrollTo(0, 0)
  }

  NSFWParam = () => {
    if (!this.state.NSFW) {
      return "&exclude=nude"
    } else {
      return ""
    }
  }

  filterNSFW = (event) => {
    this.setState({
      NSFW: event.target.checked,
      loadMorePhotos: false,
      photosLoading: true,
      pagesLoaded: 0
    }, this.getPhotos)
    window.scrollTo(0, 0)
  }

  getPhotosRequest = () => {
    axios.get(`https://api.500px.com/v1/photos?feature=${this.state.selectedFeed}&consumer_key=${process.env.REACT_APP_API_KEY_500PX}${this.NSFWParam()}&page=${this.state.pagesLoaded + 1}`)
      .then(
        (result) => {
          this.loadPhotos(result.data)
        },
        (error) => {
          this.setState({
            photosLoaded: true,
            photosLoading: false,
            error
          })
        }
      )
  }

  getPhotos = () => {
    if (this.state.photosLoading) {
      this.setState({ photosLoading: false }, this.getPhotosRequest)
    }
  }

  isPageScrolling = () => {
    window.addEventListener('scroll', this.infiniteScroll)
  }

  infiniteScroll = () => {
    if (this.state.photosLoading) {
      return
    } else if (window.innerHeight + window.pageYOffset + 1 >= document.documentElement.scrollHeight) {
      this.setState({ photosLoading: true }, this.getPhotos)
    }
  }

  photoURLChecker = (photoURL) => {
    if (typeof (photoURL) === 'string') {
      return photoURL
    } else if (photoURL && Array.isArray(photoURL)) {
      return photoURL[0]
    }
  }

  render() {
    const { error, selectedFeed, NSFW, showNav, photos, photosLoaded, photosLoading, showModal, modalTarget } = this.state
    if (error) {
      return (
        <div>
          Error
        </div>
      )
    }
    return (
      <div className='App'>
        <Navigation
          selectFeed={this.selectFeed}
          selectedFeed={selectedFeed}
          NSFW={NSFW}
          filterNSFW={this.filterNSFW}
          showNav={showNav}
          toggleNav={this.toggleNav}
        />
        <Album
          getPhotos={this.getPhotos}
          photos={photos}
          photosLoaded={photosLoaded}
          photosLoading={photosLoading}
          setModal={this.setModal}
          closeModal={this.closeModal}
          showModal={showModal}
          modalTarget={modalTarget}
          photoURLChecker={this.photoURLChecker}
          isPageScrolling={this.isPageScrolling}
        />
      </div>
    )
  }
}

export default App
