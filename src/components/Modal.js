import React, { Component } from 'react'

import PhotoContainer from './PhotoContainer'

class Modal extends Component {

    stopPropagationAndCloseModal = event => {
        event.stopPropagation()
        this.props.closeModal()
    }


    render() {
        const { photo, displayModal } = this.props
        const { alt, id, name, photoURL, user } = photo
        return (
            <div className={`modal ${displayModal ? 'show' : ''}`} onClick={this.stopPropagationAndCloseModal} >
                <div className='modal-content' onClick={event => event.stopPropagation()}>
                    <div className='close' onClick={this.stopPropagationAndCloseModal}>&times;</div>
                    <PhotoContainer photoURL={photoURL} alt={alt} key={id} />
                    <div className="photo-info">
                        <h1>{name}</h1>
                        <h2>{user}</h2>
                        <h3>{alt}</h3>
                    </div>

                </div>
            </div>
        )
    }
}



export default Modal