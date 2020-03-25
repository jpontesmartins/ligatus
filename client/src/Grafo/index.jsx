import React, { Component, Fragment } from 'react';
import Graph from "react-graph-vis";
import { events, options } from "./grafoConfig";

class Grafo extends Component {

  constructor(props) {
    super(props);
    console.log("[grafo] constructor");

    this.state = {
      grafo: this.props.grafo
    }
  }

  componentDidUpdate = (prevProps) => {
      if (prevProps.grafo !== this.props.grafo) {
          this.setState({grafo: this.props.grafo });
      }
  }

  render() {
    const { grafo, teste } = this.state;

    const containerGraph = {
        backgroundColor: "#FFF",
        marginBottom: "10px",
        width: "700px",
        height: "500px",
        marginTop: "25px",
        marginLeft: "50px",
        boxShadow: "0 4px 8px 0 #444"
    }

    const graphStyle = { height: "100%" };
    
    const container = {
        backgroundColor: "#FFF",
        marginBottom: "10px",
        width: "700px",
        height: "500px",
        marginTop: "25px",
        marginLeft: "50px",
        boxShadow: "0 4px 8px 0 #444"
    }
    
    return (
      <Fragment>
          <div style={container}>
            <Graph
                graph={grafo} 
                options={options} 
                events={events}
                style={graphStyle}  />
          </div>
      </Fragment>);
  }
}

export default Grafo;