import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import PhotoContainer from './PhotoContainer'


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

    photoURLChecker = (photoURL) => {
        if (typeof (photoURL) === "string") {
            return photoURL
        } else if (photoURL && Array.isArray(photoURL)) {
            return photoURL[0]
        }

    }

    render() {
        const { error, photoLoaded, photos } = this.props
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!photoLoaded) {
            return <div>Loading...</div>
        } else if (photoLoaded && photos) {
            return (
                <div className='album'>
                    {
                        photos.map(photo => (
                            <PhotoContainer photoURL={this.photoURLChecker(photo.image_url)} alt={photo.description} key={photo.id} />
                        ))
                    }


                </div>
            )
        }
    }
}

export default Album