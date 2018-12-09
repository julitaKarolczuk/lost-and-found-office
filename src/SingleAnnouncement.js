import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  showAddAnnouncementModal,
  removeItem
} from './actions'

class SingleAnnouncement extends React.Component {
  constructor (props) {
    super(props)

    this.editAnnouncement = this.editAnnouncement.bind(this)
    this.removeAnnouncemet = this.removeAnnouncemet.bind(this)
  }

  editAnnouncement () {
    const {
      item,
      showAddAnnouncementModal
    } = this.props

    showAddAnnouncementModal(item)
  }

  removeAnnouncemet () {
    const {
      item: {
        id
      },
      removeItem
    } = this.props

    removeItem(id)
  }

  render () {
    const {
      item: {
        name,
        description,
        id
      }
    } = this.props

    return (
      <Card
        style={{ width: 300 }}
        title={name}
        actions={[
          <Link to={`/announcement-details/${id}`}>
            <Icon
              type='info'
            />
          </Link>,
          <Icon
            type='edit'
            onClick={this.editAnnouncement}
          />,
          <Icon
            type='delete'
            onClick={this.removeAnnouncemet}
          />
        ]}
      >
        <p>{description}</p>
      </Card>
    )
  }
}

SingleAnnouncement.propTypes = {
  showAddAnnouncementModal: PropTypes.func,
  item: PropTypes.object
}

export default connect(null, {
  showAddAnnouncementModal,
  removeItem
})(SingleAnnouncement)
