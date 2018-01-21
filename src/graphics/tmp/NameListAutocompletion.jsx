import React, { Component } from 'react';
import $ from 'jquery'; 
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export class NameListAutocompletion extends React.Component {

  state = {
    selectedOption: '',
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   searchValue: "",
    //   clients: [],
    //   selectedValue: undefined
    // };

    // this.handleTypeText.bind(this);
    // this.handleSelectClient.bind(this);
  }
  handleChange = (selectedOption) => {
    
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }


  handleTypeText(event) {
    // var nextState = this.state;
    // nextState.textSearch = event.target.value;
    // this.setState(nextState);
    var textSearch = event.target.value;
    if( textSearch != "" ) {

      $.getJSON('http://test.ideesalter.com/alia_searchClient.php?nom=' + event.target.value, function(data) {
        var clients = [];
        data.forEach(client => {
          clients.push(client);
        });
        this.setState({
          searchValue: this.state.searchValue,
          clients: clients,
          selectedValue: (clients.length > 0)?clients[0].id:this.state.selectedValue
        })
      }.bind(this));
    }
  }

  handleSelectClient() {
    //console.log("handleSelectClient");
  }
  componentDidUpdate() {
    // if( this.state.clients.length != 0) {
    //   //this.refs.fieldselect.open();
    // }
  }

  render() {
    // console.log("clients " + this.state.clients);
    // this.state.clients.map(client => {
    //   console.log(client.id + " - " + client.nom);
    // });
    // let optionTemplate = this.state.clients.map(client => {
    //   return {}
    //   //{client.id} value={client.id}>{client.nom}</option>
    // });

  	const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
 //   return (

      /*
      <label>
        <input ref="fieldInput" type="text" value={this.state.searchValue.nom} onChange={this.handleTypeText.bind(this)}></input>
        <select isOpen="true" ref="fieldselect" value={this.state.selectedValue} onChange={this.handleSelectClient}>
          {optionTemplate}
        </select>
      </label>
    */
//    );
  
    return (
      <Select
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
        ]}
      />
    );
  }
}
