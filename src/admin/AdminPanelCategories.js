import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import {
  getCategories
} from '../Actions'
import {
  showAddCategoryModal,
  removeCategory
} from './AdminPanelActions'

class AdminPanelCategories extends Component {
  constructor (props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  componentDidMount () {
    this.props.getCategories()
  }

  addItem () {
    this.props.showAddCategoryModal()
  }

  editItem (record) {
    return () => {
      this.props.showAddCategoryModal(record)
    }
  }

  removeItem (id) {
    return () => {
      this.props.removeCategory(id)
    }
  }

  get columns () {
    return (
      [{
        title: 'Nazwa',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record = {}) => (
          <span>
            <Button onClick={this.editItem(record)}>
              <Icon type='edit' />
            </Button>
            <Button onClick={this.removeItem(record.id)}>
              <Icon type='close' />
            </Button>
          </span>
        )
      }]
    )
  }

  render () {
    const {
      categories = []
    } = this.props

    return (
      <div>
        <Button
          className='add-button'
          onClick={this.addItem}
        >
          <Icon type='plus' /> ADD ITEM
        </Button>
        <Table dataSource={categories} columns={this.columns} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.app.categories
})

AdminPanelCategories.propTypes = {
  getCategories: PropTypes.func,
  categories: PropTypes.array,
  showAddCategoryModal: PropTypes.func,
  removeCategory: PropTypes.func
}

export default connect(mapStateToProps, {
  getCategories,
  showAddCategoryModal,
  removeCategory
})(AdminPanelCategories)
