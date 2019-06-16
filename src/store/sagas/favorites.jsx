import { call, put, select } from 'redux-saga/effects'
import api from '../../services/api'

import { Creators as FavoriteActions } from '../ducks/favorites'

/**
 *
 * @param {*} action data from AddFavoriteRequest
 */
export function* addFavorite(action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`)

    const isDuplicated = yield select(state =>
      state.favorites.data.find(favorite => favorite.id === data.id)
    )

    if (isDuplicated) {
      yield put(FavoriteActions.addFavoriteFailure('Repositório duplicado'))
    } else {
      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url
      }

      /**
       * Execute AddFavoriteSuccess Action, which have an reducer listening for changes
       */
      yield put(FavoriteActions.addFavoriteSuccess(repositoryData))
    }
  } catch (err) {
    yield put(FavoriteActions.addFavoriteFailure('Erro ao adicionar repositório'))
  }
}
