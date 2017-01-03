import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import PlayerAs from '../components/PlayerAs';

const mapStateToProps = (state, ownProps) => ({
	player: state.player,
	character: state.characters.byKey [ state.characters.selected ]
});


export default connect(mapStateToProps, {
  
})(PlayerAs)


