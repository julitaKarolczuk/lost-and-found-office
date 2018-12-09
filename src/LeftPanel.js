import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import MenuItem from 'antd/lib/menu/MenuItem';

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class LeftPanel extends Component {
  constructor () {
    super()
    this.state = {
      collapsed: false
    }
  }

  render () {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
      >
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          <SubMenu title='Kategoria'>
            <SubMenu title='Odzież'>
              <MenuItem>Czapki</MenuItem>
              <MenuItem>Buty</MenuItem>
              <MenuItem>Szaliki</MenuItem>
            </SubMenu>
            <SubMenu title='Akcesoria'>
              <MenuItem>Biżuteria</MenuItem>
              <MenuItem>Okulary</MenuItem>
              <MenuItem>Zegarki</MenuItem>
            </SubMenu>
            <SubMenu title='Dokumenty'>
              <MenuItem>Dowody</MenuItem>
              <MenuItem>Prawa Jazdy</MenuItem>
              <MenuItem>Karty bankowe</MenuItem>
            </SubMenu>
            <SubMenu title='Urządzenia'>
              <MenuItem>Telefony</MenuItem>
              <MenuItem>Pendrive'y</MenuItem>
            </SubMenu>
          </SubMenu>
          <MenuItem>Zgłoszone</MenuItem>
          <MenuItem>Magazyn</MenuItem>
          <MenuItem>Archiwum</MenuItem>
        </Menu>
      </Sider>
    )
  }
}

export default LeftPanel
