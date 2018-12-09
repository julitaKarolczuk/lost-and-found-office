const defaultState = {
  modalType: null,
  modalProps: {}
}

export default (state = defaultState, action) => {
  const { type } = action
  switch (type) {
    case 'SHOW_MODAL':
      return {
        modalType: action.modalType,
        modalProps: {
          ...action.modalProps,
          visible: true
        }
      }
    case 'HIDE_MODAL':
      return defaultState
    default:
      return state
  }
}
