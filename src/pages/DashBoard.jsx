import React, { Component } from 'react';
import { ClientSearchComponent } from './ClientSearchComponent';
import { ClientSummary } from './ClientSummary';
import { ClientsTable } from './Client/ClientsTable';
import 'react-select/dist/react-select.css';
import Modal from 'react-modal';

const customStyles = {
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
      position                   : 'absolute',
      top                        : '40px',
      left                       : '40px',
      right                      : '40px',
      bottom                     : '40px',
      border                     : '1px solid #ccc',
      background                 : '#fff',
      overflow                   : 'auto',
      WebkitOverflowScrolling    : 'touch',
      borderRadius               : '4px',
      outline                    : 'none',
      padding                    : '20px'
    }
};

export class DashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentClient: undefined,
            habitats: [],
            modalIsOpen: false
        };
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal = () => {
        // references are now sync'd and can be accessed.
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
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
                <button onClick={this.openModal}>Open Modal</button>
                <Modal 
                    className="modalGraph"
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}
                    >
                    {/* {this.graphContent} */}
                </Modal>
                <ClientsTable clients={[this.state.currentClient]} handler={this.handlerClientSelect}/>
                <footer>
                    ALIA Footer : {this.state.toto}
                </footer>
                </div>
        )
    }
}