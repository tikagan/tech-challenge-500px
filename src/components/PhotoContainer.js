import React, { Component } from 'react'

class PhotoContainer extends Component {

    render() {
        return (
            <div className="photo-container">
                <img className="photo" src={this.props.photoUrl} alt={this.props.alt} />
            </div>
        )
    }
}

export default PhotoContainer