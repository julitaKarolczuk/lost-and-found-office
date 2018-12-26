import * as actions from './actionsTypes'

const defaultState = {
  loading: false,
  signIn: false
}

export default (state = defaultState, action) => {
  const { payload, type } = action
  switch (type) {
    case actions.SHOW_LOADER:
      return {
        ...state,
        loading: true
      }
    case actions.HIDE_LOADER:
      return {
        ...state,
        loading: false
      }
    case actions.GET_ANNOUNCEMENTS:
      return {
        ...state,
        announcements: payload
      }
    case actions.GET_ANNOUNCEMENT_DETAILS:
      return {
        ...state,
        currentAnnouncement: payload
      }
    case actions.ADD_ITEM:
      return {
        ...state,
        announcements: [...state.announcements, payload]
      }
    case actions.EDIT_ITEM:
      return {
        ...state,
        announcements: state.announcements.map(item => {
          if (item.id === payload.id) {
            return payload
          }
          return item
        })
      }
    case actions.GET_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    case actions.USER_SIGN_IN:
      return {
        ...state,
        signIn: true
      }
    case actions.USER_SIGN_OUT:
      return {
        ...state,
        signIn: false
      }
    case actions.GET_USER_DATA:
      return {
        ...state,
        user: payload
      }
    default:
      return state
  }
}
