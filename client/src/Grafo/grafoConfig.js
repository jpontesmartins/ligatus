export const options = {
    layout: {
      hierarchical: {
        enabled: true,
        direction: "LR",
        sortMethod: "directed",

      }
      
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