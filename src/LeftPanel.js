import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { messages } from './messages'
import { config } from './config'
import qs from 'query-string'
import { getAnnouncements } from './Actions'
import { withRouter } from 'react-router'

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

    this.fetchData = this.fetchData.bind(this)
    this.renderCategory = this.renderCategory.bind(this)
  }

  fetchData () {
    const query = qs.parse(this.props.history.location.search)
    this.props.getAnnouncements({ ...query })
  }

  renderCategory ({id, name}) {
    return (
      <MenuItem key={id} onClick={this.fetchData}>
        <NavLink
          to={{
            pathname: appUrl,
            search: qs.stringify({
              categoryId: id
            })
          }}
        >
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

    const isAdmin = window.localStorage.getItem('isAdmin')
    const isEmployee = window.localStorage.getItem('isEmp')

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        {isSignedIn && (isAdmin || isEmployee) && (
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
              {window.localStorage.getItem('isAdmin') && (
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
        {isSignedIn && (!isAdmin && !isEmployee) && (
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
          </Menu>
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
  isSignedIn: PropTypes.bool,
  getAnnouncements: PropTypes.func,
  history: PropTypes.object
}

export default withRouter(connect(mapStateToProps, { getAnnouncements })(LeftPanel))
