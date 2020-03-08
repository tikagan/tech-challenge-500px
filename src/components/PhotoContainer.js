import React from 'react'
import PropTypes from 'prop-types'

const PhotoContainer = ({ style, photoURL, alt, id, setModal, aspectRatio }) => {
  return (
    <div className='photo-container' style={style}>
      <img
        className='photo'
        src={photoURL}
        alt={alt}
        id={id}
        onClick={setModal}
        aspectRatio={aspectRatio}
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
