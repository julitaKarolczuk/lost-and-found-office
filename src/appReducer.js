import * as actions from './actionsTypes'

const defaultState = {
  loading: false
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
    default:
      return state
  }
}
