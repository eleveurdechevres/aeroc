import * as React from "react";
// import { render } from "react-dom";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Plan } from '../Plan/Plan';
import { zip } from "d3-array";
import "./Plan.css"

export class PlansTable extends React.Component {

  // https://react-table.js.org/#/story/readme
  constructor(props) {
    super(props);

    this.state = {
        habitat: props.habitat,
        plans: [],
    };
  }

  getPlansForHabitat = (id) => {
    if (!id) {
      return Promise.resolve({ plans: [] });
    }

    return fetch(`http://test.ideesalter.com/alia_searchPlan.php?habitat_id=${id}`)
      .then((response) => response.json())
      .then((plans) => this.setState({plans: plans})
    );
  }

  componentDidMount() {
    this.getPlansForHabitat(this.state.habitat.id);
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
  handleEventsOnPlan = (state, rowInfo, column, instance) => {
    return {
      onClick: e => {
        var currentPlan = rowInfo.original;
          // console.log('A Td Element was clicked!')
          // console.log('it produced this event:', e)
          // console.log('It was in this column:', column)
          // console.log('It was in this row:', rowInfo)
          // console.log('It was in this table instance:', instance)
      }
    }
  }

  render() {
    const { plans } = this.state;
    const columns = [
      { Header: "Id",
        accessor: "id"
      },
      { Header: "Etage",
        accessor: "etage"
      },
      // { Header: "localisation",
      //   accessor: d =>  ({latitude: d.gps_latitude,
      //                     longitude: d.gps_longitude,
      //                     elevation: d.gps_elevation
      //                   })
      // },
    ];

    if( plans.length === 0 || (plans.length === 1 && plans[0] === undefined ) ) {
      return (
        <div></div>
      );
    }

    return (
      <div>
        <ReactTable
          data={plans}
          noDataText="Pas de plan pour ce client"
          columns={columns}
          defaultPageSize={plans.length}
          showPagination={false}
          showPageJump={false}
          className="-striped -highlight"
          getTrProps={this.handleEventsOnPlan}
          SubComponent={ row => {
            return (<Plan id={row.original.id} />);
    
            // return (
            //   <img src={`http://test.ideesalter.com/alia_afficheImagePlan.php?id=${plan.id}`} alt={"étage " + plan.etage}/>
            // );
          }}
        />
        <br />
      </div>
    );
  }
}

