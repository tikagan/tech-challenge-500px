import React, { Component } from 'react'

class PhotoContainer extends Component {

    render() {
        const { photoURL, alt, name, fullname, id, index, selectModal } = this.props
        return (
            <div className="photo-container" >
                <img
                    className="photo"
                    src={photoURL}
                    alt={alt}
                    name={name}
                    user={fullname}
                    index={index}
                    id={id}
                    onClick={selectModal}
                />
            </div>
        )
    }
}

export default PhotoContainer