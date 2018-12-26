import * as actionsTypes from './actionsTypes'
import axios from 'axios'
import { config } from './config'
import { notification } from 'antd'
import { messages } from './messages';

// ENDPOINTS
const {
  api: {
    baseUrl,
    announcements,
    announcementDetails,
    categories,
    authentication,
    registration
  }
} = config

const announcementsUrl = `${baseUrl}${announcements}`
const announcementDetailsUrl = `${baseUrl}${announcementDetails}`
const categoriesUrl = `${baseUrl}${categories}`
const autenticationUrl = `${baseUrl}${authentication}`
const registrationUrl = `${baseUrl}${registration}`

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

export const removeItem = id => {
  return axios.delete(announcementDetailsUrl.replace('{0}', id))
    .then(() => {
      getAnnouncements()
    })
    .catch(error => {
      console.dir(error)
    })
}

const editItemAction = data => ({
  type: actionsTypes.EDIT_ITEM,
  payload: data
})

export const editItem = data => dispatch => {
  dispatch(showLoaderAction())
  return axios.put(announcementDetailsUrl.replace('{0}', data.id), data)
    .then(() => {
      dispatch(editItemAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
    })
}

const addItemAction = data => ({
  type: actionsTypes.ADD_ITEM,
  payload: data
})

export const addItem = data => dispatch => {
  dispatch(showLoaderAction())
  return axios.post(announcementDetailsUrl, data)
    .then(() => {
      dispatch(addItemAction(data))
      dispatch(hideLoaderAction())
    })
    .catch(error => {
      console.dir(error)
      dispatch(hideLoaderAction())
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

const authorizationAction = () => ({
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      dispatch(authorizationAction())
      dispatch(getUserDataAction(user))
      dispatch(getCategories())
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.success, messages.notifications.signInTitle, messages.notifications.signInSuccess)
    })
    .catch((err) => {
      console.dir(err)
      dispatch(hideLoaderAction())
      openNotificationWithIcon(messages.notifications.error, messages.notifications.signInTitle, messages.notifications.signInError)
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
