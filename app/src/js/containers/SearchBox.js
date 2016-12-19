import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayer, searchPlayer } from './../actions';


class SearchBox extends Component {

	constructor (props) {
		super( props );
		this.handleChange = this.handleChange.bind( this );
		this.search = this.search.bind( this );
		this.state = {
			value: 'Gopher'
		}
	}

	handleChange (e) {
		this.setState({
			value: e.target.value
		})
	}


	search () {
		// this.props.getPlayer( this.state.value );
		this.props.searchPlayer( this.state.value );
	}

	render () {
		return (
			<div>
				<input type="text" 
					onChange={this.handleChange} 
					value={this.state.value}
					placeholder="search for a player" />
				<button onClick={ this.search } > yo yo yoy y oy </button>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({

});

export default connect( mapStateToProps, { getPlayer, searchPlayer } )( SearchBox );