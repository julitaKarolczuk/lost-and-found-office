import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { messages } from './messages'
import { Icon, Button } from 'antd'
import {
  getUser,
  showEditUserModal,
  showChangePasswordModal
 } from './actions'

class Profile extends Component {
  constructor () {
    super()

    this.openEditUserModal = this.openEditUserModal.bind(this)
    this.openChangePasswordModal = this.openChangePasswordModal.bind(this)
  }

  componentDidMount () {
    this.props.getUser()
  }

  openEditUserModal () {
    this.props.showEditUserModal()
  }

  openChangePasswordModal () {
    this.props.showChangePasswordModal()
  }

  render () {
    const {
      user: {
        userName,
        firstName,
        lastName
      } = {}
    } = this.props
    return (
      <div className='profile'>
        <h3>{messages.profile.title}</h3>
        <div className='user-details'>
          <Icon
            type='user'
            className='user-icon'
          />
          <h2>{userName}</h2>
          <h4>{`${firstName} ${lastName}`}</h4>
        </div>
        <div className='buttons'>
          <Button onClick={this.openEditUserModal}>
            {messages.profile.buttonEditData}
          </Button>
          <Button onClick={this.openChangePasswordModal}>
            {messages.profile.buttonEditPassword}
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.app.user
})

Profile.propTypes = {
  getUser: PropTypes.func,
  user: PropTypes.object,
  showEditUserModal: PropTypes.func,
  showChangePasswordModal: PropTypes.func
}

export default connect(mapStateToProps, {
  getUser,
  showEditUserModal,
  showChangePasswordModal
})(Profile)
