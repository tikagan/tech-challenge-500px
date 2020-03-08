import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PhotoContainer from './PhotoContainer'
import Modal from './Modal'

class Album extends Component {

  componentDidMount() {
    // inital get request 
    this.props.getPhotos()
  }

  photosArr = (photos) => {
    let photosArr = []
    for (const photo of photos) {
      photosArr.push(photo[1])
    }
    return photosArr
  }

  render() {
    const { error, photosLoaded, photos, showModal, closeModal, modalTarget, setModal } = this.props
    if (error) {
      return <div>Error: {error.message}</div>
    } else if (!photosLoaded) {
      return <div>Loading...</div>
    } else if (photosLoaded && photos.size > 0) {
      return (
        <div className='album'>
          <Modal
            showModal={showModal}
            closeModal={closeModal}
            photo={modalTarget} />
          {
            this.photosArr(photos).map((photo) => (
              <PhotoContainer
                key={photo.id}
                photoURL={photo.photoURL}
                alt={photo.alt}
                // index={index}
                id={photo.id}
                setModal={setModal}
              />
            ))
          }
        </div>
      )
    }

  }
}

Album.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  error: PropTypes.object,
  photosLoaded: PropTypes.bool.isRequired,
  photos: PropTypes.object.isRequired,
  photoURLChecker: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalTarget: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired
}

export default Album
