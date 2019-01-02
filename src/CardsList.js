import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import SingleAnnouncement from './SingleAnnouncement'
import { Button, Select } from 'antd'
import { connect } from 'react-redux'
import {
  getAnnouncements,
  showAddAnnouncementModal,
  getItems
} from './actions'
import { messages } from './messages'

const { Option } = Select

class CardsList extends Component {
  constructor () {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.openModal = this.openModal.bind(this)
  }

  handleChange (value) {
    console.log(value)
  }

  openModal () {
    this.props.showAddAnnouncementModal()
  }

  renderItem (item) {
    return (
      <SingleAnnouncement
        item={item}
        key={item.id}
      />
    )
  }

  render () {
    const {
      listItems = []
    } = this.props

    return (
      <Fragment>
        <div className='actions-panel'>
          <Button onClick={this.openModal}>
            {messages.announcementsPage.buttonAdd}
          </Button>
          <span>
            <Select
              defaultValue={messages.announcementsPage.sort}
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              <Option value='creation-date'>{messages.announcementsPage.date}</Option>
              <Option value='name'>{messages.announcementsPage.name}</Option>
            </Select>
          </span>
        </div>
        <div className='annoucement-list'>
          {listItems.map(this.renderItem)}
        </div>
      </Fragment>
    )
  }
}

CardsList.propTypes = {
  getAnnouncements: PropTypes.func,
  showAddAnnouncementModal: PropTypes.func,
  listItems: PropTypes.array
}

export default connect(null, {
  getAnnouncements,
  showAddAnnouncementModal,
  getItems
})(CardsList)
