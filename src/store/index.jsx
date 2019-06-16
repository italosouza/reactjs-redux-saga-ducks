/**
 * Store: Action -> Saga -> Reducers
 * For each state-like objet, create a new file in each folder
 * Later, each Request action must be mapped in ./sagas/index.jsx
 */
import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

/**
 * import all reduces
 */
import reducers from './ducks'

/**
 * import all sagas
 */
import sagas from './sagas'

/**
 * reactotron-redux-saga
 */
const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null

const sagaMiddleware = createSagaMiddleware(sagaMonitor)
const middlewares = [sagaMiddleware]

const composer =
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...middlewares),
        console.tron.createEnhancer()
      )
    : applyMiddleware(...middlewares)

/**
 * Creates a store object with Saga middlewares
 */
const store = createStore(reducers, composer)
sagaMiddleware.run(sagas)

export default store
