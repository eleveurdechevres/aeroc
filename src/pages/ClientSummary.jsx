import React, { Component } from 'react';
//import { ClientSearchComponent } from './ClientSearchComponent';

export class ClientSummary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentClient: props.client
        };
    }

    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps");
        // console.log(nextProps);
        // console.log("===========================");
        if( nextProps !== this.props ) {
            this.setState({
                currentClient: nextProps.client
            });
        }
    }

    render() {
        var currentClient = this.state.currentClient;
        if( currentClient === undefined )  {
            return (
                <div></div>
            );                
        }

        return (
            <div>
                {this.state.currentClient.nom}
            </div>
        );
    }
}
