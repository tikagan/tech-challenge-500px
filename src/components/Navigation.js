import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Navigation = ({ NSFW, filterNSFW, selectedFeed, selectFeed, showNav, toggleNav }) => {
  return (
    <div className={`navigation ${showNav ? 'show' : ''}`} id='slide'>
      <div className='nav-left' onClick={toggleNav}>
        ☰
      </div>
      <div className='nav-right'>
        <div className='nsfw-toggle'>
          <input type='checkbox' id='nsfw-checkbox' defaultChecked={NSFW} onChange={filterNSFW} />
          <label className='nsfw-label' htmlFor='nsfw-checkbox'>NSFW</label>
        </div>
        <select className='feeds' value={selectedFeed} onChange={selectFeed}>
          <option value='popular'>Popular</option>
          <option value='highest_rated'>Highest Rated</option>
          <option value='upcoming'>Upcoming</option>
          <option value='editors'>Editor's Choice</option>
          <option value='fresh_today'>Fresh</option>
        </select>
      </div>
    </div>
  )
}

Navigation.propTypes = {
  NSFW: PropTypes.bool.isRequired,
  filterNSFW: PropTypes.func.isRequired,
  selectedFeed: PropTypes.string.isRequired,
  selectFeed: PropTypes.func.isRequired
}

export default Navigation