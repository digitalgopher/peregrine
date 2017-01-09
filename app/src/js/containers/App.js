import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { getPlayer, initApp } from './../actions';

import SearchBox from './SearchBox';
import Header from './../components/Header';
import Scrim from './../components/Scrim';
import CharacterOverview from './CharacterOverview';

//TODO: move this somewhere else...
import TransitionGroup from 'react-addons-transition-group';


import Player from './Player';
import PlayerAsCharacter from './PlayerAsCharacter';
import Characters from './Characters';
import CharacterSection from './CharacterSection';
import Animation from './../animation-components/Animation';

import { ScaleUpAnimation } from './../animations/scaleUp';



require('./../../style/app.scss');

class App extends Component {

	constructor (props) {
		super(props);
		this.click = this.click.bind( this );
	}

	componentDidMount () {
		this.props.initApp();
	}

	click () {
		this.props.getPlayer('gopher');
	}

	//TODO remove this too. it's just for the animation.
	firstChild ( props ) {
		const childrenArray = React.Children.toArray(props.children);
		return childrenArray[0] || null;
	}

	render () {
		let player = null;
		let characters = null;
		let characterview = null;

		if ( this.props.player.name !== null ) {
			if ( this.props.characterSelected ) {
				player = <PlayerAsCharacter />
			}
			else {
				player = <Player />;
			}

			characters = <CharacterSection />;
		}

		if (this.props.characterSelected !== null ) {
			characterview = <CharacterOverview />;
		}

		return (
			<div className="app">
				<Header title={this.props.title}>
					<SearchBox></SearchBox>
				</Header>
				<div className="content">
					{ player }
					{ characters }
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state, ownProps) => ({
	title: state.ui.title,
	player: state.player,
	characterSelected: state.characters.selected,
	allChars: state.characters.byKey
});


export default connect(mapStateToProps, {
  getPlayer, initApp
})(App)





// import React, { Component, PropTypes } from 'react'
// import { connect } from 'react-redux'
// import { browserHistory } from 'react-router'
// import Explore from '../components/Explore'
// import { resetErrorMessage } from '../actions'

// class App extends Component {
//   static propTypes = {
//     // Injected by React Redux
//     errorMessage: PropTypes.string,
//     resetErrorMessage: PropTypes.func.isRequired,
//     inputValue: PropTypes.string.isRequired,
//     // Injected by React Router
//     children: PropTypes.node
//   }

//   handleDismissClick = e => {
//     this.props.resetErrorMessage()
//     e.preventDefault()
//   }

//   handleChange = nextValue => {
//     browserHistory.push(`/${nextValue}`)
//   }

//   renderErrorMessage() {
//     const { errorMessage } = this.props
//     if (!errorMessage) {
//       return null
//     }

//     return (
//       <p style={{ backgroundColor: '#e99', padding: 10 }}>
//         <b>{errorMessage}</b>
//         {' '}
//         (<a href="#"
//             onClick={this.handleDismissClick}>
//           Dismiss
//         </a>)
//       </p>
//     )
//   }

//   render() {
//     const { children, inputValue } = this.props
//     return (
//       <div>
//         <Explore value={inputValue}
//                  onChange={this.handleChange} />
//         <hr />
//         {this.renderErrorMessage()}
//         {children}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state, ownProps) => ({
//   errorMessage: state.errorMessage,
//   inputValue: ownProps.location.pathname.substring(1)
// })

// export default connect(mapStateToProps, {
//   resetErrorMessage
// })(App)