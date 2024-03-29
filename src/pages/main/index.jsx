import React from 'react'
import PropTypes from 'prop-types'

// coisas do redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as FavoritesActions } from '../../store/ducks/favorites'

class Main extends React.Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string
        })
      ),
      error: PropTypes.oneOfType([null, PropTypes.string])
    }).isRequired
  }

  state = {
    repositoryInput: ''
  }

  handleAddRepository = event => {
    event.preventDefault()
    // call -> store/action/favorites/addFavoriteRequest
    this.props.addFavoriteRequest(this.state.repositoryInput)
    this.setState({ repositoryInput: '' })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleAddRepository}>
          <input
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Adicionar</button>
          {this.props.favorites.loading && <span>Carregando...</span>}
          {!!this.props.favorites.error && <span>{this.props.favorites.error}</span>}
        </form>

        <ul>
          {this.props.favorites.data.map(favorite => (
            <li key={favorite.id}>
              <p>
                <strong>{favorite.name}</strong> ({favorite.description})
              </p>
              <a href={favorite.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
})

const mapDispatchToProps = dispatch => bindActionCreators(FavoritesActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
