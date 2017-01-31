import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayer, searchPlayer, clearPlayer, updatePlayer } from './../actions';


class SearchBox extends Component {

	constructor (props) {
		super( props );
		this.handleChange = this.handleChange.bind( this );
		this.search = this.search.bind( this );
		this.update = this.update.bind( this );
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
		this.props.searchPlayer( this.state.value );
	}

	update () {
		this.props.updatePlayer( this.state.value );
	}

	render () {

		return (
			<div className="searchBox">
					<input type="text"
						onChange={this.handleChange}
						value={this.state.value}
						placeholder="search for a player" />
					<button className="primary" onClick={ this.search }>Search</button>
					<button disabled className="secondary" onClick={ this.update }> Update Player </button>
					<button className="secondary" onClick={ this.props.clearPlayer }>Clear</button>

			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({

});

export default connect( mapStateToProps, { getPlayer, searchPlayer, clearPlayer, updatePlayer } )( SearchBox );