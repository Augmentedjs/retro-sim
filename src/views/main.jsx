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
      <section className="main">
        <Video />
        <VideoControls />
        <Monitor />
        <MuteControl />
      </section>
    );
  };

};

export default Main;
