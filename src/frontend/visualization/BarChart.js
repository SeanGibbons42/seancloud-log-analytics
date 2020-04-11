import React, {Component} from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

class BarChart extends Component{
    constructor(props){
        super(props);
        this.state = {width:0, height:0};

        this.chartRef = React.createRef();
        this.createChart = this.createChart.bind(this);
    }

    getHeight(){
        return this.chartRef.current.offsetHeight;
    }

    getWidth(){
        return this.chartRef.current.offsetWidth;
    }

    componentDidMount(){
        const height = this.getHeight();
        const width  = this.getWidth();

        this.setState({width: width, height:height}, () => this.createChart());
        
        let resizedFn;
        window.addEventListener("resize", () => {
            //if an render is already queued, we want to replace it with the latest dimensions.
            clearTimeout(resizedFn);

            //resize using redraw chart after 200ms
            resizedFn = setTimeout(()=>{
                this.redrawChart();
            }, 200);
        });
    }

    redrawChart(){
        // const height = this.getHeight();
        const width = this.getWidth();
        this.setState({height: height, width: width});

        // yeet the old chart off the DOM and draw the new version
        d3.select(".barChart svg").remove();
        this.createChart = this.createChart.bind(this);
        this.createChart();
    }

    createChart(){
        const margin = {top: 10, bottom: 30, left: 20, right: 10};
        const incCol = "#0bc208";
        const decCol = "#cc3535";
        
        //data array and data used for building plot [Time period names and max traffic]
        const data = this.props.data;
        const keys = data.map( (d) => d.period );
        const max  = d3.max( data.map( (d) => d.traffic ) );

        //container dims
        const height = this.state.height;
        const width = this.state.width;

        //graphic dims [minus margins]
        const figheight = height - margin.top - margin.bottom;
        const figwidth = width - margin.left - margin.right;

        //define scale maps
        const xscale = d3.scaleBand()
            .domain(keys)
            .range([margin.left, margin.left + figwidth])
            .padding(0.4)

        const yscale = d3.scaleLinear()
            .domain([0, max + max*0.1])
            .range([margin.top + figheight, margin.top])
        
        // define axis ticks and labels
        let xaxis = d3.axisBottom(xscale);
        let yaxis = d3.axisLeft(yscale);
        
        // make a chart!        
        let plotBox = d3.select(".barChart")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
            .append("g")
                .attr("transform", "translate("+margin.left+","+margin.right+")");
        
        plotBox.append("g")
            .attr("class", "xaxis")
            .attr("transform", `translate(0,${ figheight+margin.top })`)
            .call(xaxis)
        
        plotBox.append("g")
            .attr("class", "yaxis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(yaxis)

        plotBox.selectAll("bars")
            .data(data)
            .enter()
                .append("rect")
                    .attr("x", (d) => xscale(d.period))
                    .attr("y", (d) => yscale(d.traffic))
                    .attr("width", xscale.bandwidth())
                    .attr("height", (d) => yscale(0) - yscale(d.traffic) )
                    .style("fill", incCol)
    }


    render(){
        return(
            <div className = "barChart card-content" ref = {this.chartRef}>  </div>
        );
    }
}

export default BarChart