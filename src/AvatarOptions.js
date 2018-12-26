import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { messages } from './messages'
import { config } from './config'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { signOut } from './actions'

const {
  profile,
  login
} = config.url

const AvatarOptions = ({ history, signOut, closeOptions }) => {
  const redirectToProfilePage = () => {
    closeOptions()
    history.push(profile)
  }

  const logout = () => {
    signOut()
    closeOptions()
    history.push(login)
  }

  return (
    <div className='options'>
      <Button
        type='default'
        onClick={redirectToProfilePage}
      >
        {messages.avatarOptions.profile}
      </Button>
      <Button
        type='default'
        onClick={logout}
      >
        {messages.avatarOptions.logout}
      </Button>
    </div>
  )
}

AvatarOptions.propTypes = {
  history: PropTypes.object,
  signOut: PropTypes.func,
  closeOptions: PropTypes.func
}

export default withRouter(connect(null, { signOut })(AvatarOptions))
