import React, { Component } from 'react';
import Graph from "react-graph-vis";
import './styles.css';

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: {
      color: '#848484',
      highlight: '#848484',
      hover: '#848484',
      inherit: 'from'
    },
    smooth: {
      enabled: true,
      type: "dynamic",
      roundness: 0.5
    }
  },
  physics: {
    barnesHut: {
      damping: 1,
      avoidOverlap: 0.1
    },
    minVelocity: 0.75
  }

};

const events = {
  select: function (event) {
    var { nodes, edges } = event;
    console.log("Selected nodes:");
    console.log(nodes);
    console.log("Selected edges:");
    console.log(edges);
  }
};

class Grafo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      grafo: this.props.grafo
    }
  }

  render() {
    const {
      grafo
    } = this.state;

    return (
      <div className="container-graph">
        <Graph graph={grafo} options={options} events={events}
          style={{ height: "100%" }} />
      </div>
    );
  }
}

export default Grafo;
