import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import './App.css'
import {
  Layout,
  Input,
  Spin,
  Button
} from 'antd'
import LeftPanel from './LeftPanel'
import ModalRoot from './ModalRoot'
import { connect } from 'react-redux'
import { messages } from './messages'
import AvatarOptions from './AvatarOptions'
import {
  getCategories,
  authorizationAction
} from './actions'
import qs from 'query-string'
import { withRouter } from 'react-router'
import { config } from './config'

const {
  Header,
  Content,
  Footer
} = Layout

const Search = Input.Search

const { appUrl } = config.url

class App extends Component {
  constructor () {
    super()

    this.state = {
      isAvatarClicked: false
    }

    this.toogleAvatarOptions = this.toogleAvatarOptions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (window.localStorage.getItem('token')) {
      this.props.authorizationAction()
      this.props.getCategories()
    }
  }

  toogleAvatarOptions () {
    this.setState(prevState => ({ isAvatarClicked: !prevState.isAvatarClicked }))
  }

  handleSubmit (value) {
    this.props.history.push({
      pathname: appUrl,
      search: qs.stringify({
        q: value
      })
    })
  }

  render () {
    const {
      loading,
      isSignedIn
    } = this.props

    return (
      <Fragment>
        <Layout className={`layout ${loading && 'loading'}`}>
          <LeftPanel />
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              {isSignedIn
              ? (
                <div className='app-header'>
                  <Search
                    placeholder={messages.search.placeholder}
                    enterButton={messages.search.button}
                    size='large'
                    onSearch={this.handleSubmit}
                    className='search'
                  />
                  <div className='avatar'>
                    <Button
                      size='large'
                      icon='user'
                      className='avatar-button'
                      onClick={this.toogleAvatarOptions}
                    />
                    {this.state.isAvatarClicked &&
                      <AvatarOptions closeOptions={this.toogleAvatarOptions} />
                    }
                  </div>
                </div>
              ) : (
                <h1>BIURO RZECZY ZNALEZIONYCH</h1>
              )}
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
  loading: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  getCategories: PropTypes.func,
  history: PropTypes.object,
  authorizationAction: PropTypes.func
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  isSignedIn: state.app.signIn
})

export default withRouter(connect(mapStateToProps, {
  getCategories,
  authorizationAction
})(App))
