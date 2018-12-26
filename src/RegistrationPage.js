import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Checkbox,
  Button
} from 'antd'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { signUp } from './actions'
import { config } from './config'

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
        console.log('Received values of form: ', values)
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
      callback('Hasła nie są takie same!')
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
    const { getFieldDecorator } = this.props.form

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

    return (
      <div className='registration-form-page'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label='Imię'
          >
            {getFieldDecorator('firstName', {
              rules: [{ required: true, message: 'Wprowadź swoje imię!', whitespace: true }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Nazwisko'
          >
            {getFieldDecorator('lastName', {
              rules: [{ required: true, message: 'Wprowadź swoje nazwisko!', whitespace: true }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Login'
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Wprowadź swój login!', whitespace: false }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Telefon'
          >
            {getFieldDecorator('phoneNumber', {
              rules: [{ required: true, message: 'Wprowadź swój numer telefonu!', whitespace: false }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='E-mail'
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'Email jest niepoprawny!'
              }, {
                required: true, message: 'Wprowadź swój email!'
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Hasło'
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Wprowadź hasło!'
              }, {
                validator: this.validateToNextPassword
              }]
            })(
              <Input type='password' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='Powtórz hasło'
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Podaj hasło jeszcze raz!'
              }, {
                validator: this.compareToFirstPassword
              }]
            })(
              <Input type='password' onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked'
            })(
              <Checkbox>Zapoznałem/łam sie z <a href=''>regulaminem</a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'>Zarejestruj</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

RegistrationForm.propTypes = {
  form: PropTypes.object,
  history: PropTypes.object,
  sighUp: PropTypes.func
}

export default withRouter(Form.create()(connect(null, { signUp })(RegistrationForm)))
