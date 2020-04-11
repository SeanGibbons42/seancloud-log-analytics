import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";


class DonutChart extends Component{
    constructor(props){
        super(props);

        this.state = {width: 0, height: 0};
        //use a ref to allow access to parent div!
        this.pieRef = React.createRef();
        this.createChart = this.createChart.bind(this);
    }

    componentDidMount(){
        let width = this.getWidth();
        let height = this.getHeight();
        this.setState({width:width, height:height}, ()=>this.createChart());
        
        let resizedFn;
        //On resize, wait a little bit before re-rendering the chart
        window.addEventListener("resize", () => {
            clearTimeout(resizedFn);
            resizedFn = setTimeout(() => {
                this.redrawChart();
            }, 200);
        });
    }

    redrawChart(){
        let width = this.getWidth();
        this.setState({width:width});
        d3.select(".pieChart svg").remove();

        this.createChart = this.createChart.bind(this);
        this.createChart()
    }

    // componentDidUpdate(){
    //     this.createChart();
    // }

    getHeight(){
        return this.pieRef.current.offsetHeight;
    }

    getWidth(){
        return this.pieRef.current.offsetWidth;
    }

    createChart(){
        //grab chart data and dimensions from component properties 
        const data = this.props.data;
        const figwidth = this.state.width;
        const figheight = this.state.height;

        const pierad = Math.min(figwidth/4, figheight/2);

        //construct the color map
        const colors = ["#E9724C", "#FFC857", "#5FAD56", "#255F85", "#C5283D"];
        const colorScale = d3.scaleOrdinal()
            .domain(data)
            .range(colors)
        
        //construct angular scale based on values
        const pieScale = d3.pie()
            .value(d => d.value)
        
        const plotdata = pieScale(d3.entries(data));
        
        //create the chart object
        let plotbox = d3.select(".pieChart")
            .append("svg")
                .attr("width", figwidth)
                .attr("height", figheight)
        .append("g")
            .attr("transform", "translate("+pierad*3+", "+figheight/2+")")

        //add arcs to the plot
        plotbox.selectAll('arcs')
            .data(plotdata)
            .enter()
                .append("path")
                    .attr("d", d3.arc()
                        .innerRadius(pierad-25)
                        .outerRadius(pierad)
                    )
                .attr("fill", d=>colorScale(d.data.key))
                .on("mouseover", function(){
                    d3.select(this).style("opacity", 0.5)
                })
                .on("mouseout", function(){
                    d3.select(this).style("opacity", 1)
                })
        
        //position scale for legend entries
        let legendMargin = (figheight - pierad*2) / 2;
        const legendScale = d3.scaleBand()
            .domain(d3.keys(data))
            .range([legendMargin, figheight-legendMargin])
            .padding(0.1)
        
        //define containers for each legend entries
        let legend = d3.select(".pieChart svg")
            .selectAll("legend-entry")
            .data(d3.keys(data))
            .enter()
                .append("g")
                    .attr("transform", (d)=>"translate(20,"+legendScale(d)+")")
                    .attr("height", legendScale.bandwidth())
                    .attr("width", 100)
        
        // add color coded markers to the entries
        let entryheight = legendScale.bandwidth() 
        let markersize = legendScale.bandwidth()/2;
        legend.append("rect")
            .attr("width", markersize)
            .attr("height", markersize)
            .attr("y", (entryheight-markersize)/2)
            .attr("fill", (d) => colorScale(d))
            .attr("rx", 3)
            .attr("ry", 3);
        
        // add the text labels
        legend.append("text")
            .attr("x", markersize+10)
            .attr("y", entryheight/2)
            .attr("alignment-baseline", "central")
            .style("text-anchor", "start")
            .style("font-size", 15)
            .style("font-family", "Raleway")
            .text( (d)=>d );
            
    }
    render(){
        return(
            <div className="pieChart card-content" ref={this.pieRef}>  </div>
        );
    }
}

export default DonutChart;
