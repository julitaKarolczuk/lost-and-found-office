import { Modal, Button } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { messages } from './messages'

const BasicModal = ({
  title = '',
  visible = true,
  acceptAction = () => {},
  cancelAction = () => {},
  children = null,
  footer = [
    <Button
      key='back'
      onClick={cancelAction}
    >
      {messages.modal.cancelButton}
    </Button>,
    <Button
      key='submit'
      type='primary'
      onClick={acceptAction}
    >
      {messages.modal.acceptButton}
    </Button>
  ]
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={acceptAction}
      onCancel={cancelAction}
      footer={footer}
    >
      {children}
    </Modal>
  )
}

BasicModal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  visible: PropTypes.bool,
  cancelAction: PropTypes.func,
  acceptAction: PropTypes.func,
  footer: PropTypes.object
}

export default BasicModal
