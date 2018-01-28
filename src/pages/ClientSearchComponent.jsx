import React from 'react';
// import PropTypes from 'prop-types';
import Select from 'react-select';
import fetch from 'isomorphic-fetch';

export class ClientSearchComponent extends React.Component {

    // https://jedwatson.github.io/react-select/
    // https://github.com/JedWatson/react-select/blob/master/examples/src/components/GithubUsers.js
    
    constructor(props) {
        super(props)
        this.state = {
        }
    }

	onChange (client) {
		this.setState({
			client: client,
        });
        this.props.handler(client);
    }
    
   
	getClients (nom) {
		if (!nom) {
			return Promise.resolve({ options: [] });
		}

        return fetch(`http://test.ideesalter.com/alia_searchClient.php?nom=${nom}`)
		.then((response) => response.json())
		.then((clients) => {
			return { options: clients };
		});
    }
    
	render () {
		const AsyncComponent = Select.Async;

			return (
			<div className="section">
                <AsyncComponent width="100" client={this.state.value} onChange={this.onChange.bind(this)} onValueClick={this.gotoUser} valueKey="id" labelKey="nom" loadOptions={this.getClients} />
				<div>
					<p>Taken from wikpedia</p>
					<img src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO    9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot" />
				</div>
			</div>
		);
	}
}