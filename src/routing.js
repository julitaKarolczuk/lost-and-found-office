import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import LoginPage from './LoginPage'
import AnnouncementsList from './AnnouncementsList'
import RegistrationPage from './RegistrationPage'
import AnnouncementDetails from './AnnouncementDetails'
import { config } from './config'
import ItemsStore from './ItemsStore'

const {
    app,
    registration,
    login,
    itemDetails,
    records,
    itemsStore
} = config.url

const Routing = () => {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Switch>
          <App>
            <Route exact path={login} component={LoginPage} />
            <Route exact path={registration} component={RegistrationPage} />
            <Route exact path={app} component={AnnouncementsList} />
            <Route exact path={itemDetails} component={AnnouncementDetails} />
            <Route exact path={records} component={AnnouncementDetails} />
            <Route exact path={itemsStore} component={ItemsStore} />
            <Redirect to={login} />
          </App>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Routing
