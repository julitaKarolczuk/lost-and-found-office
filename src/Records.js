import React, { Component } from 'react'
import PropTypes from 'prop=types'


const columns = [{
  title: 'Nazwa',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Kategoria',
  dataIndex: 'category',
  key: 'category'
}, {
  title: 'Data utworzenia',
  dataIndex: 'date',
  key: 'date'
}, {
  title: 'Data wydania',
  dataIndex: 'count',
  key: 'count'
}, {
  title: 'Wydane przez',
  dataIndex: 'count',
  key: 'count'
}]

const dataSource = [{
  key: '1',
  name: 'Mike',
  category: 32,
  date: 1,
  count: '10 Downing Street'
}, {
  key: '2',
  name: 'John',
  category: 42,
  date: 2,
  count: '10 Downing Street'
}]

class Records extends Component {
  render () {
    return (
      <div>

      </div>
    )
  }
}

Records.propTypes = {

}

export default Records
