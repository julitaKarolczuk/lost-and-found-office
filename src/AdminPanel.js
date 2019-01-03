import React from 'react'
import { Card } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { config } from './config'
// editAction: this.props.editCategory,
// addAction: this.props.addCategory,
// removeAction: this.props.removeCategory
// editAction: this.props.editAnnouncement,
// addAction: this.props.addAnnouncement,
// removeAction: this.props.removeAnnouncement
// editAction: this.props.editDivision,
// addAction: this.props.addDivision,
// removeAction: this.props.removeDivision
// editAction: this.props.editItem,
// addAction: this.props.addItem,
// removeAction: this.props.removeItem
// editAction: this.props.editUser,
// addAction: this.props.addUser,
// removeAction: this.props.removeUser

class AdminPanel extends React.Component {
  get items () {
    return (
      [
        'Categories',
        'Announcements',
        'Divisions',
        'Items',
        'Users'
      ]
    )
  }

  renderItem (item) {
    return (
      <Card
        key={item}
        title={item}
        extra={<NavLink to={config.url[`adminPanel${item}`]}>More</NavLink>}
        bodyStyle={{display: 'none'}}
      />
    )
  }

  render () {
    return (
      <div className='admin-panel'>
        {this.items.map(this.renderItem)}
      </div>
    )
  }
}

export default AdminPanel
