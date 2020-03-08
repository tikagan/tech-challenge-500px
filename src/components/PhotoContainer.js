import React from 'react'
import PropTypes from 'prop-types'

const PhotoContainer = ({ photoURL, alt, id, setModal }) => {
  return (
    <div className='photo-container'>
      <img
        className='photo'
        src={photoURL}
        alt={alt}
        id={id}
        onClick={setModal}
      />
    </div>
  )
}

PhotoContainer.propTypes = {
  photoURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setModal: PropTypes.func.isRequired
}

export default PhotoContainer
