import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import { connect } from 'react-redux'
import { getCategories } from './actions'
import { NavLink } from 'react-router-dom'
import { messages } from './messages'
import { config } from './config'
import qs from 'query-string'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

const {
  app: appUrl,
  itemsStore
} = config.url

class LeftPanel extends Component {
  constructor () {
    super()

    this.state = {
      collapsed: false
    }
  }

  componentDidMount () {
    this.props.getCategories()
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
      categories = []
    } = this.props

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <SubMenu title={messages.leftPanel.category}>
            {categories.map(this.renderCategory)}
          </SubMenu>
          <MenuItem>
            <NavLink to={{
              pathname: appUrl,
              search: qs.stringify({
                name: 'lost'
              })
            }}>
              {messages.leftPanel.lost}
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={{
              pathname: itemsStore
            }}>
              {messages.leftPanel.store}
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to={{
              pathname: appUrl
            }}>
              {messages.leftPanel.records}
            </NavLink>
          </MenuItem>
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.app.categories
})

LeftPanel.propTypes = {
  getCategories: PropTypes.func,
  categories: PropTypes.array
}

export default connect(mapStateToProps, { getCategories })(LeftPanel)
