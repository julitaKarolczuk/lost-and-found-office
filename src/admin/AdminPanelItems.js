import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import {
  getItems,
  showAddAnnouncementModal,
  removeItem
} from '../Actions'

class AdminPanelCategories extends Component {
  constructor (props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  componentDidMount () {
    this.props.getItems()
  }

  addItem () {
    this.props.showAddAnnouncementModal({ isItemsPage: true })
  }

  editItem (record) {
    return () => {
      this.props.showAddAnnouncementModal({ item: record, isItemsPage: true })
    }
  }

  removeItem (id) {
    return () => {
      this.props.removeItem(id)
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
      items = []
    } = this.props

    return (
      <div>
        <Button
          className='add-button'
          onClick={this.addItem}
        >
          <Icon type='plus' /> ADD ITEM
        </Button>
        <Table dataSource={items} columns={this.columns} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.app.items
})

AdminPanelCategories.propTypes = {
  getItems: PropTypes.func,
  items: PropTypes.array,
  showAddAnnouncementModal: PropTypes.func,
  removeItem: PropTypes.func
}

export default connect(mapStateToProps, {
  getItems,
  showAddAnnouncementModal,
  removeItem
})(AdminPanelCategories)
