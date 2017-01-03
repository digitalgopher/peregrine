import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CharacterList from '../components/CharacterList';
import { selectCharacter } from './../actions';

const mapStateToProps = (state, ownProps) => ({
	characterKeys: state.characters.keys,
	characters: state.characters.byKey,
	selected: state.characters.selected
});


export default connect(mapStateToProps, {
  selectCharacter
})(CharacterList)


