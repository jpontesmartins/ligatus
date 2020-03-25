import React, { Component } from 'react';
import axios from "axios";
import grafo2 from './grafo.json';
import Graph from "react-graph-vis";
import { events, options } from "./grafoConfig";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      grafo: { nodes: [], edges: [] }
    }
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/graph")
      .then(response => {
        this.setState({ grafo: response.data });
      });
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

    return (
      <div style={containerGraph}>
        {teste}
        <Graph
          graph={grafo} 
          options={options} 
          events={events}
          style={{ height: "100%" }}  />


      </div>);
  }
}

export default App;
