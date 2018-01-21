import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';

export class ClientSearchComponent extends React.Component {

    // https://jedwatson.github.io/react-select/
    // https://github.com/JedWatson/react-select/blob/master/examples/src/components/GithubUsers.js

	// propTypes = {
	// 	label: PropTypes.string,
    // };
    
    constructor(props) {
        super(props)
        this.state = {
			backspaceRemoves: true,
			multi: true,
			creatable: false,
        }
    }

    // defaultProps() {
    //     return {
    //         label: PropTypes.string,
    //     }
    // }

	onChange (value) {
        console.log(value);
		this.setState({
			value: value,
        });
        this.props.handler(value);
    }
    
	// switchToMulti () {
	// 	this.setState({
	// 		multi: true,
	// 		value: [this.state.value],
	// 	});
    // }
    
	// switchToSingle () {
	// 	this.setState({
	// 		multi: false,
	// 		value: this.state.value ? this.state.value[0] : null
	// 	});
    // }
    
	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

        // return fetch(`https://api.github.com/search/users?q=${input}`)
        return fetch(`http://test.ideesalter.com/alia_searchClient.php?nom=${input}`)
		.then((response) => response.json())
		.then((json) => {
            console.log(json);
			// return { options: json.items };
			return { options: json };
		});
    }
    
	// gotoUser (client, event) {
	// 	window.open(client.html_url);
    // }
    
	// toggleBackspaceRemoves () {
	// 	this.setState({
	// 		backspaceRemoves: !this.state.backspaceRemoves
	// 	});
    // }
    
	// toggleCreatable () {
	// 	this.setState({
	// 		creatable: !this.state.creatable
	// 	});
    // }
    
	render () {
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;

		return (
			<div className="section">
				{/*
				<h3 className="section-heading">{this.props.label} <a href="https://github.com/JedWatson/react-select/tree/master/examples/src/components/GithubUsers.js">(Source)</a></h3>
                */}
                <AsyncComponent width="100" multi={false/*this.state.multi*/} value={this.state.value} onChange={this.onChange.bind(this)} onValueClick={this.gotoUser} valueKey="id" labelKey="nom" loadOptions={this.getUsers} backspaceRemoves={false/*this.state.backspaceRemoves*/} />
				{/*
				<div className="checkbox-list">
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={this.state.multi} onChange={this.switchToMulti}/>
						<span className="checkbox-label">Multiselect</span>
					</label>
					<label className="checkbox">
						<input type="radio" className="checkbox-control" checked={!this.state.multi} onChange={this.switchToSingle}/>
						<span className="checkbox-label">Single Value</span>
					</label>
				</div>
				<div className="checkbox-list">
					<label className="checkbox">
					   <input type="checkbox" className="checkbox-control" checked={this.state.creatable} onChange={this.toggleCreatable} />
					   <span className="checkbox-label">Creatable?</span>
					</label>
					<label className="checkbox">
					   <input type="checkbox" className="checkbox-control" checked={this.state.backspaceRemoves} onChange={this.toggleBackspaceRemoves} />
					   <span className="checkbox-label">Backspace Removes?</span>
					</label>
				</div>
                <div className="hint">This example uses fetch.js for showing Async options with Promises</div>
                */}
			</div>
		);
	}
}
