import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicModal from '../BasicModal'
import { connect } from 'react-redux'
import {
  hideModal,
  updateUserData
} from '../Actions'
import RegistrationPage from '../RegistrationPage'

class AddUserModal extends Component {
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
    this.props.hideModal()
  }

  render () {
    return (
      <BasicModal
        visible={this.props.visible}
        acceptAction={this.onAcceptAction}
        cancelAction={this.onCancelAction}
        footer={null}
      >
        <RegistrationPage admin item={this.props.item} />
      </BasicModal>
    )
  }
}

AddUserModal.propTypes = {
  hideModal: PropTypes.func,
  visible: PropTypes.bool,
  updateUserData: PropTypes.func,
  item: PropTypes.object
}

export default connect(null, {
  hideModal,
  updateUserData
})(AddUserModal)
