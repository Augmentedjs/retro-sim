import { Elements } from "@augmentedjs/elements";
import rick from "../images/favicon-16x16.png";

class TimeControls extends Elements.Component {
  constructor(props) {
    super(props);
    this.state = { "mute": false };
  };

  render() {
    return (
      <div className="buttonBar bottom" id={this.props.id} name={this.props.name}>
        <button onClick={this.rick} title="Rick" className="primary">
          <img src={ rick } alt="Rick" />
        </button>
        <button onClick={this.girl} title="Girl" className="secondary">
          <i className="material-icons">person</i>
        </button>
      </div>
    );
  };

  componentDidMount() {
    this._video = document.getElementById("videoPlayer");
  };

  rick = (e) => {
    e.preventDefault();
    this._video.currentTime = 6;
    this._video.play();
    setTimeout(() => {
      this._video.pause();
    }, 1700);
    return this;
  };

  girl = (e) => {
    e.preventDefault();
    this._video.currentTime = 16;
    this._video.play();
    setTimeout(() => {
      this._video.pause();
    }, 1700);
    return this;
  };
};

export default TimeControls;
