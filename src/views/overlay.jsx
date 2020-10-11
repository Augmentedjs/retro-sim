import { Elements } from "@augmentedjs/elements";

class Overlay extends Elements.Component {
  constructor(props) {
    super(props);
    this.state = { "message": "" };
  };

  render() {
    return (
      <div className="overlay" id={this.props.id} name={this.props.name} onClick={this.overlay}>
        <h1>{this.state.message}</h1>
      </div>
    );
  };

  componentDidMount() {
    this._video = document.getElementById("videoPlayer");
  };

  overlay = (e) => {
    e.preventDefault();
    const time = this._video.currentTime;
    console.debug("time", time);
    if ((time >= 16 && time <= 18) || (time >= 38 && time <= 40)) {
      this.setState({ "message": "Dance!!!" });
    } else if (time <= 15 || (time >= 43 && time <= 61)) {
      this.setState({ "message": "RICK ROLL!!!" });
    } else {
      this.setState({ "message": "He will never give you up." });
    }

    setTimeout(() => {
      this.setState({ "message": "" });
    }, 2000);
    return this;
  };
};

export default Overlay;
