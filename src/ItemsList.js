import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getItems,
  removeItem,
  editItem
} from './Actions'
import CardsList from './CardsList'

class ItemsList extends Component {

  componentDidMount () {
    this.props.getItems()
  }

  render () {
    const {
      items = [],
      removeItem,
      editItem
    } = this.props

    return (
      <CardsList
        listItems={items}
        saveAction={editItem}
        deleteAction={removeItem}
      />
    )
  }
}

const mapStateToProps = state => ({
  items: state.app.items
})

ItemsList.propTypes = {
  getItems: PropTypes.func,
  items: PropTypes.array,
  removeItem: PropTypes.func,
  editItem: PropTypes.func
}

export default connect(mapStateToProps, {
  getItems,
  removeItem,
  editItem
})(ItemsList)
