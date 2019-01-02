import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAnnouncements } from './actions'
import CardsList from './CardsList'

class AnnouncementsList extends Component {

  componentDidMount () {
    this.props.getAnnouncements()
  }

  render () {
    const {
      announcements = []
    } = this.props

    return (
      <CardsList listItems={announcements} />
    )
  }
}

const mapStateToProps = state => ({
  announcements: state.app.announcements
})

AnnouncementsList.propTypes = {
  getAnnouncements: PropTypes.func,
  announcements: PropTypes.array
}

export default connect(mapStateToProps, {
  getAnnouncements
})(AnnouncementsList)
