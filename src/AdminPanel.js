import React from 'react'
import { Card, Icon } from 'antd'
import { connect } from 'react-redux'
import {
  editAnnouncement
} from './Actions'

const AdminPanel = () => {
  const items = [
    {
      title: 'Categories',
      editdAction: this.props.editCategory,
      addAction: this.props.addCategory
    },
    {
      title: 'Announcements',
      editdAction: this.props.editAnnouncement,
      addAction: this.props.addCategory
    },
    {
      title: 'Categories',
      editdAction: this.props.editCategory,
      addAction: this.props.addCategory
    },
    {
      title: 'Categories',
      editdAction: this.props.editCategory,
      addAction: this.props.addCategory
    },
    {
      title: 'Categories',
      editdAction: this.props.editCategory,
      addAction: this.props.addCategory
    },
  ]

  const renderCard = ({ title, editAction, addAction }) => {
    return (
      <Card
        style={{ width: 300 }}
        actions={[
          <Icon
            type='edit'
            onClick={editAction}
          />,
          <Icon
            type='plus-circle'
            onClick={addAction}
          />
        ]}
      >
        <p>{title}</p>
      </Card>
    )
  }

  return (
    <div>

    </div>
  )
}

export default connect(null, {
  editAnnouncement
})(AdminPanel)
