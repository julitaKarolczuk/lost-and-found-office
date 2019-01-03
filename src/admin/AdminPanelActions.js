import * as actionsTypes from './../actionsTypes'
import axios from 'axios'
import { config } from './../config'
import {
  showModal,
  getDivisions,
  getCategories
} from '../Actions'

const {
  api: {
    baseUrl,
    categories,
    category,
    registration,
    divisions,
    division,
    users,
    user
  }
} = config

const categoriesUrl = `${baseUrl}${categories}`
const categoryDetailsUrl = `${baseUrl}${category}`
const registrationUrl = `${baseUrl}${registration}`
const divisionsUrl = `${baseUrl}${divisions}`
const divisionsDetailsUrl = `${baseUrl}${division}`
const userUrl = `${baseUrl}${user}`
const usersUrl = `${baseUrl}${users}`

// divisions
export const showAddDivisionModal = (item = {}) => dispatch => {
  dispatch(showModal({
    type: actionsTypes.SHOW_MODAL,
    modalType: actionsTypes.ADD_DIVISION,
    modalProps: { item }
  }))
}

export const editDivision = (id, data) => dispatch => {
  return axios.put(divisionsDetailsUrl.replace('{0}', id), data)
    .then(() => {
      dispatch(getDivisions())
    })
}

export const removeDivision = id => dispatch => {
  return axios.delete(divisionsDetailsUrl.replace('{0}', id))
    .then(() => {
      dispatch(getDivisions())
    })
}

export const addDivision = data => dispatch => {
  return axios.post(divisionsUrl, data)
    .then(() => {
      dispatch(getDivisions())
    })
}

// categories

export const showAddCategoryModal = () => dispatch => {
  dispatch(showModal({
    type: actionsTypes.SHOW_MODAL,
    modalType: actionsTypes.ADD_CATEGORY,
    modalProps: {}
  }))
}

export const editCategory = (id, data) => dispatch => {
  return axios.put(categoryDetailsUrl.replace('{0}', id), data)
    .then(() => {
      dispatch(getCategories())
    })
}

export const removeCategory = id => dispatch => {
  return axios.delete(categoryDetailsUrl.replace('{0}', id))
    .then(() => {
      dispatch(getCategories())
    })
}

export const addCategory = data => dispatch => {
  return axios.post(categoriesUrl, data)
    .then(() => {
      dispatch(getCategories())
    })
}

// users
const getUsersAction = data => ({
  type: actionsTypes.GET_USERS,
  payload: data
})

export const getUsers = () => dispatch => {
  return axios.get(usersUrl)
  .then(response => response.data)
    .then(data => {
      getUsersAction(data)
    })
}

export const showAddUserModal = () => dispatch => {
  dispatch(showModal({
    type: actionsTypes.SHOW_MODAL,
    modalType: actionsTypes.ADD_USER,
    modalProps: {}
  }))
}

export const editUser = (id, data) => dispatch => {
  return axios.patch(categoryDetailsUrl.replace('{0}', id), data)
    .then(() => {
      dispatch(getUsers())
    })
}

export const removeUser = id => dispatch => {
  return axios.delete(categoryDetailsUrl.replace('{0}', id))
    .then(() => {
      dispatch(getUsers())
    })
}

export const addUser = data => dispatch => {
  return axios.post(registrationUrl, data)
    .then(() => {
      dispatch(getUsers())
    })
}
