import * as React from 'react';
import { dateWithoutSeconds } from '../../../utils/DateUtils';

export class TemperatureHumidity extends React.Component {

    mapValues = new Map();
    chartRef;

    constructor(props) {
        super(props);
        this.chartWidth=this.props.chartWidth;
        this.chartHeight=this.props.chartHeight;

        date_begin
        date_end
        capteur_id
        channel1_id
        channel2_id
    }

    loadJsonFromAeroc = (capteurId, channel1Id, channel2Id, dateBegin, dateEnd) => {
        // LOAD DATA from AEROC

        // date_begin=2017/12/09 20:13:04&date_end=2018/01/24 21:19:06
        var httpReq = 'http://test.ideesalter.com/alia_searchCrossMesures.php?date_begin=' + dateBegin + '&date_end=' + dateEnd + '&capteur_id=' + capteurId + '&channel1_id=' + channel1Id + '&channel2_id=' + channel2Id
        //console.log(httpReq);
        return fetch(httpReq)
            .then((response) => response.json())
            .then((data) => {

                data.forEach((line) => {
                    var date = dateWithoutSeconds(line.date);
                    this.mapValues.set(date.getTime(), {x: line.channel1, y:line.channel2});
                })

                this.drawGraph(this.mapValues);
                this.drawTimeAxis();
            });
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <svg width={this.chartWidth} height={this.chartHeight}>
                <rect x='0' y='0' width={this.chartWidth} height={this.chartHeight} fill="red" stroke="black"/>
                <g ref={(ref) => {this.chartRef = ref}}/>
            </svg>
        )
    }
}