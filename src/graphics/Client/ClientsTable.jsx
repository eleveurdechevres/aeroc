import React from "react";
import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export class ClientsTable extends React.Component {

  // https://react-table.js.org/#/story/readme
  constructor(props) {
      super(props);
      this.state = {
          clients: props.clients
      };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps");
    // console.log(nextProps);
    // console.log("===========================");
    if( nextProps != this.props ) {
        this.setState({
            clients: nextProps.clients
        });
    }
  }

  // id
  // nom
  // adresse
  // email
  // telephone
  onRowClick(state, rowInfo, column, instance) {
    return {
        onClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
        }
    }
  }

  render() {
    const { clients } = this.state;
    console.log(clients);
    const columns = [
      { Header: "Id",
        accessor: "id"
      },
      { Header: "Nom",
        accessor: "nom"
      },
      { Header: "Adresse",
        accessor: "adresse"
      },
      { Header: "email",
        accessor: "email"
      },
      { Header: "Téléphone",
        accessor: "telephone"
      }
    ];

    if( clients.length == 0 || ( clients.length == 1 && clients[0] == undefined ) ) {
      return (
        <div></div>
      );
    }


    return (
      <div>
        <ReactTable
          data={clients}
          columns={columns}
          defaultPageSize={1}
          className="-striped -highlight"
          getTrProps={this.onRowClick}
        />
        <br />
      </div>
    );
  }
}

