//react
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

//actions
import { initApp } from './../actions';

//containers
import CharacterSection from './CharacterSection';
import PlayerSection from './PlayerSection';

//css
require('./../../style/app.scss');

class App extends Component {

	constructor (props) {
		super(props);
	}

	componentDidMount () {
		this.props.initApp();
	}

	render () {
		return (
			<div className="app">

				<section id="player">
					<PlayerSection />
				</section>

				<section id="character">
					<div className="content">
						<CharacterSection />
					</div>
				</section>

			</div>
		)
	}
}


const mapStateToProps = (state, ownProps) => ({
	title: state.ui.title,
});

export default connect(mapStateToProps, {
  initApp
})(App)