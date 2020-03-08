import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ModalPhotoContainer from './ModalPhotoContainer'

const Modal = ({ photo, showModal, closeModal }) => {
  const stopPropagationAndCloseModal = (event) => {
    event.stopPropagation()
    closeModal()
  }
  return (
    <div className={`modal ${showModal ? 'show' : ''}`} onClick={stopPropagationAndCloseModal} >
      <div className='close' onClick={stopPropagationAndCloseModal}>&times;</div>
      <div className='modal-content' onClick={stopPropagationAndCloseModal}>
        <ModalPhotoContainer photoURL={photo.photoURL} alt={photo.alt} id={photo.id} stopPropagationAndCloseModal={stopPropagationAndCloseModal} />
        <div className='photo-info'>
          <h1>{photo.name}</h1>
          <h2>{photo.user}</h2>
          <h3>{photo.alt}</h3>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  photo: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal
