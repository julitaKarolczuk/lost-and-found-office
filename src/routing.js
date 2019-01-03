import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import LoginPage from './LoginPage'
import AnnouncementsList from './AnnouncementsList'
import RegistrationPage from './RegistrationPage'
import AnnouncementDetails from './AnnouncementDetails'
import { config } from './config'
import { PrivateRoute } from './PrivateRoute'
import Records from './Records'
import Profile from './Profile'
import ItemsList from './ItemsList'
import AdminPanel from './AdminPanel'
import AdminPanelCategories from './admin/AdminPanelCategories'
import AdminPanelItems from './admin/AdminPanelItems'
import AdminPanelDivisions from './admin/AdminPanelDivisions'
import AdminPanelUser from './admin/AdminPanelUser'
import AdminPanelAnnouncements from './admin/AdminPanelAnnouncements'

const {
    app,
    registration,
    itemDetails,
    records,
    login,
    profile,
    items,
    adminPanel,
    adminPanelItems,
    adminPanelAnnouncements,
    adminPanelDivisions,
    adminPanelCategories,
    adminPanelUsers
} = config.url

const Routing = () => {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <Switch>
          <App>
            <PrivateRoute
              exact path={app}
              component={AnnouncementsList}
            />
            <Route exact path={login} component={LoginPage} />
            <Route exact path={registration} component={RegistrationPage} />
            <Route exact path={itemDetails} component={AnnouncementDetails} />
            <Route exact path={records} component={Records} />
            <Route exact path={profile} component={Profile} />
            <Route exact path={items} component={ItemsList} />
            <Route exact path={adminPanelCategories} component={AdminPanelCategories} />
            <Route exact path={adminPanelItems} component={AdminPanelItems} />
            <Route exact path={adminPanelAnnouncements} component={AdminPanelAnnouncements} />
            <Route exact path={adminPanelDivisions} component={AdminPanelDivisions} />
            <Route exact path={adminPanelUsers} component={AdminPanelUser} />
            <Route exact path={adminPanel} component={AdminPanel} />
          </App>
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default Routing
