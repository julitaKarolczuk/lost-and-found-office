import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicModal from './BasicModal'
import { connect } from 'react-redux'
import {
  hideModal,
  updateUserData
} from './Actions'
import RegistrationPage from './RegistrationPage'

class ChangePasswordModal extends Component {
  constructor () {
    super()

    this.onCancelAction = this.onCancelAction.bind(this)
    this.onAcceptAction = this.onAcceptAction.bind(this)
  }

  onCancelAction () {
    this.props.hideModal()
  }

  onAcceptAction () {
    this.props.updateUserData()
  }

  render () {
    return (
      <BasicModal
        visible={this.props.visible}
        acceptAction={this.onAcceptAction}
        cancelAction={this.onCancelAction}
      >
        <RegistrationPage isChangePasswordPage />
      </BasicModal>
    )
  }
}

ChangePasswordModal.propTypes = {
  hideModal: PropTypes.func,
  visible: PropTypes.bool,
  updateUserData: PropTypes.func
}

export default connect(null, {
  hideModal,
  updateUserData
})(ChangePasswordModal)
