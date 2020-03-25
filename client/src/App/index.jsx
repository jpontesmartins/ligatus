import React, { Component, Fragment } from 'react';
import axios from "axios";
import grafo2 from './grafo.json';
import Grafo from '../Grafo';

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
      .then(({ data }) => {
        this.setState({ grafo: data });
      });
  }

  render() {
    const { grafo } = this.state;
    return (
      <Grafo grafo={grafo} />
    );
  }
}

export default App;
