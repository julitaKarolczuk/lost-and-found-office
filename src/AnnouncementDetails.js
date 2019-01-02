import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import {
  showAddAnnouncementModal,
  getAnnouncementDetails,
  removeAnnouncement,
  openNotificationWithIcon
} from './actions'
import { connect } from 'react-redux'
import { messages } from './messages'
import { withRouter } from 'react-router'

class AnnouncementDetails extends Component {
  constructor (props) {
    super(props)

    this.openModal = this.openModal.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount () {
    const id = window.location.href.split('/').pop()
    this.props.getAnnouncementDetails(id)
    console.log(this.props.history)
  }

  openModal () {
    const {
      item,
      showAddAnnouncementModal
    } = this.props

    showAddAnnouncementModal(item)
  }

  removeItem () {
    const {
      item: {
        id
      },
      removeAnnouncement
    } = this.props

    removeAnnouncement(id)
    this.props.history.goBack()
  }

  render () {
    const {
      item: {
        description = '',
        name = ''
      } = {}
    } = this.props

    return (
      <div className='details-page'>
        <h1>SZCZEGÓŁY ZAGUBIONEJ RZECZY</h1>
        <div className='details-buttons-section'>
          <Button onClick={this.openModal}>
            {messages.detailsPage.edit}
          </Button>
          <Button onClick={this.removeItem}>
            {messages.detailsPage.remove}
          </Button>
          <Button>
            {messages.detailsPage.createPdf}
          </Button>
          <Button>
            {messages.detailsPage.response}
          </Button>
        </div>
        <div className='description-section'>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    )
  }
}

AnnouncementDetails.propTypes = {
  showAddAnnouncementModal: PropTypes.func,
  item: PropTypes.object,
  getAnnouncementDetails: PropTypes.func,
  removeAnnouncement: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = state => ({
  item: state.app.currentAnnouncement
})

export default withRouter(connect(mapStateToProps, {
  showAddAnnouncementModal,
  getAnnouncementDetails,
  removeAnnouncement
})(AnnouncementDetails))
