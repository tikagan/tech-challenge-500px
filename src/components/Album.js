import React, { Component } from 'react'

import PhotoContainer from './PhotoContainer'


class Album extends Component {

    componentDidMount() {
        this.props.initialGetPhotos()
    }

    render() {
        const { error, photoLoaded, photos } = this.props
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!photoLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className='album'>
                    {photos.map(photo => (
                        <PhotoContainer photoUrl={photo.image_url[0]} alt={photo.description} key={photo.id} />
                    ))}


                </div>
            )
        }
    }
}

export default Album