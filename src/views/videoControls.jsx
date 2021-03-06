import { Elements } from "@augmentedjs/elements";
import Processor from "../processor/processor.js";

class VideoControls extends Elements.Component {
  constructor(props) {
    super(props);
    this.processor = new Processor();
    this._themeCounter = 0;
    this._ditherToggle = false;

    this.state = { "play": false };
  };

  render() {
    return (
      <div className="buttonBar" id={this.props.id} name={this.props.name}>
        <button id="theme" onClick={this.changeTheme} title ="Theme" className="control"><i className="material-icons">color_lens</i></button>
        <button id="dither" onClick={this.changeDither} title="Dither" className="control"><i className="material-icons">gradient</i></button>
        <button id="play" onClick={this.playPause} title="Play / Pause" className="control">
          {
            (this.state.play !== true) ?
            <i x className="material-icons">pause</i> :
            <i y className="material-icons">play_arrow</i>
          }

        </button>
      </div>
    );
  };

  componentDidMount() {
    this._video = document.getElementById("videoPlayer");
    this._canvas = document.getElementById("canvas");
    this.processor.theme = Processor.WINTER;
    this.processor.dither = Processor.NO_DITHER;
    this.processor.doLoad(this._canvas, this._video);

    this._video.volume = 0.5;
  };

  changeTheme = (e) => {
    e.preventDefault();
    if (this._themeCounter === 0) {
      this.processor.theme = Processor.SUMMER;
      this._themeCounter++;
    } else if (this._themeCounter === 1) {
      this.processor.theme = Processor.TWEAKED;
      this._themeCounter++;
    } else if (this._themeCounter === 2) {
      this.processor.theme = Processor.MONOCHROME;
      this._themeCounter++;
    } else if (this._themeCounter === 3) {
      this.processor.theme = Processor.WINTER;
      this._themeCounter = 0;
    }
    return this;
  };

  changeDither = (e) => {
    e.preventDefault();
    if (this._ditherToggle) {
      this._ditherToggle = false;
      this.processor.dither = Processor.NO_DITHER;
    } else {
      this._ditherToggle = true;
      this.processor.dither = Processor.ORDERED;
    }
    return this;
  };

  playPause = (e) => {
    e.preventDefault();
    // const playButton = document.querySelector("button#play > i");
    // console.log(playButton);
    if (this._video.paused) {
      // if (playButton) {
      //   playButton.innerText = "play_arrow";
      // }
      this._video.play();
      this.setState({ "play": true });
    } else {
      this._video.pause();
      this.setState({ "play": false });
      // if (playButton) {
      //   playButton.innerText = "pause";
      // }
    }
    return this;
  };
};

export default VideoControls;
