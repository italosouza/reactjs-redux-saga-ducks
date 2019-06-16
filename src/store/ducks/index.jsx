import { combineReducers } from 'redux'

/**
 * Import all reducers
 */
import favorites from './favorites'
/**
 * Combine them into global application
 */
export default combineReducers({
  favorites
})
