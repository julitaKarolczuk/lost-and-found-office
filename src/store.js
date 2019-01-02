import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import app from './AppReducer'
import modal from './modalReducer'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  app,
  form: formReducer,
  modal
})

export default function configureStore () {
  const store = createStore(
   rootReducer,
    compose(
     applyMiddleware(thunk),
     window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
}

