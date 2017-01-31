//react
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

//actions
import { initApp } from './../actions';

//Components
import GopherHeader from './../components/GopherHeader';

//containers
import CharacterSection from './CharacterSection';
import PlayerSection from './PlayerSection';

//css
require('./../../style/app.scss');

class App extends Component {

	constructor (props) {
		super(props);

		this.handleScroll = this.handleScroll.bind( this );

		this.state = {
			headerSize: 'normal'
		}
	}

	componentDidMount () {
		this.props.initApp();
		this.contentNode.addEventListener( 'scroll', this.handleScroll );
	}

	componentDidUpdate () {
		console.log( 'update' );
		// this.scrollStart = this.contentNode.offsetHeight;
	}

	shouldComponentUpdate (nextProps, nextState) {
		return nextState.headerSize !== this.state.headerSize;
	}

	handleScroll (e) {
		this.setState({
			headerSize: e.target.scrollTop > 90 ? 'normal' : 'small',
			scrollOffset: e.target.scrollTop
		})
	}

	render () {


		return (
			<div className="app">
				<div className="app-main">

					<GopherHeader
						offset={ this.state.scrollOffset }
						size={ this.state.headerSize }>
						<section id="player">
							<PlayerSection />
						</section>
					</GopherHeader>

					<div className="app-content-container" ref={ node => this.contentNode = node  } >
						<div className="app-content">
							<section id="character">
								<CharacterSection />
							</section>
						</div>
					</div>

				</div>
			</div>
		)

		// return (
		// 	<div className="app">

		// 		<section id="player">
		// 			<PlayerSection />
		// 		</section>

		// 		<section id="character">
		// 			<CharacterSection />
		// 		</section>

		// 	</div>
		// )
	}
}


const mapStateToProps = (state, ownProps) => ({
	title: state.ui.title,
});

export default connect(mapStateToProps, {
  initApp
})(App)