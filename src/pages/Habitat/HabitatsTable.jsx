import * as React from "react";
// import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { PlansTable } from '../Plan/PlansTable';

export class HabitatsTable extends React.Component {

  // https://react-table.js.org/#/story/readme
  constructor(props) {
    super(props);

    this.state = {
        client: props.client,
        habitats: [],
        startDate: undefined,
        stopDate: undefined
    };
  }

  getHabitatsForClient = (id) => {
    if (!id) {
      return Promise.resolve({ habitats: [] });
    }
    return fetch(`http://test.ideesalter.com/alia_searchHabitat.php?client_id=${id}`)
      .then((response) => response.json())
      .then((habitats) => this.setState({habitats: habitats})
    );
  }

  componentDidMount() {
    this.getHabitatsForClient(this.state.client.id);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps=======");
  //   if( nextProps !== this.props ) {
  //     console.log(nextProps);
  //       this.setState({
  //         habitats: nextProps.habitats
  //       });
  //   }
  //   console.log("=======componentWillReceiveProps");
  // }

  // id
  // nom
  // adresse
  // email
  // telephone
  handleEventsOnHabitat = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
          var currentHabitat = rowInfo.original;
            // console.log('A Td Element was clicked!')
            // console.log('it produced this event:', e)
            // console.log('It was in this column:', column)
            // console.log('It was in this row:', rowInfo)
            // console.log('It was in this table instance:', instance)
        }
    }
  }

  render() {
    const { habitats } = this.state;
    const columns = [
      { Header: "Id",
        accessor: "id"
      },
      { Header: "Adresse",
        accessor: "adresse"
      },
      // { Header: "localisation",
      //   accessor: d =>  ({latitude: d.gps_latitude,
      //                     longitude: d.gps_longitude,
      //                     elevation: d.gps_elevation
      //                   })
      // },
    ];

    if( habitats.length === 0 || (habitats.length === 1 && habitats[0] === undefined ) ) {
      return (
        <div></div>
      );
    }

    return (
      <div>
        <ReactTable
          data={habitats}
          noDataText="Pas d'habitat pour ce client"
          columns={columns}
          defaultPageSize={1}
          className="-striped -highlight"
          getTrProps={this.handleEventsOnHabitat}
          SubComponent={ row => {
            return (<PlansTable habitat={row.original} />);
          }}
        />
        <br />
      </div>
    );
  }
}

