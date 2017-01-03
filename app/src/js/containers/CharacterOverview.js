import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CharacterFullView from '../components/CharacterFullView';
import { Heroes } from './../modules/heroes';

const mapStateToProps = (state, ownProps) => ({
	character: state.characters.byKey[ state.characters.selected ],
	hero: Heroes[ state.characters.selected ]
});


export default connect(mapStateToProps, {
  
})(CharacterFullView)


