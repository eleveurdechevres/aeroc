import React, { Component } from 'react';
import { ClientSearchComponent } from './ClientSearchComponent';
import { ClientSummary } from './ClientSummary';
import { ClientsTable } from './Client/ClientsTable';
import 'react-select/dist/react-select.css';

export class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toto: "essai",
            currentClient: undefined
        };
    }

    handlerClientSearch(client) {
        console.log("handlerClientSearch " + client.nom + " " + client.id);
        this.setState({ currentClient: client });
    }

    render() {
        return (
            <div>
                <header>
                    <p>ALIA Header</p>
                    <p><button onClick={this.handleClick}>toto</button></p>
                    <ClientSearchComponent handler={this.handlerClientSearch.bind(this)}/>
                    <ClientSummary client={this.state.currentClient}/>
                </header>
                <ClientsTable clients={[this.state.currentClient]}/>
                <footer>
                    ALIA Footer : {this.state.toto}
                </footer>
            </div>
        )
    }
}