import React from "react";

class Video extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <video id="videoPlayer" playsInline controls={true} muted="muted" width="320" height="200" crossOrigin="anonymous">
        <source src="/video" type="video/mp4"></source>
      </video>
    );
  };
};

export default Video;
