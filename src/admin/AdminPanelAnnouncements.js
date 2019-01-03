import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import {
  getAnnouncements,
  showAddAnnouncementModal,
  removeAnnouncement
} from '../Actions'

class AdminPanelAnnouncements extends Component {
  constructor (props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  componentDidMount () {
    this.props.getAnnouncements()
  }

  addItem () {
    this.props.showAddAnnouncementModal()
  }

  editItem (record) {
    return () => {
      this.props.showAddAnnouncementModal(record)
    }
  }

  removeItem (id) {
    return () => {
      this.props.removeAnnouncement(id)
    }
  }

  get columns () {
    return (
      [{
        title: 'Nazwa',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Wydział',
        dataIndex: 'division',
        key: 'division'
      },
      {
        title: 'Kategoria',
        dataIndex: 'category',
        key: 'category'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: 'Opis',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: 'Data stworzenia',
        dataIndex: 'created',
        key: 'created'
      },
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record = {}) => (
          <span>
            <Button onClick={this.editItem(record)}>
              <Icon type='edit' />
            </Button>
            <Button onClick={this.removeItem(record.id)}>
              <Icon type='close' />
            </Button>
          </span>
        )
      }]
    )
  }

  render () {
    const {
      announcements = []
    } = this.props

    return (
      <div>
        <Button
          className='add-button'
          onClick={this.addItem}
        >
          <Icon type='plus' /> ADD ITEM
        </Button>
        <Table dataSource={announcements} columns={this.columns} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  announcements: state.app.announcements
})

AdminPanelAnnouncements.propTypes = {
  getAnnouncements: PropTypes.func,
  announcements: PropTypes.array,
  showAddAnnouncementModal: PropTypes.func,
  removeAnnouncement: PropTypes.func
}

export default connect(mapStateToProps, {
  getAnnouncements,
  showAddAnnouncementModal,
  removeAnnouncement
})(AdminPanelAnnouncements)
