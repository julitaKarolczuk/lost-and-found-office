import { Input, Icon } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicModal from './BasicModal'
import { connect } from 'react-redux'
import { hideModal } from './Actions'
import { messages } from './messages'

class ForgotPasswordModal extends Component {
  constructor (props) {
    super(props)

    this.hangleChange = this.hangleChange.bind(this)
    this.onCancelAction = this.onCancelAction.bind(this)
  }

  onCancelAction () {
    this.props.hideModal()
  }

  hangleChange (e) {
    console.log(e.target)
  }

  render () {
    return (
      <BasicModal
        visible={this.props.visible}
        cancelAction={this.onCancelAction}
      >
        <div className='forgot-pass'>
          <h1>{messages.modal.forgotPasswordModal.dontRemember}</h1>
          <h4>
            {messages.modal.forgotPasswordModal.text}
          </h4>
          <Input
            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
            ref={this.userEmail}
            onChange={this.handleChange}
            placeholder={messages.modal.forgotPasswordModal.placeholderEmail}
          />
        </div>
      </BasicModal>
    )
  }
}

ForgotPasswordModal.propTypes = {
  hideModal: PropTypes.func,
  visible: PropTypes.bool
}

export default connect(null, { hideModal })(ForgotPasswordModal)
