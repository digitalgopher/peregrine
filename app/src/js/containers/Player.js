import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Player from '../components/Player';

const mapStateToProps = (state, ownProps) => ({
	player: state.ui.player
});


export default connect(mapStateToProps, {
  
})(Player)


