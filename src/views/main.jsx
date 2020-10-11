import { Elements } from "@augmentedjs/elements";
import Video from "./video.jsx";
import VideoControls from "./videoControls.jsx";
import Monitor from "./monitor.jsx";
import MuteControl from "./muteControl.jsx";
import TimeControls from "./timeControls.jsx";
import Overlay from "./overlay.jsx";

class Main extends Elements.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <section className="main" id={this.props.id} name={this.props.name}>
        <Video />
        <VideoControls name="controls" id="controls"/>
        <Overlay name="overlay" id="overlay" />
        <Monitor name="monitor" id="monitor"/>
        <MuteControl name="mute" id="mute"/>
        <TimeControls name="time" id="time"/>
      </section>
    );
  };

};

export default Main;
