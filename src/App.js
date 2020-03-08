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
    nsfw: false,
    showNav: false
  }

  componentDidMount() {
    window.addEventListener('scroll', this.infiniteScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.infiniteScroll)
  }

  //App methods
  infiniteScroll = () => {
    if (this.state.photosLoading) {
      return
    } else if (window.innerHeight + window.pageYOffset + 1 >= document.documentElement.scrollHeight) {
      console.log("window.innerHeight + window.pageYOffset + 1 ", window.innerHeight + window.pageYOffset + 1)
      console.log("document.documentElement.scrollHeight ", document.documentElement.scrollHeight)
      this.setState({ photosLoading: true }, this.getPhotos)
    }
  }

  //Get and organize photo methods
  getPhotos = () => {
    if (this.state.photosLoading) {
      this.setState({ photosLoading: false }, this.getPhotosRequest)
    }
  }

  getPhotosRequest = () => {
    axios.get(`https://api.500px.com/v1/photos?feature=${this.state.selectedFeed}&consumer_key=${process.env.REACT_APP_API_KEY_500PX}${this.nsfwParam()}&page=${this.state.pagesLoaded + 1}`)
      .then(
        (result) => {
          console.log("getPhotosRequest ", result.data.current_page)
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

  nsfwParam = () => {
    return this.state.nsfw ? '' : '&exclude=nude'
  }

  loadPhotos = (photos) => {
    if (this.state.loadMorePhotos) {
      console.log("if loadMorePhotos", photos.current_page)
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
      console.log("if photos refresh ", photos.current_page)
      this.setState({
        photosLoading: false,
        photosLoaded: true,
        pagesLoaded: photos.current_page,
        photos: photos.photos,
        loadMorePhotos: true
      })
    }
  }

  photoURLChecker = (photoURL) => {
    if (typeof (photoURL) === 'string') {
      return photoURL
    } else if (photoURL && Array.isArray(photoURL)) {
      return photoURL[0]
    }
  }

  //Navigation methods
  toggleNav = () => {
    this.setState({ showNav: !this.state.showNav })
  }

  selectFeed = (event) => {
    event.persist()
    console.log("event ", event)
    this.setState({
      selectedFeed: event.target.value,
      pagesLoaded: 0,
      photosLoading: true,
      loadMorePhotos: false
    }, this.getPhotos)
    window.scrollTo(0, 0)
  }

  filterNsfw = (event) => {
    this.setState({
      nsfw: event.target.checked,
      pagesLoaded: 0,
      photosLoading: true,
      loadMorePhotos: false
    }, this.getPhotos)
    window.scrollTo(0, 0)
  }

  //Modal methods
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

  findPhotoByID = (index, eventId) => {
    const photos = this.state.photos
    if (photos[index].id == eventId) {
      return photos[index]
    }
  }

  render() {
    const { error, selectedFeed, nsfw, showNav, photos, photosLoaded, photosLoading, showModal, modalTarget } = this.state
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
          nsfw={nsfw}
          filterNsfw={this.filterNsfw}
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
        />
      </div>
    )
  }
}

export default App
