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
import { PrivateRoute } from './PrivateRoute'
import Records from './Records'
import Profile from './Profile'
import ItemsList from './ItemsList';

const {
    app,
    registration,
    itemDetails,
    records,
    itemsStore,
    login,
    profile,
    announcements
} = config.url

const Routing = () => {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Switch>
          <App>
            <PrivateRoute
              path={app}
              component={ItemsList}
            />
            <Route exact path={login} component={LoginPage} />
            <Route exact path={registration} component={RegistrationPage} />
            <Route exact path={itemDetails} component={AnnouncementDetails} />
            <Route exact path={records} component={Records} />
            <Route exact path={itemsStore} component={ItemsStore} />
            <Route exact path={profile} component={Profile} />
            <Route exact path={announcements} component={AnnouncementsList} />
          </App>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Routing
