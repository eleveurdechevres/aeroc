import * as d3 from "d3";

const GraphType = {
    PRESENCE: {
      svgClass: "presence",
      svgContextClass: "presenceContext",
      domain: [1.2, -0.2],
      tickValues: [0, 1],
      scaleFunction: d3.scaleLinear(),
      color: 'purple',
      background: 'lavender'
    },
    TEMPERATURE: {
      svgClass: "temperature",
      svgContextClass: "temperatureContext",
      domain: [30, 10],
      tickValues: [15, 20, 25],
      scaleFunction: d3.scaleLinear(),
      color: 'red',
      background: 'lavender'
    },
    HUMIDITE: {
      svgClass: "humidite",
      svgContextClass: "humiditeContext",
      domain: [70, 40],
      tickValues: [45, 50, 55, 60, 65],
      scaleFunction: d3.scaleLinear(),
      color: 'darkblue',
      background: 'lavender'
    },
    LUMINOSITE: {
      svgClass: "luminosite",
      svgContextClass: "luminositeContext",
      // domain:[1000, 0.1],
      // tickValues: [1, 10, 100],
      // scaleFunction: d3.scaleLog(),
      domain:[1000, 0],
      tickValues: [100, 500, 900],
      scaleFunction: d3.scaleLinear(),
      color: 'yellow',
      background: 'darkgray',
    }
  };

export default GraphType;