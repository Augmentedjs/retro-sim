import { Elements } from "@augmentedjs/elements";

class Monitor extends Elements.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="monitor" id={this.props.id} name={this.props.name}>
        <canvas id="canvas" width="320" height="200"></canvas>
      </div>
    );
  };
};

export default Monitor;
