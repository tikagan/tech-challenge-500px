import React from 'react'
import PropTypes from 'prop-types'

const Navigation = ({ nsfw, filterNsfw, selectedFeed, selectFeed, showNav, toggleNav }) => {
  return (
    // class navigation has an additional conditional class set by the state to animate sliding in and out 
    <div className={`navigation ${showNav ? 'show' : ''}`} id='slide'>
      <div className='nav-left' onClick={toggleNav}>
        ☰
      </div>
      <div className='nav-right'>
        <div className='nsfw-toggle'>
          <input type='checkbox' id='nsfw-checkbox' defaultChecked={nsfw} onChange={filterNsfw} />
          <label className='nsfw-label' htmlFor='nsfw-checkbox'>nsfw</label>
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
  nsfw: PropTypes.bool.isRequired,
  filterNsfw: PropTypes.func.isRequired,
  selectedFeed: PropTypes.string.isRequired,
  selectFeed: PropTypes.func.isRequired,
  showNav: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired
}

export default Navigation
