import React from 'react'
import PropTypes from 'prop-types'
import { Card, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  showAddAnnouncementModal
} from './Actions'
import { config } from './config'

const {
  itemDetailsUrl
} = config.url

class SingleCard extends React.Component {
  constructor (props) {
    super(props)

    this.editAction = this.editAction.bind(this)
    this.removeAction = this.removeAction.bind(this)
  }

  editAction () {
    const {
      item,
      showAddAnnouncementModal,
      saveAction
    } = this.props

    showAddAnnouncementModal({ item, saveAction })
  }

  removeAction () {
    const {
      item: {
        id
      },
      removeAction
    } = this.props

    removeAction(id)
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
          <Link to={`${itemDetailsUrl}${id}`}>
            <Icon
              type='info'
            />
          </Link>,
          <Icon
            type='edit'
            onClick={this.editAction}
          />,
          <Icon
            type='delete'
            onClick={this.removeAction}
          />
        ]}
      >
        <p>{description}</p>
      </Card>
    )
  }
}

SingleCard.propTypes = {
  showAddAnnouncementModal: PropTypes.func,
  item: PropTypes.object,
  removeAction: PropTypes.func,
  saveAction: PropTypes.func
}

export default connect(null, {
  showAddAnnouncementModal
})(SingleCard)
