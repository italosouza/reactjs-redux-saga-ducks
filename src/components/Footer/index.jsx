import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

const Footer = ({ count }) => <p>Você tem {count} favoritos</p>

const mapStateToProps = state => ({
  count: state.favorites.data.length
})

Footer.propTypes = {
  count: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(Footer)
