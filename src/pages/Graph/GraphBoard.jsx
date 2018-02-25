import * as React from 'react';
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
import { GraphType } from './Channel/GraphType';

export class GraphBoard extends React.Component {

  topMargin=20;
  originGraphX=150;
  originGraphY=0;
  chartWidth=1270;
  chartHeight=200;
  interChart=20;
  crosshairValues = new Map();

  dateAxisRef;

  verticalCrosshairRef;
  verticalCrosshairLineRef;
  brushRef;
  globalBrushRef;

  brush = d3.brushX()
    .extent([[0, 0], [this.chartWidth, 1000]])
    .on("brush end", this.brushed);

  globalBrush = d3.brushX()
    .extent([[0, 0], [this.chartWidth, this.topMargin]])
    .on("brush end", this.globalBrushed);

  globalBrushed = () => {
    console.log("global brushed")
    var s = d3.event.selection || this.getTimeScale().range();
    //console.log(s);
    // x.domain(s.map(x2.invert, x2));
    // focus.select(".area").attr("d", area);
    // focus.select(".axis--x").call(xAxis);
    // svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
    //     .scale(width / (s[1] - s[0]))
    //     .translate(-s[0], 0));
  }

  brushed = () => {
    console.log("BRUSHED1");
    // var s = d3.event.selection || this.getTimeScale().range();
    // console.log(s);
    // d3.select(this.brushRef)
    // .call(this.brush)
    // .call(this.brush.clear());
    //.call(this.globalBrush.move, this.getTimeScale().range())

    //console.log(s);
    // x.domain(s.map(x2.invert, x2));
    // focus.select(".area").attr("d", area);
    // focus.select(".axis--x").call(xAxis);
    // svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
    //     .scale(width / (s[1] - s[0]))
    //     .translate(-s[0], 0));
  }


  constructor(props) {
    super(props);
    this.state = {
      capteur: this.props.capteur,
      channels: [],
      mapChannels: new Map(),
      jsonData: [],
      mapJsonData: new Map(),
      dateInterval: {
        startDate: moment(),
        stopDate: moment(),
        minDate: moment(),
        maxDate: moment()
      },
      crosshair: {
        verticalDisplayed: false,
        horizontalDisplayed: false,
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
      (data) => {
        var mapChannels = new Map();

        data.forEach((channel)=>{
          var graphType = GraphType.getGraphTypeFromMeasuretype(channel.measure_type);
          mapChannels.set(graphType, channel);
        })
        this.setState( {
          channels: data,
          mapChannels: mapChannels
        });
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
    d3.select(this.brushRef)
      .call(this.brush)
    d3.select(this.globalBrushRef)
      .call(this.globalBrush)
      .call(this.globalBrush.move, this.getTimeScale().range())
  }

  handleMouseEvents = (xMouse, yMouse, timeMs, dataTimeMs, eventType) => {
    switch(eventType) {
      case "mouseover":
      case "mousemove":
        this.setState({
          crosshair: {
            verticalDisplayed: true,
            horizontalDisplayed: true,
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
            verticalDisplayed: false,
            horizontalDisplayed: false,
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
    this.crosshairValues.set(graphType, y);
    // console.log("handle crosshairValues")
    switch(graphType) {
      case GraphType.HUMIDITE:
        this.setState( {
          currentHumidity:y
        });
        break;
      case GraphType.TEMPERATURE:
      this.setState( {
        currentTemperature:y
      });
      break;
    case GraphType.PRESENCE:
      case GraphType.LUMINOSITE:
      default:
    }
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

    return (
      <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <svg width="100%" height={svgHeight}>
                    <g transform={'translate(' + this.originGraphX + ',' + this.topMargin + ')'}>
                      <g ref={(ref) => {this.brushRef = ref}}/>
                      <Crosshair
                        displayVertical={this.state.crosshair.verticalDisplayed}
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
                                interChart={this.interChart} 
                                dateInterval={this.state.dateInterval} 
                                handleMouseEvents={this.handleMouseEvents} 
                                timeScale={this.getTimeScale()}
                                displayValue={this.state.displayValue}
                                xPosition={this.state.crosshair.xPosition}
                                yPosition={this.state.crosshair.yPosition}
                                handleSelectedValue={this.handleSelectedValue}
                              />
                            </g>
                          )
                        })
                      }
                    </g>
                    <g transform={'translate(' + this.originGraphX + ',0)'}>
                      <g ref={(ref) => {this.globalBrushRef = ref}}/>
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
                          <TemperatureHumidity chartWidth='340' chartHeight='300'
                            dateInterval={this.state.dateInterval}
                            capteurId={this.state.capteur.id}
                            channelX={this.state.mapChannels.get(GraphType.TEMPERATURE)} 
                            channelY={this.state.mapChannels.get(GraphType.HUMIDITE)} 
                            channelXType={GraphType.TEMPERATURE} 
                            channelYType={GraphType.HUMIDITE}
                            currentHumidity={this.state.currentHumidity}
                            currentTemperature={this.state.currentTemperature}
                        />
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
