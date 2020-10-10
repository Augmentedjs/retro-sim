import { Elements } from "@augmentedjs/elements";
import Video from "./video.jsx";
import VideoControls from "./videoControls.jsx";
import Monitor from "./monitor.jsx";
import MuteControl from "./muteControl.jsx";

class Main extends Elements.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <section className="main" id={this.props.id} name={this.props.name}>
        <Video />
        <VideoControls name="controls" id="controls"/>
        <Monitor name="monitor" id="monitor"/>
        <MuteControl name="mute" id="mute"/>
      </section>
    );
  };

};

export default Main;
