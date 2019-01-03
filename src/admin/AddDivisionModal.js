import {
  Form,
  Input,
  Button
} from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicModal from './../BasicModal'
import { connect } from 'react-redux'
import {
  addDivision,
  editDivision
} from './AdminPanelActions'
import { hideModal } from './../Actions'
import { messages } from './../messages'

const { Item: FormItem } = Form

class AddDivisionModal extends Component {
  constructor (props) {
    super(props)

    this.onCancelAction = this.onCancelAction.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  onCancelAction () {
    this.props.hideModal()
  }

  handleSubmit (e) {
    e.preventDefault()
    const {
      form,
      addDivision,
      editDivision,
      item,
      hideModal
    } = this.props

    const isEditModal = JSON.stringify(item) !== '{}'
    form.validateFields((err, values) => {
      if (!err) {
        isEditModal ? editDivision(item.id, values) : addDivision(values)
      }
    })
    hideModal()
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      item
    } = this.props

    const isEditModal = JSON.stringify(item) !== '{}'

    return (
      <BasicModal
        visible={this.props.visible}
        cancelAction={this.onCancelAction}
        footer={null}
      >
        <Form
          className='add-announcement'
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label={messages.admin.name}
          >
            {getFieldDecorator('name', {
              rules: [{
                required: true,
                message: messages.admin.fillField
              }],
              initialValue: isEditModal ? item.name : ''
            })(
              <Input
                type='text'
              />
            )}
          </FormItem>
          <FormItem
            label={messages.admin.address}
          >
            {getFieldDecorator('address', {
              rules: [{
                required: true,
                message: messages.admin.fillField
              }],
              initialValue: isEditModal ? item.address : ''
            })(
              <Input
                type='text'
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              style={{width: '100%'}}
            >
              {messages.addItemModal.buttonSubmit}
            </Button>
          </FormItem>
        </Form>
      </BasicModal>
    )
  }
}

AddDivisionModal.propTypes = {
  hideModal: PropTypes.func,
  visible: PropTypes.bool,
  getFieldDecorator: PropTypes.func,
  form: PropTypes.object,
  item: PropTypes.object,
  addDivision: PropTypes.func,
  editDivision: PropTypes.func
}

export default Form.create()(connect(null, {
  hideModal,
  addDivision,
  editDivision
})(AddDivisionModal))
