import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import './App.css'
import { Layout, Input, Spin } from 'antd'
import LeftPanel from './LeftPanel'
import ModalRoot from './ModalRoot'
import { connect } from 'react-redux'
import { messages } from './messages'

const { Header, Content, Footer } = Layout
const Search = Input.Search

class App extends Component {
  render () {
    const { loading } = this.props

    return (
      <Fragment>
        <Layout className={`layout ${loading && 'loading'}`}>
          <LeftPanel />
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Search
                placeholder={messages.search.placeholder}
                enterButton={messages.search.button}
                size='large'
                onSearch={value => console.log(value)}
                className='search'
              />
              {/* <h1>BIURO RZECZY ZNALEZIONYCH</h1> */}
            </Header>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
              {this.props.children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
        {loading && <Spin size='large' />}
        <ModalRoot />
      </Fragment>
    )
  }
}

App.propTypes = {
  children: PropTypes.array,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  loading: state.app.loading
})

export default connect(mapStateToProps, {})(App)
