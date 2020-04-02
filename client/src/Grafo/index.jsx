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
    const { grafo } = this.state;

    const graphStyle = { height: "100%" };
    
    const container = {
        backgroundColor: "#FF",
        height: "90vh",
        boxShadow: "0 2px 8px 0 #444",
        margin: "10px"
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