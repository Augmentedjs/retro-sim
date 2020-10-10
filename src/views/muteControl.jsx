import { Elements } from "@augmentedjs/elements";

class MuteControl extends Elements.Component {
  constructor(props) {
    super(props);
    this.state = { "mute": false };
  };

  render() {
    return (
      <div className="buttonBar bottom" id={this.props.id} name={this.props.name}>
        <button id="mute" onClick={this.mute} title="Mute" className="primary">
          { (this.state.mute === false) ?
            <span><i className="material-icons">volume_mute</i>&nbsp;Mute</span> :
            <span><i className="material-icons">volume_up</i>&nbsp;Unmute</span>
          }
        </button>
      </div>
    );
  };

  componentDidMount() {
    this._video = document.getElementById("videoPlayer");
    this._video.muted = false;
  };

  mute = (e) => {
    e.preventDefault();
    if (this._video.muted) {
      this._video.muted = false;
      this.setState({ "mute": false });
    } else {
      this._video.muted = true;
      this.setState({ "mute": true });
    }
    return this;
  };
};

export default MuteControl;
