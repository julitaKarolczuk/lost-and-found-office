import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Icon } from 'antd'
import { connect } from 'react-redux'
import {
  getDivisions
} from '../Actions'
import {
  showAddDivisionModal,
  removeDivision
} from './AdminPanelActions'

class AdminPanelDivisions extends Component {
  constructor (props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  componentDidMount () {
    this.props.getDivisions()
  }


  addItem () {
    this.props.showAddDivisionModal()
  }

  editItem (record) {
    return () => {
      this.props.showAddDivisionModal(record)
    }
  }

  removeItem (id) {
    return () => {
      this.props.removeDivision(id)
    }
  }

  get columns () {
    return (
      [{
        title: 'Nazwa',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: 'Adres',
        dataIndex: 'address',
        key: 'address'
      }, {
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
      divisions = []
    } = this.props

    return (
      <div>
        <Button
          className='add-button'
          onClick={this.addItem}
        >
          <Icon type='plus' /> ADD ITEM
        </Button>
        <Table dataSource={divisions} columns={this.columns} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  divisions: state.app.divisions
})

AdminPanelDivisions.propTypes = {
  getDivisions: PropTypes.func,
  divisions: PropTypes.array,
  showAddDivisionModal: PropTypes.func,
  removeDivision: PropTypes.func
}

export default connect(mapStateToProps, {
  getDivisions,
  showAddDivisionModal,
  removeDivision
})(AdminPanelDivisions)
