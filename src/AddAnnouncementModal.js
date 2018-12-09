import {
  Form,
  Icon,
  Upload,
  Input,
  DatePicker,
  Select,
  Button
} from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BasicModal from './BasicModal'
import { connect } from 'react-redux'
import { hideModal } from './actions'
import { messages } from './messages'
import moment from 'moment'

const { Item: FormItem } = Form
const { TextArea } = Input
const { Option } = Select

class AddAnnouncementModal extends Component {
  constructor (props) {
    super(props)

    this.onCancelAction = this.onCancelAction.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.normFile = this.normFile.bind(this)
  }

  onCancelAction () {
    this.props.hideModal()
  }

  normFile (e) {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      item
    } = this.props

    const isEditModal = JSON.stringify(item) !== '{}'

    const config = isEditModal ? {
      rules: [{ type: 'object', required: true, message: messages.addItemModal.rules.datePicker }],
      initialValue: moment(item.created)
    } : {
      rules: [{ type: 'object', required: true, message: messages.addItemModal.rules.datePicker }]
    }

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
            label={messages.addItemModal.title}
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true,
                message: messages.addItemModal.rules.title
              }],
              initialValue: isEditModal ? item.name : ''
            })(
              <Input
                type='text'
              />
            )}
          </FormItem>
          <FormItem
            label={messages.addItemModal.description}
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true,
                message: messages.addItemModal.rules.description
              }],
              initialValue: isEditModal ? item.description : ''
            })(
              <TextArea />
            )}
          </FormItem>
          <FormItem
            label={messages.addItemModal.date}
          >
            {getFieldDecorator('date-picker', config)(
              <DatePicker />
            )}
          </FormItem>
          <FormItem
            label={messages.addItemModal.place}
          >
            {getFieldDecorator('place', {
              rules: [{
                required: true,
                message: messages.addItemModal.rules.place
              }],
              initialValue: isEditModal ? item.division : ''
            })(
              <Select defaultValue='1'>
                <Option value='1'>Option 1</Option>
                <Option value='2'>Option 2</Option>
                <Option value='3'>Option 3</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label={messages.addItemModal.label}
          >
            <div className='dropbox'>
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                initialValue: isEditModal ? item.file : ''
              })(
                <Upload.Dragger name='files' action='/upload.do'>
                  <p className='ant-upload-drag-icon'>
                    <Icon type='inbox' />
                  </p>
                  <p className='ant-upload-text'>{messages.addItemModal.upload}</p>
                </Upload.Dragger>
              )}
            </div>
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

AddAnnouncementModal.propTypes = {
  hideModal: PropTypes.func,
  visible: PropTypes.bool,
  getFieldDecorator: PropTypes.func,
  form: PropTypes.object,
  item: PropTypes.object
}

export default Form.create()(connect(null, { hideModal })(AddAnnouncementModal))
