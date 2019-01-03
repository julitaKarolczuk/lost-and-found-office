import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { messages } from './messages'
import { config } from './config'
import qs from 'query-string'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

const {
  app: appUrl,
  records,
  items,
  adminPanel
} = config.url

class LeftPanel extends Component {
  constructor () {
    super()

    this.state = {
      collapsed: false
    }
  }

  renderCategory ({id, name}) {
    return (
      <MenuItem key={id}>
        <NavLink to={{
          pathname: appUrl,
          search: qs.stringify({
            id
          })
        }}>
          {name}
        </NavLink>
      </MenuItem>
    )
  }

  render () {
    const {
      categories = [],
      isSignedIn
    } = this.props

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        {isSignedIn && (
          <Fragment>
            <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
              <MenuItem className='home'>
                <NavLink to={{
                  pathname: appUrl
                }}>
                  <Icon
                    theme='twoTone'
                    type='home'
                    twoToneColor='#0a1a38'
                  />
                  LF-Office
                </NavLink>
              </MenuItem>
              <SubMenu title={messages.leftPanel.store}>
                {categories.map(this.renderCategory)}
              </SubMenu>
              <MenuItem>
                <NavLink to={{
                  pathname: items
                }}>
                  {messages.leftPanel.lost}
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to={{
                  pathname: records
                }}>
                  {messages.leftPanel.records}
                </NavLink>
              </MenuItem>
            </Menu>
            <div>
              {true && (
                <NavLink
                  className='admin-button'
                  to={{
                    pathname: adminPanel
                  }}>
                  {messages.leftPanel.adminPanel}
                </NavLink>
              )}
            </div>
          </Fragment>
        )}
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.app.categories,
  isSignedIn: state.app.signIn
})

LeftPanel.propTypes = {
  categories: PropTypes.array,
  isSignedIn: PropTypes.bool
}

export default connect(mapStateToProps, {})(LeftPanel)
