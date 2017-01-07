import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CharacterList from '../components/CharacterList';
import { selectCharacter } from './../actions';
import CharacterFullView from './../components/CharacterFullView';

import TransitionGroup from 'react-addons-transition-group';
import { ScaleUpAnimation } from './../animations/scaleUp';
import { ScaleDownAnimation } from './../animations/ScaleDown';
import { FadeInAnimation } from './../animations/FadeIn';
import Animation from './../animation-components/Animation';


class CharacterSection extends Component {
	constructor (props) {
		super( props );
	}

	render () {
		const { isSelected, characters, playerIsSelected, characterKeys, selected, selectCharacter } = this.props;
		let view = null;
		if ( !playerIsSelected ) {
			return null;
		}

		if ( isSelected ) {
			view = <Animation enter={ ScaleUpAnimation } exit={ ScaleDownAnimation }>
				<button onClick={ () => { selectCharacter( null )} } >Back</button>
				<CharacterFullView character={ characters[ isSelected ]}></CharacterFullView>
			</Animation>

		}
		else {
			view = <Animation enter={ FadeInAnimation } exit={ ScaleDownAnimation }>
			<CharacterList characterKeys={ characterKeys }
								characters={ characters }
								selectCharacter={ selectCharacter }></CharacterList>
								</Animation>
		}

		return <TransitionGroup component="div">
			{view }
		</TransitionGroup>


	}
}

CharacterSection.propTypes = {
	characters: PropTypes.object.isRequired,
	isSelected: PropTypes.string.isRequired,

	selectCharacter: PropTypes.func.isRequired
}



const mapStateToProps = ( state, ownProps ) => ({
	characterKeys: state.characters.keys,
	characters: state.characters.byKey,
	playerIsSelected: state.player.name !== null,
	isSelected: state.characters.selected || ''
});





export default connect( mapStateToProps, { selectCharacter } )( CharacterSection );