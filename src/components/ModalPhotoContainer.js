import React from 'react'
import PropTypes from 'prop-types'

// ModalPhotoContainer differs enough from PhotoContainer in terms of props required and functionality that
// creating it as it's own component with separate prop-type verification was warranted 
const ModalPhotoContainer = ({ photoURL, alt, stopPropagationAndCloseModal }) => {
  return (
    <div className='photo-container'>
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
