import * as React from 'react';
import { momentToSql, dateWithoutSeconds } from '../../../utils/DateUtils';
import * as d3 from 'd3';
import { get_X, get_η, get_η_From_ηh_φ } from "../../../utils/CalculsThermiques"
import { GraphType } from '../Channel/GraphType';
export class TemperatureHumidity extends React.Component {

    mapValues = new Map();
    chartRef;
    referenceChartsHumidityRef;
    referenceChartsEnthalpieRef;
    referenceChartsTemperatureEnthalpieRef;
    xAxisRef;
    yAxisRef;
    currentCrosshairRef;

    channelXType;
    channelYType;
    scaleX;
    scaleY;

    datum = [];

    constructor(props) {
        super(props);
        this.chartWidth=this.props.chartWidth;
        this.chartHeight=this.props.chartHeight;
        this.capteurId=this.props.capteurId
        this.channelXType=this.props.channelXType; 
        this.channelYType=this.props.channelYType; 

        // configure ScaleX
        this.scaleX=d3.scaleLinear();
        this.scaleX.domain(this.channelXType.domain.slice().reverse());
        this.scaleX.range([0, this.chartWidth])
    
        // configure ScaleY
        this.scaleY=d3.scaleLinear();
        this.scaleY.domain([25, 0]);
        this.scaleY.range([0, this.chartHeight]);
    }

    componentWillReceiveProps(props) {
        var startDate = momentToSql(props.dateInterval.startDate);
        var stopDate = momentToSql(props.dateInterval.stopDate);

        if( startDate !== this.startDate || stopDate !== this.stopDate) {
            this.startDate = startDate;
            this.stopDate = stopDate;
            this.loadJsonFromAeroc(startDate, stopDate, props.channelX, props.channelY);
        }
        if( props.channelX !== this.props.channelX || props.channelY !== this.props.channelY ) {
            this.loadJsonFromAeroc(startDate, stopDate, props.channel1, props.channel2);
        }
        // if( props.currentHumidity !== this.props.currentHumidity || props.currentTemperature !== this.props.currentTemperature ) {

        // }
    }

    loadJsonFromAeroc = (dateBegin, dateEnd, channel1, channel2) => {
        // LOAD DATA from AEROC
        if(channel1 !== undefined && channel2 !== undefined) {

            // date_begin=2017/12/09 20:13:04&date_end=2018/01/24 21:19:06
            var httpReq = 'http://test.ideesalter.com/alia_searchCrossMesures.php?date_begin=' + dateBegin + '&date_end=' + dateEnd + '&capteur_id=' + this.capteurId + '&channel1_id=' + channel1.id + '&channel2_id=' + channel2.id;
            //console.log(httpReq);
            return fetch(httpReq)
                .then((response) => response.json())
                .then((data) => {

                    data.forEach((line) => {
                        var date = dateWithoutSeconds(line.date);
                        this.mapValues.set(date.getTime(), {x: line.channel1, y:line.channel2});
                        this.datum.push( {x: line.channel1, y: line.channel2} )
                    })
            
                    // var maxChannel1 = d3.max(this.datum, (d)=>{return d.x})
                    // var minChannel1 = d3.min(this.datum, (d)=>{return d.x})
                    // var maxChannel2 = d3.max(this.datum, (d)=>{return d.y})
                    // var minChannel2 = d3.min(this.datum, (d)=>{return d.y})

                    // this.scaleX.domain([minChannel1,maxChannel1]);
                    // this.scaleY.domain([minChannel2,maxChannel2]);

                    this.drawGraph();
                    this.drawXAxis();
                    this.drawYAxis();
                });
        }
    }


    lineFunction = d3.line()
    .x((d) => { return this.scaleX(d.x) })
    .y((d) => { return this.scaleY(get_X (d.x, d.y))})
    .curve(d3.curveLinear);
        // d3.curveLinear
        // d3.curveStep
        // d3.curveStepBefore
        // d3.curveStepAfter
        // d3.curveBasis
        // d3.curveCardinal
        // d3.curveMonotoneX
        // d3.curveCatmullRom

