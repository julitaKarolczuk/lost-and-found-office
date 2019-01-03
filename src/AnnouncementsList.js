import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getAnnouncements,
  editAnnouncement,
  removeAnnouncement
} from './Actions'
import CardsList from './CardsList'
import { withRouter } from 'react-router'
import qs from 'query-string'

class AnnouncementsList extends Component {

  componentDidMount () {
    const query = qs.parse(this.props.history.location.search)
    this.props.getAnnouncements({ ...query })
  }

  render () {
    const {
      announcements = []
    } = this.props

    return (
      <CardsList
        listItems={announcements}
        saveAction={editAnnouncement}
        deleteAction={removeAnnouncement}
      />
    )
  }
}

const mapStateToProps = state => ({
  announcements: state.app.announcements
})

AnnouncementsList.propTypes = {
  getAnnouncements: PropTypes.func,
  announcements: PropTypes.array,
  history: PropTypes.object
}

export default withRouter(connect(mapStateToProps, {
  getAnnouncements
})(AnnouncementsList))
