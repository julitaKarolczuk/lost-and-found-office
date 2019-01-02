import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import SingleCard from './SingleCard'
import {
  Button,
  Select
} from 'antd'
import { connect } from 'react-redux'
import {
  showAddAnnouncementModal
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
    const {
      saveAction,
      deleteAction
    } = this.props

    return (
      <SingleCard
        item={item}
        key={item.id}
        saveAction={saveAction}
        deleteAction={deleteAction}
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
  showAddAnnouncementModal: PropTypes.func,
  listItems: PropTypes.array,
  saveAction: PropTypes.func,
  deleteAction: PropTypes.func
}

export default connect(null, {
  showAddAnnouncementModal
})(CardsList)
