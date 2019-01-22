import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducers'

export const history = createHistory()

const middleware = [
  thunk,
  routerMiddleware(history)
]

const store = createStore(
  rootReducer,
  applyMiddleware( ...middleware)
)

export default store