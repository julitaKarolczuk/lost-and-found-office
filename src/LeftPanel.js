import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem'
import { connect } from 'react-redux'
import { getCategories } from './actions'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

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
        {name}
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
          <SubMenu title='Kategoria'>
            {categories.map(this.renderCategory)}
          </SubMenu>
          <MenuItem>Zgłoszone</MenuItem>
          <MenuItem>Magazyn</MenuItem>
          <MenuItem>Archiwum</MenuItem>
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
