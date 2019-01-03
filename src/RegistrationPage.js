import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Checkbox,
  Button
} from 'antd'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { signUp } from './Actions'
import { config } from './config'
import { messages } from './messages';

const FormItem = Form.Item

const {
  login
} = config.url

class RegistrationForm extends React.Component {
  constructor () {
    super()

    this.state = {
      confirmDirty: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this)
    this.validateToNextPassword = this.validateToNextPassword.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.signUp(values)
          .then(() => this.props.history.push(login))
        // console.log('Received values of form: ', values)
      }
    })
  }

  handleConfirmBlur (e) {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword (rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback(messages.registrationsPage.notSamePasswords)
    } else {
      callback()
    }
  }

  validateToNextPassword (rule, value, callback) {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render () {
    const {
      form: {
        getFieldDecorator
      },
      isProfilePage = false,
      isChangePasswordPage = false,
      user: {
        userName,
        firstName,
        lastName,
        email = '',
        phoneNumber = 123456789
      } = {},
      admin = false,
      item = {}
    } = this.props

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    }

    const isEditModal = JSON.stringify(item) !== '{}'

    return (
      <div className='registration-form-page'>
        <Form onSubmit={this.handleSubmit}>
          {!isChangePasswordPage && (
            <Fragment>
              <FormItem
                {...formItemLayout}
                label={messages.registrationsPage.firstName}
              >
                {getFieldDecorator('firstName', {
                  rules: [{ required: true, message: messages.registrationsPage.nameError, whitespace: true }],
                  initialValue: isProfilePage || isEditModal
                    ? isEditModal
                      ? item.firstName
                      : firstName
                    : ''
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={messages.registrationsPage.lastName}
              >
                {getFieldDecorator('lastName', {
                  rules: [{ required: true, message: messages.registrationsPage.lastNameError, whitespace: true }],
                  initialValue: isProfilePage || isEditModal
                    ? isEditModal
                      ? item.lastName
                      : lastName
                    : ''
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={messages.registrationsPage.login}
              >
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: messages.registrationsPage.loginError, whitespace: false }],
                  initialValue: isProfilePage || isEditModal
                    ? isEditModal
                      ? item.userName
                      : userName
                    : ''
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={messages.registrationsPage.phoneNumber}
              >
                {getFieldDecorator('phoneNumber', {
                  rules: [{ required: true, message: messages.registrationsPage.phoneError, whitespace: false }],
                  initialValue: isProfilePage || isEditModal
                    ? isEditModal
                      ? item.phoneNumber
                      : phoneNumber
                    : ''
                })(
                  <Input />
                )}
              </FormItem>
            </Fragment>
          )}
          {!isProfilePage && (
            <Fragment>
              <FormItem
                {...formItemLayout}
                label={messages.registrationsPage.email}
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: messages.registrationsPage.emailRule
                  }, {
                    required: true, message: messages.registrationsPage.emailError
                  }],
                  initialValue: isChangePasswordPage || isEditModal
                  ? isEditModal
                    ? item.email
                    : email
                  : ''
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={isChangePasswordPage
                  ? messages.registrationsPage.newPassword
                  : messages.registrationsPage.password
                }
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: messages.registrationsPage.passwordError
                  }, {
                    validator: this.validateToNextPassword
                  }]
                })(
                  <Input type='password' />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={messages.registrationsPage.repeatPassword}
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: messages.registrationsPage.repeatPasswordError
                  }, {
                    validator: this.compareToFirstPassword
                  }]
                })(
                  <Input type='password' onBlur={this.handleConfirmBlur} />
                )}
              </FormItem>
            </Fragment>
          )}
          <Fragment>
            {(!isProfilePage && !isChangePasswordPage && !admin) && (
              <FormItem {...tailFormItemLayout}>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked'
                })(
                  <Checkbox>{messages.registrationsPage.permission}<a href=''>{messages.registrationsPage.rules}</a></Checkbox>
                )}
              </FormItem>)}
            <FormItem {...tailFormItemLayout}>
              <Button
                type='primary'
                htmlType='submit'
              >
                {messages.registrationsPage.register}
              </Button>
            </FormItem>
          </Fragment>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.app.user
})

RegistrationForm.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object,
  signUp: PropTypes.func,
  user: PropTypes.object,
  isProfilePage: PropTypes.bool,
  isChangePasswordPage: PropTypes.bool,
  admin: PropTypes.bool
}

export default withRouter(Form.create()(connect(mapStateToProps, { signUp })(RegistrationForm)))
