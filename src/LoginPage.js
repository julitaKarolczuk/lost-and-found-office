import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { showForgotPasswordModal } from './actions'
import { messages } from './messages'
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox
} from 'antd'

const { Item: FormItem } = Form

class LoginPage extends Component {
  constructor () {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.openModal = this.openModal.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  openModal () {
    this.props.showForgotPasswordModal()
  }

  render () {
    const {
      getFieldDecorator
    } = this.props.form

    return (
      <div className='login-form-page'>
        <Form
          onSubmit={this.handleSubmit}
          className='login-form'
        >
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                required: true,
                message: messages.loginPage.rules.email
              }]
            })(
              <Input
                prefix={
                  <Icon
                    type='user'
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                placeholder={messages.loginPage.placeholder.email}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: messages.loginPage.rules.password
              }]
            })(
              <Input
                prefix={
                  <Icon
                    type='lock'
                    style={{ color: 'rgba(0,0,0,.25)' }}
                  />
                }
                type='password'
                placeholder={messages.loginPage.placeholder.password}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox style={{width: '100%'}}>{messages.loginPage.remember}</Checkbox>
            )}
            <Button
              className='login-form-forgot'
              style={{width: '100%'}}
              onClick={this.openModal}
            >
              {messages.loginPage.forgotPassword}
            </Button>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              style={{width: '100%'}}
            >
              {messages.loginPage.buttonSignIn}
            </Button>
            <span style={{padding: '0 5px 0 0'}}>{messages.loginPage.or}</span>
            <Link
              style={{width: '100%'}}
              to='/registration'
            >
              {messages.loginPage.buttonSignUp}
            </Link>
          </FormItem>
        </Form>
        <Link
          to='/app'
        >
          Fake login xD
        </Link>
      </div>
    )
  }
}

LoginPage.propTypes = {
  getFieldDecorator: PropTypes.func,
  form: PropTypes.object,
  showForgotPasswordModal: PropTypes.func
}

export default Form.create()(connect(null, { showForgotPasswordModal })(LoginPage))
