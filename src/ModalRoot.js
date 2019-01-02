import React from 'react'
import PropTypes from 'prop-types'
import ForgotPasswordModal from './ForgotPasswordModal'
import { connect } from 'react-redux'
import * as actionTypes from './actionsTypes'
import AddAnnouncementModal from './AddAnnouncementModal'
import UpdateUserDataModal from './UpdateUserDataModal'
import ChangePasswordModal from './ChangePasswordModal'

const MODAL_COMPONENTS = {
  [actionTypes.FORGOT_PASSWORD_MODAL]: ForgotPasswordModal,
  [actionTypes.ADD_ITEM_MODAL]: AddAnnouncementModal,
  [actionTypes.EDIT_USER_DATA]: UpdateUserDataModal,
  [actionTypes.CHANGE_PASSWORD]: ChangePasswordModal
  /* other modals */
}

const ModalRoot = ({ modal: { modalType, modalProps } }) => {
  if (!modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]
  return (
    <SpecificModal
      {...modalProps}
    />
  )
}

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
  modal: PropTypes.object
}

const mapStateToProps = state => ({
  modal: state.modal
})

export default connect(
  mapStateToProps, {}
)(ModalRoot)
