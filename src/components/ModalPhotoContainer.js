import React from 'react'
import PropTypes from 'prop-types'

const ModalPhotoContainer = ({ photoURL, alt, stopPropagationAndCloseModal }) => {
  return (
    <div className='photo-container' >
      <img
        className='photo'
        src={photoURL}
        alt={alt}
        onClick={stopPropagationAndCloseModal}
      />
    </div>
  )
}

ModalPhotoContainer.propTypes = {
  photoURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  stopPropagationAndCloseModal: PropTypes.func.isRequired
}

export default ModalPhotoContainer
