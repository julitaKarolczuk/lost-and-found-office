import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import {
  getUsers,
  showAddUserModal,
  removeUser
} from './AdminPanelActions'

class AdminPanelUser extends Component {
  constructor (props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  componentDidMount () {
    this.props.getUsers()
  }

  addItem () {
    this.props.showAddUserModal()
  }

  editItem (record) {
    return () => {
      this.props.showAddUserModal(record)
    }
  }

  removeItem (id) {
    return () => {
      this.props.removeUser(id)
    }
  }

  get columns () {
    return (
      [{
        title: 'Imie',
        dataIndex: 'firstName',
        key: 'firstName'
      }, {
        title: 'Nazwisko',
        dataIndex: 'lastName',
        key: 'lastName'
      }, {
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
      users = []
    } = this.props

    return (
      <div>
        <Button
          className='add-button'
          onClick={this.addItem}
        >
          <Icon type='plus' /> ADD ITEM
        </Button>
        <Table dataSource={users} columns={this.columns} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.app.users
})

AdminPanelUser.propTypes = {
  getUsers: PropTypes.func,
  users: PropTypes.array,
  showAddUserModal: PropTypes.func,
  removeUser: PropTypes.func
}

export default connect(mapStateToProps, {
  getUsers,
  showAddUserModal,
  removeUser
})(AdminPanelUser)
