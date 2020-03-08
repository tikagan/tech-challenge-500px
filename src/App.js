import React, { Component } from 'react'
import axios from 'axios'

import './App.scss'

import Navigation from './components/Navigation'
import Album from './components/Album'

class App extends Component {
  // because this app has such a small scope I chose to centralized the state in the root component 
  // in a larger scoped app I would prefer to use Redux or some other state managment tool
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
      // there are some issues with the way this method is calculating scroll height and is leading to multiple of 
      // the same get requests creating duplicates in state.photos
      // in the future I'd prefer to create an object data structure for the photos to eliminate duplicates from both 
      // the API data itself as well as multiple duplicate calls
    } else if (window.innerHeight + window.pageYOffset + 1 >= document.documentElement.scrollHeight) {
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

  // adds API data into state based on whether it should be added to existing data (state.loadMorePhotos) 
  // or should replace existing data
  loadPhotos = (photos) => {
    if (this.state.loadMorePhotos) {
      this.setState({
        photosLoading: false,
        photosLoaded: true,
        pagesLoaded: photos.current_page,
        photos: [...this.state.photos, ...photos.photos],
        loadMorePhotos: true,
        // by initializing modalTarget with values on the inital render you can bypass prop-type errors 
        // and therefore retain the benefit of checking the props passed to Modal
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
        loadMorePhotos: true
      })
    }
  }

  // the photo URL provided in the API data is usually provided as the first element in an array
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


  // selectFeed and filterNsfw both set state parameters that are then consulted in the the API call initiated by the setState
  // callback getPhotos, including refreshing the page and resetting it to the top
  // ideally since they are so similar I would have liked to find a way to combine them and pass in the required state value 
  selectFeed = (event) => {
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

  // finds the selected photo by comparing it's id in state located by index to the id provided by the event 
  findPhotoByID = (index, eventId) => {
    const photos = this.state.photos
    if (photos[index].id == eventId) {
      return photos[index]
    }
  }

  render() {
    const { error, selectedFeed, nsfw, showNav, photos, photosLoaded, photosLoading, showModal, modalTarget } = this.state
    // ideally I would expand on the error state
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
