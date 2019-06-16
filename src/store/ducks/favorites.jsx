/**
 * Types
 */

export const Types = {
  ADD_REQUEST: 'favorites/ADD_REQUEST',
  ADD_SUCCESS: 'favorites/ADD_SUCESS',
  ADD_FAILURE: 'favorites/ADD_FAILURE'
}

/**
 * REDUCER
 */

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null
}

export default function favorites(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: [...state.data, action.payload.data]
      }

    case Types.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      return state
  }
}

/**
 * ACTIONS
 */

export const Creators = {
  /**
   * Called from components, should be mapped in /sagas/index.jsx
   * @param {*} repository
   */
  addFavoriteRequest: repository => ({
    type: Types.ADD_REQUEST,
    payload: { repository }
  }),

  /**
   * Called from Saga after Request
   * @param {*} data
   */
  addFavoriteSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data }
  }),

  addFavoriteFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error }
  })
}
