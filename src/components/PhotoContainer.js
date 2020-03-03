import React, { Component } from 'react'

import Photo from './Photo'

class PhotoContainer extends Component {
    render() {
        return (
            <div className='photo-container'>
                <h1>I'm the PhotoContainer</h1>
                <Photo />

            </div>
        )
    }
}

export default PhotoContainer