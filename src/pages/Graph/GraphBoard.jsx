import React, { Component } from 'react';
import $ from 'jquery'; 
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GraphChannel } from './Channel/GraphChannel';
import * as d3 from 'd3';
import { Crosshair } from './Crosshair';
import { TemperatureHumidity } from './CrossGraph/TemperatureHumidity';
import { LuminosityTemperature } from './CrossGraph/LuminosityTemperature';

export class GraphBoard extends Component {

  topMargin=20;
  originGraphX=150;
  originGraphY=0;
  chartWidth=1270;
  chartHeight=200;
  interChart=20;

  dateAxisRef;

  verticalCrosshairRef;
  verticalCrosshairLineRef;


  constructor(props) {
    super(props);
    this.state = {
      capteur: this.props.capteur,
      channels: [],
      jsonData: [],
      mapJsonData: new Map(),
      dateInterval: {
        startDate: moment(),
        stopDate: moment(),
        minDate: moment(),
        maxDate: moment()
      },
      crosshair: {
        verticalDisplayed: "none",
        horizontalDisplayed: "none",
        xPosition: 0,
        yPosition: 0
      },
      displayValue: {
        display: false,
        dataTimeMs: undefined,
        timeMs: undefined,
  }
};
    this.loadCapteurChannels();
    this.getDateInterval(this.state.capteur.id)

    // CAPTEUR : {
    //   capteur_reference_id:"AEO_ZW100"
    //   coordonneePlanX:"500"
    //   coordonneePlanY:"300"
    //   coordonneePlanZ:"100"
    //   id:"1"
    //   plan_id:"1"
    // }
  }

  loadCapteurChannels = () => {

    $.getJSON('http://test.ideesalter.com/alia_searchChannelsFromCapteur.php?capteur_reference_id=' + this.state.capteur.capteur_reference_id,
      (data) => { this.setState( {channels: data} );
    });
  }

  getDateInterval = (id) => {
    if (!id) {
      return Promise.resolve({ dateInterval: {startDate: undefined, stopDate: undefined} });
    }
    return fetch(`http://test.ideesalter.com/alia_searchDateIntervalMissionForCapteur.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {

        var minDate = new moment(data.minDate);
        var maxDate = new moment(data.maxDate);

        this.setState({
          dateInterval: {
            startDate: minDate,
            stopDate: maxDate,
            minDate: minDate,
            maxDate: maxDate
          }
        })
      }
    );
  }

  handleChangeStartDate = (date) => {
    var newState = this.state;
    newState.dateInterval.startDate = date;
    this.setState( newState );
  }
  
  handleChangeStopDate = (date) => {
    var newState = this.state;
    newState.dateInterval.stopDate = date;
    this.setState( newState );
  }

  componentDidMount() {
  }

  handleMouseEvents = (xMouse, yMouse, timeMs, dataTimeMs, eventType) => {
    switch(eventType) {
      case "mouseover":
      case "mousemove":
        this.setState({
          crosshair: {
            verticalDisplayed: null,
            horizontalDisplayed: null,
            xPosition: xMouse,
            yPosition: yMouse
          },
          displayValue: {
            display: true,
            dataTimeMs: dataTimeMs,
            timeMs: timeMs,
          }
        })
        break;
      case "mouseout":
        this.setState({
          crosshair: {
            verticalDisplayed: "none",
            horizontalDisplayed: "none",
            xPosition: xMouse,
            yPosition: yMouse
          },
          displayValue: {
              display: false,
              dataTimeMs: dataTimeMs,
              timeMs: timeMs,
            }
        });
        break;

      case "click":
      case "dblclick":
      default:
        break;
    }
  }

  handleSelectedValue = (graphType, y) => {

  }

  getTimeScale = () => {
    var domain = [this.state.dateInterval.startDate.toDate(), this.state.dateInterval.stopDate.toDate()];
    var chartWidth=1270;
    var range = [0, chartWidth];

    return d3.scaleTime().domain(domain).range(range);
  }

  drawDateAxis = () => {
    d3.select(this.dateAxisRef)
      .attr("transform", "translate(" + this.originGraphX + ",0)")
      .call(d3.axisTop(this.getTimeScale())
              .tickFormat(d3.timeFormat("%d/%m/%Y"))
              //.ticks(d3.timeHour.every(24))
            )
      .selectAll("text")	
  }

  componentDidUpdate() {
    this.drawDateAxis();
  }

  render() {

    var svgHeight = this.state.channels.length * this.chartHeight
      + (this.state.channels.length-1) * this.interChart + 200;

    console.log(this.state.channels);

    return (
      <div pointerEvents="all">
          <table>
            <tbody>
              <tr>
                <td width="100%">
                  <svg width="100%" height={svgHeight}>
                    <g transform={'translate(' + this.originGraphX + ',' + this.topMargin + ')'}>
                      <Crosshair displayVertical={this.state.crosshair.verticalDisplayed}
                        displayHorizontal={this.state.crosshair.horizontalDisplayed}
                        top={0}
                        bottom={1000}
                        left={this.originGraphX}
                        right={this.originGraphX + this.chartWidth}
                        xPosition={this.state.crosshair.xPosition}
                        yPosition={this.state.crosshair.yPosition}/>
                    </g>
                    <g transform={'translate(0,' + this.topMargin + ')'}>
                      <g ref={(ref) => {this.dateAxisRef = ref}}></g>
                      {
                        this.state.channels.map((data, index) => {
                          var originy = index * (this.chartHeight + this.interChart);
                          return (
                          
                            <g key={data.id} transform={"translate(0," + originy + ")"}>
                              <GraphChannel originGraphX={this.originGraphX} 
                                originGraphY={this.originGraphY} 
                                chartWidth={this.chartWidth} 
                                chartHeight={this.chartHeight} 
                                capteurId={this.state.capteur.id}
                                channelData={data} 
                                chartIndex={index} 
                                chartHeight={this.chartHeight} 
                                dateInterval={this.state.dateInterval} 
                                handleMouseEvents={this.handleMouseEvents} 
                                timeScale={this.getTimeScale()}
                                displayValue={this.state.displayValue}
                                xPosition={this.state.crosshair.xPosition}
                                yPosition={this.state.crosshair.yPosition}
                                handleSelectedValue={this.handleSelectedValue}/>
                            </g>
                          )
                        })
                      }
                    </g>
                  </svg>
                </td>
                <td width="50px" className="align-top">
                  <table align="center">
                  <tbody>
                    <tr>
                      <td>
                        <DatePicker
                          selected={this.state.dateInterval.startDate}
                          onChange={this.handleChangeStartDate}
                          minDate={this.state.dateInterval.minDate}
                          maxDate={this.state.dateInterval.maxDate}
                          dateFormat='DD/MM/YYYY'
                          placeholderText="Date de début"/>
                      </td>
                      <td>
                        <DatePicker
                          selected={this.state.dateInterval.stopDate}
                          onChange={this.handleChangeStopDate}
                          minDate={this.state.dateInterval.minDate}
                          maxDate={this.state.dateInterval.maxDate}
                          dateFormat='DD/MM/YYYY'
                          placeholderText="Date de fin"/>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan='2'>
                          <TemperatureHumidity chartWidth='100%' chartHeight='300'/>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan='2'>
                          <LuminosityTemperature chartWidth='100%' chartHeight='300'/>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    );

  }
}