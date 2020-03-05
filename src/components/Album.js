import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import PhotoContainer from './PhotoContainer'
import Modal from './Modal'

class Album extends Component {
    constructor() {
        super()

        window.onscroll = debounce(() => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight) {
                this.props.getPhotos()
            }
        }, 100)
    }

    componentDidMount() {
        this.props.getPhotos()
    }

    render() {
        const { error, photoLoaded, photos, photoURLChecker } = this.props
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!photoLoaded) {
            return <div>Loading...</div>
        } else if (photoLoaded && photos) {
            return (
                <div className='album'>
                    <Modal
                        displayModal={this.props.modal}
                        closeModal={this.props.closeModal}
                        photo={this.props.modalTarget} />
                    {
                        photos.map((photo, index) => (
                            <PhotoContainer
                                key={photo.id}
                                photoURL={photoURLChecker(photo.image_url)}
                                alt={photo.description}
                                name={photo.name}
                                user={photo.user.fullname}
                                index={index}
                                id={photo.id}
                                selectModal={this.props.selectModal}
                            />
                        ))
                    }


                </div>
            )
        }
    }
}

export default Album