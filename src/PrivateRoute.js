import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { config } from './config'

const { login } = config.url.login
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    window.localStorage.getItem('token')
      ? <Component {...props} />
      : <Redirect to={{ pathname: login, state: { from: props.location } }} />
  )} />
)

PrivateRoute.propTypes = {
  location: PropTypes.string
}