    drawReferenceCourbesHumidite = () => {
        for( var humidite = 0 ; humidite <= 100 ; humidite += 10) {
            var dataCourbeHumidite = [];
            for( var temperature = 0 ; temperature <= 60 ; temperature ++ ) {
                dataCourbeHumidite.push({x:temperature, y:humidite});
            }
            var currentCourbe = d3.select(this.referenceChartsHumidityRef).append("g")
            currentCourbe.datum(dataCourbeHumidite)
                .attr("class", "line")
                .append("path")
                .attr("d", this.lineFunction)
                .attr("fill", "none")
                .attr("stroke", "gray")
                .attr("stroke-width", 1);
            }
    }

    drawReferenceCourbesEnthalpie = () => {
        var x2=0;
        for( var h=0 ; h<=60 ; h+=2 ) {
            var η1 = h;
            var η2 = get_η(h, x2);
            var x1 = get_X(η1, 100);
            var x2 = 0;

            var currentCourbe = d3.select(this.referenceChartsEnthalpieRef).append("g")
            currentCourbe.append("line")
                .attr("x1", this.scaleX(η1))
                .attr("y1", this.scaleY(x1))
                .attr("x2", this.scaleX(η2))
                .attr("y2", this.scaleY(x2))
                .attr("stroke", "gray")
                .attr("strokeWidth", 1);
        }
    }

    drawReferenceCourbesTemperatureEnthalpie = () => {
        var x2=0;
        for( var ηh=0 ; ηh<=60 ; ηh+=2 ) {
            var η1 = ηh;
            var x1 = get_X(η1, 100);
            var η2 = get_η_From_ηh_φ(ηh, 0);
            var x2 = 0;

            var currentCourbe = d3.select(this.referenceChartsTemperatureEnthalpieRef).append("g")
            currentCourbe.append("line")
                .attr("x1", this.scaleX(η1))
                .attr("y1", this.scaleY(x1))
                .attr("x2", this.scaleX(η2))
                .attr("y2", this.scaleY(x2))
                .attr("stroke", "gray")
                .attr("strokeWidth", 1);
        }
    }


    drawGraph = (mapValues) => {
        d3.select(this.chartRef).selectAll("dots")
            .data(this.datum)
            .enter().append("circle")
                .attr("cx", (d) => this.scaleX(d.x))
                .attr("cy", (d) => this.scaleY(get_X (d.x, d.y)))
                .attr("r", 1)
                .attr("fill", "none")
                .attr("stroke", "pink")
                .attr("stroke-width", 1);
    };

    drawXAxis = () => {
        d3.select(this.xAxisRef)
            .call(d3.axisTop(this.scaleX).tickValues([0,5,10,15,20,25,30,35,40]))
            .selectAll("text");
            // .append("text")
            // .attr("fill", "black")
            // // .style("text-anchor", "middle")
            // // .attr("y", -9) 
            // .text(function(d) { return d });
    }
    drawYAxis = () => {
        d3.select(this.yAxisRef)
            .call(d3.axisLeft(this.scaleY).tickValues([0,5,10,15,20,25]))
            .selectAll("text");
            // .append("text")
            // .attr("fill", "black")
            // .style("text-anchor", "middle")
            // .attr("y", -9) 
            // .text(function(d) { return d });
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        this.drawReferenceCourbesHumidite();
        this.drawReferenceCourbesEnthalpie();
        this.drawReferenceCourbesTemperatureEnthalpie();
    }

    render() {
        return (
            <svg width={this.chartWidth} height={this.chartHeight}>
                <rect x='0' y='0' width={this.chartWidth} height={this.chartHeight} fill="white" stroke="black"/>
                <g>
                    <g ref={(ref) => {this.referenceChartsHumidityRef = ref}}/>
                    <g ref={(ref) => {this.referenceChartsEnthalpieRef = ref}}/>
                    <g ref={(ref) => {this.referenceChartsTemperatureEnthalpieRef = ref}}/>
                    <g ref={(ref) => {this.chartRef = ref}}/>
                    <g ref={(ref) => {this.xAxisRef = ref}} transform={'translate(0,'+this.chartHeight+')'}/>
                    <g ref={(ref) => {this.yAxisRef = ref}} transform={'translate('+this.chartWidth+', 0)'}/>
                    <g ref={(ref) => {this.currentCrosshairRef}} transform={'translate(' + this.scaleX(this.props.currentTemperature) + ',' + this.scaleY(get_X (this.props.currentTemperature, this.props.currentHumidity)) + ')'}>
                        <circle cx="0" cy="0" r="5" fill="red"/>
                    </g>
                </g>
            </svg>
        )
    }
}