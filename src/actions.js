import * as actionsTypes from './actionsTypes'
import axios from 'axios'
import { config } from './config'
import { notification } from 'antd'

// ENDPOINTS
const {
  api: {
    url,
    base,
    announcements
  }
} = config

const announcementsUrl = `${url}${base}${announcements}`
const announcementDetailsUrl = `${announcementsUrl}/{0}`
// NOTIFICATIONS

export const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
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
  return axios.get(endpoint)
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
  return fetchData(announcementsUrl)
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
