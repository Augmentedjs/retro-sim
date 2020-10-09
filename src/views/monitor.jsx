import React from "react";

class Monitor extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="monitor">
        <canvas id="canvas" width="320" height="200"></canvas>
      </div>
    );
  };
};

export default Monitor;
