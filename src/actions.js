import * as actionsTypes from './actionsTypes'
import axios from 'axios'
import { config } from './config'
import { notification } from 'antd'
import { messages } from './messages'

// ENDPOINTS
const {
  api: {
    baseUrl,
    announcements,
    announcementDetails,
    categories,
    authentication,
    registration,
    items,
    item,
    divisions
  }
} = config

const announcementsUrl = `${baseUrl}${announcements}`
const announcementDetailsUrl = `${baseUrl}${announcementDetails}`
const categoriesUrl = `${baseUrl}${categories}`
const autenticationUrl = `${baseUrl}${authentication}`
const registrationUrl = `${baseUrl}${registration}`
const itemDetailsUrl = `${baseUrl}${item}`
const itemsUrl = `${baseUrl}${items}`
const divisionsUrl = `${baseUrl}${divisions}`

// AXIOS HEADER SETTINGS

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token.slice(1, token.length - 1)}`
}

const loggedInToken = window.localStorage.getItem('token')
if (loggedInToken) {
  setAuthHeader(loggedInToken)
}

// NOTIFICATIONS

export const openNotificationWithIcon = (type, title, text) => {
  notification[type]({
    message: title,
    description: text
  })
}

// MODAL ACTIONS
const showModal = ({ modalType, modalProps }) => dispatch => {
  dispatch({
    type: actionsTypes.SHOW_MODAL,
    modalProps,
    modalType
  })
}

export const hideModal = () => dispatch => {
  dispatch({
    type: actionsTypes.HIDE_MODAL
  })
}

export const showForgotPasswordModal = () => dispatch => {
  dispatch(showModal({
    type: actionsTypes.SHOW_MODAL,
    modalType: actionsTypes.FORGOT_PASSWORD_MODAL,
    modalProps: {}
  }))
}

export const showAddAnnouncementModal = (item = {}) => dispatch => {
  dispatch(showModal({
    type: actionsTypes.SHOW_MODAL,
    modalType: actionsTypes.ADD_ITEM_MODAL,
    modalProps: { item }
  }))
}

// LOADER ACTIONS
const showLoaderAction = () => ({
  type: actionsTypes.SHOW_LOADER
})

const hideLoaderAction = () => ({
  type: actionsTypes.HIDE_LOADER
})

// COMMON ACTIONS
const fetchData = (endpoint, params = {}) => {
  return axios.get(endpoint, { params })
    .then(response => response.data)
}

// ANNOUNCEMENTS ACTIONS
const getAnnouncementDetailsAction = data => ({
  type: actionsTypes.GET_ANNOUNCEMENT_DETAILS,
  payload: data
})

export const getAnnouncementDetails = id => dispatch => {
  dispatch(showLoaderAction())
  return fetchData(announcementDetailsUrl.replace('{0}', id))
    .then(data => {
      dispatch(getAnnouncementDetailsAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
    })
}
const getAnnouncementsAction = data => ({
  type: actionsTypes.GET_ANNOUNCEMENTS,
  payload: data
})

export const getAnnouncements = () => dispatch => {
  dispatch(showLoaderAction())
  return fetchData(announcementsUrl, { status: 0, pageSize: 5, pageNumber: 1 })
    .then(data => {
      dispatch(getAnnouncementsAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
    })
}

export const removeAnnouncement = id => {
  return axios.delete(announcementDetailsUrl.replace('{0}', id))
    .then(() => {
      getAnnouncements()
      openNotificationWithIcon(messages.notifications.success, messages.notifications.successRemove)
    })
    .catch(error => {
      console.dir(error)
      openNotificationWithIcon(messages.notifications.error, messages.notifications.commonError)
    })
}

const editAnnouncementAction = data => ({
  type: actionsTypes.EDIT_ANNOUNCEMENT,
  payload: data
})

export const editAnnouncement = data => dispatch => {
  dispatch(showLoaderAction())
  return axios.put(announcementDetailsUrl.replace('{0}', data.id), data)
    .then(() => {
      dispatch(editAnnouncementAction(data))
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.success, messages.notifications.successEdit)
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.error, messages.notifications.commonError)
    })
}

const addAnnouncementAction = data => ({
  type: actionsTypes.ADD_ANNOUNCEMENT,
  payload: data
})

export const addAnnouncement = data => dispatch => {
  dispatch(showLoaderAction())
  return axios.post(announcementsUrl, data)
    .then(() => {
      dispatch(addAnnouncementAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.error, messages.notifications.commonError)
    })
}
// ITEMS ACTIONS
const getItemDetailsAction = data => ({
  type: actionsTypes.GET_ITEM_DETAILS,
  payload: data
})

export const getItemDetails = id => dispatch => {
  dispatch(showLoaderAction())
  return fetchData(itemDetailsUrl.replace('{0}', id))
    .then(data => {
      dispatch(getItemDetailsAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
    })
}
const getItemsAction = data => ({
  type: actionsTypes.GET_ITEMS,
  payload: data
})

export const getItems = () => dispatch => {
  dispatch(showLoaderAction())
  return fetchData(itemsUrl, { status: 0, pageSize: 5, pageNumber: 1 })
    .then(data => {
      dispatch(getItemsAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
    })
}

export const removeItem = id => {
  return axios.delete(itemDetailsUrl.replace('{0}', id))
    .then(() => {
      getItems()
      openNotificationWithIcon(messages.notifications.success, messages.notifications.successRemove)
    })
    .catch(error => {
      console.dir(error)
      openNotificationWithIcon(messages.notifications.error, messages.notifications.commonError)
    })
}

const editItemAction = data => ({
  type: actionsTypes.EDIT_ITEM,
  payload: data
})

export const editItem = data => dispatch => {
  dispatch(showLoaderAction())
  return axios.put(itemDetailsUrl.replace('{0}', data.id), data)
    .then(() => {
      dispatch(editItemAction(data))
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.success, messages.notifications.successEdit)
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.error, messages.notifications.commonError)
    })
}

const addItemAction = data => ({
  type: actionsTypes.ADD_ITEM,
  payload: data
})

export const addItem = data => dispatch => {
  dispatch(showLoaderAction())
  return axios.post(itemDetailsUrl, data)
    .then(() => {
      dispatch(addItemAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.error, messages.notifications.commonError)
    })
}

// CATEGORIES ACTIONS
const getCategoriesAction = data => ({
  type: actionsTypes.GET_CATEGORIES,
  payload: data
})

export const getCategories = () => dispatch => {
  dispatch(showLoaderAction())
  return fetchData(categoriesUrl)
    .then(data => {
      dispatch(getCategoriesAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(() => {
      dispatch(hideLoaderAction())
    })
}

// USER authorization
const authorization = ({ login, password }) => {
  return axios.post(autenticationUrl, {
    userName: login,
    password
  })
  .then(response => response.data)
}

export const authorizationAction = () => ({
  type: actionsTypes.USER_SIGN_IN
})

const getUserDataAction = user => ({
  type: actionsTypes.GET_USER_DATA,
  payload: user
})

export const signIn = values => dispatch => {
  dispatch(showLoaderAction())
  return authorization(values)
    .then(userData => {
      const {
        token,
        ...user
      } = userData

      window.localStorage.setItem('token', JSON.stringify(token))
      setAuthHeader(token)

      dispatch(authorizationAction())
      dispatch(getUserDataAction(user))
      dispatch(getCategories())
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.success, messages.notifications.signInTitle)
    })
    .catch((err) => {
      console.dir(err)
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.error, messages.notifications.signInError)
    })
}

const logoutAction = () => ({
  type: actionsTypes.USER_SIGN_OUT
})

export const signOut = () => dispatch => {
  dispatch(showLoaderAction())
  window.localStorage.removeItem('token')
  axios.defaults.headers.common['Authorization'] = null
  dispatch(logoutAction())
  dispatch(hideLoaderAction())
  openNotificationWithIcon(messages.notifications.success, messages.notifications.signOutTitle)
}

// USER REGISTRATION
const register = values => {
  return axios.post(registrationUrl, { ...values })
  .then(response => response.data)
}

export const signUp = values => dispatch => {
  dispatch(showLoaderAction())
  return register(values)
    .then(() => dispatch(hideLoaderAction()))
    .catch((err) => {
      console.dir(err)
      dispatch(hideLoaderAction())
    })
}

// DIVISIONS
const getDivisionsAction = data => ({
  type: actionsTypes.GET_DIVISIONS,
  payload: data
})

export const getDivisions = () => dispatch => {
  dispatch(showLoaderAction())
  return fetchData(divisionsUrl)
    .then(data => {
      dispatch(getDivisionsAction(data))
      dispatch(hideLoaderAction())
    })
    .catch((err) => {
      console.dir(err)
      dispatch(hideLoaderAction())
    })
}
