export const options = {
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
  
  export const events = {
    select: function (event) {
      let { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    }
  };