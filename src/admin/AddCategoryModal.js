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
  addCategory,
  editCategory
} from './AdminPanelActions'
import { hideModal } from './../Actions'
import { messages } from './../messages'

const { Item: FormItem } = Form

class AddCategoryModal extends Component {
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
      addCategory,
      editCategory,
      item = {},
      hideModal
    } = this.props

    const isEditModal = JSON.stringify(item) !== '{}'
    form.validateFields((err, values) => {
      if (!err) {
        isEditModal ? editCategory(item.id, values) : addCategory(values)
      }
    })
    hideModal()
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      item = {}
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

AddCategoryModal.propTypes = {
  hideModal: PropTypes.func,
  visible: PropTypes.bool,
  getFieldDecorator: PropTypes.func,
  form: PropTypes.object,
  item: PropTypes.object,
  addCategory: PropTypes.func,
  editCategory: PropTypes.func
}

export default Form.create()(connect(null, {
  hideModal,
  addCategory,
  editCategory
})(AddCategoryModal))
