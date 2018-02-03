import React from 'react';
import * as d3 from "d3";
import $ from 'jquery'; 
import { window } from 'd3-selection';
import { PopupboxManager, PopupboxContainer } from 'react-popupbox';
import styles from "react-popupbox";

export class Plan extends React.Component {

    // Text Alignment : http://apike.ca/prog_svg_text_style.html
    // Display values on mouseover : https://bl.ocks.org/mbostock/3902569

    svgRef;
    imageRef;
    imageNode;
    gCapteurLegend;
    rectCapteurLegend;
    textCapteurLegend;
    refDivChart;

    constructor(props) {
        super(props);

        this.state = {
            planId: props.id,
            planImage: undefined,
            width: undefined,
            height: undefined,
            capteurs: []
        };
    }
                //   <img src={`http://test.ideesalter.com/alia_afficheImagePlan.php?id=${plan.id}`} alt={"étage " + plan.etage}/>

    getPlan = (id) => {
        if (!id) {
            return Promise.resolve({ plans: [] });
        }
    
        return fetch(`http://test.ideesalter.com/alia_afficheImagePlan.php?id=${this.state.planId}`)
            .then((response) => {
                return( response.text() );
            })
            .then((responseData) => {
                this.setState({planImage: responseData})
            }
        );
    }

    getCapteursForPlan = (planId) => {
        if (!planId) {
            return Promise.resolve({ capteurs: [] });
        }
    
        return fetch(`http://test.ideesalter.com/alia_searchCapteursForPlan.php?plan_id=${planId}`)
        .then((response) => response.json())
        .then((capteurs) => this.setState({capteurs: capteurs})
      );
      }

    componentDidMount() {
        this.getPlan(this.state.planId);
        this.getCapteursForPlan(this.state.planId);
    }

    getImageSize = (data) => {
        var i = new Image(); 
        i.onload = () => {
            if( this.state.width === undefined && this.state.height === undefined ) {
                this.setState({width: i.width,
                    height: i.height});
            }
        };
        i.src = data;
    }

    componentDidUpdate() {
        this.masqueLegendeCapteur();

        var image = d3.select(this.imageRef);

        image.attr("xlink:href", this.state.planImage)
            .attr('x', 0)
            .attr('y', 0);
        this.getImageSize(this.state.planImage);

        var transitionNewCapteur = d3.transition()
            .duration(3000)
            .ease(d3.easeElastic);

        // TRANSITIONS
        // ============
        // easeElastic
        // easeBounce
        // easeLinear
        // easeSin
        // easeQuad
        // easeCubic
        // easePoly
        // easeCircle
        // easeExp
        // easeBack

        var capteurs = d3.select(this.svgRef).selectAll("circle")
            .data(this.state.capteurs)
            .enter()
            .append("circle")
            .on("mouseover", this.afficheLegendeCapteur)
            .on("mouseout", this.masqueLegendeCapteur)
            .on("click", this.openPopupbox)
            .attr("cx", (capteur)=>capteur.coordonneePlanX)
            .attr("cy", (capteur)=>capteur.coordonneePlanY)
            .attr("r", 0)
            .attr("stroke", "black")
            .attr("strokeWidth", 1)
            .attr("fill", "white")
            .attr("opacity", 0)
            .transition(transitionNewCapteur)
                .attr("r", 10)
                .attr("opacity", 1);
    }

    afficheLegendeCapteur = (capteur) => {
        var x = parseInt(capteur.coordonneePlanX)+10;
        var y = parseInt(capteur.coordonneePlanY)-20;

        var transition = d3.transition()
            .duration(200)
            .ease(d3.easeLinear);

        d3.select(this.gCapteurLegend)
            .attr("transform", "translate("+x+","+y+")")
            .transition(transition)
            .attr("opacity", 1);
        d3.select(this.textCapteurLegend).text(capteur.capteur_reference_id);
    }

    masqueLegendeCapteur = () => {
        var transition = d3.transition()
            .duration(200)
            .ease(d3.easeLinear);

        d3.select(this.gCapteurLegend)
            .transition(transition)
            .attr("opacity", 0);
    }


    openPopupbox() {
        console.log("openPopupbox")
        // const content = <img url="/pages/tmp/fleur.jpg" />
        const content = (
          <div>
            <p className="quotes">Work like you don't need the money.</p>
            <p className="quotes">Dance like no one is watching.</p>
            <p className="quotes">And love like you've never been hurt.</p>
            <span className="quotes-from">― Mark Twain</span>
          </div>
        )
    PopupboxManager.open({
            content,
            config: {
                className: "popupbox-wrapper",
                overlayOpacity: 0.75,
                overlayClose: true,
                titleBar: {
                    //className: "",
                    enable: true,
                    text: 'Flower!',
                    closeButton: true,
                    //closeButtonClassName
                    closeText: 'x',
                    position: 'top'
                },
                // onOpen: callback,
                // onComplete: callback,
                // onCleanup: callback,
                // onClosed: callback
            }
        })
    }
    // openPopupbox() {
    //     const content = (
    //       <div>
    //         <p className="quotes">Work like you don't need the money.</p>
    //         <p className="quotes">Dance like no one is watching.</p>
    //         <p className="quotes">And love like you've never been hurt.</p>
    //         <span className="quotes-from">― Mark Twain</span>
    //       </div>
    //     )
    //     PopupboxManager.open({ content })
    //   }
    render() {
        return (
            <div className="container">
                <svg ref={(ref) => {this.svgRef = ref}} width={this.state.width} height={this.state.height}>
                    <image ref={(ref) => {this.imageRef = ref}}></image>
                    <g ref={(ref) => {this.gCapteurLegend = ref}} opacity="0">
                        <rect ref={(ref) => {this.rectCapteurLegend = ref}} x='0' y='0' width='100' height='14' fill="white" stroke="black" strokeWidth="1"/>
                        <text ref={(ref) => {this.textCapteurLegend = ref}} x='50' y='7' fontSize='11' textAnchor='middle' alignmentBaseline='middle' fill='black'>capteur</text>
                    </g>
                </svg>
                <div>
                    <PopupboxContainer />
                </div>
                {/* <div className="overlayGraph" ref={(ref) => {this.refDivChart = ref}} opacity='0'>
                </div> */}
            </div>
        );
    }
}
