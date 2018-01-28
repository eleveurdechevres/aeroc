import React, { Component } from 'react';
import { ClientSearchComponent } from './ClientSearchComponent';
import { ClientSummary } from './ClientSummary';
import { ClientsTable } from './Client/ClientsTable';
import 'react-select/dist/react-select.css';
export class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentClient: undefined,
            habitats: []
        };
    }

    handlerClientSearch = (client) => {
        this.setState({ currentClient: client });
    }

    handlerClientSelect= (client) => {
        //this.getHabitatsForClient(client.id);    
    }

    render() {
        return (
            <div>
                <header>
                    <p>ALIA Header</p>
                    <ClientSearchComponent handler={this.handlerClientSearch}/>
                    <br/>
                    <ClientSummary client={this.state.currentClient}/>
                </header>
                <ClientsTable clients={[this.state.currentClient]} handler={this.handlerClientSelect}/>
                <footer>
                    ALIA Footer : {this.state.toto}
                </footer>
            </div>
        )
    }
}