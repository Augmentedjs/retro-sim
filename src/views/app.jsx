import React from "react";
import Header from "./header.jsx";
import Main from "./main.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <article>
        <Header/>
        <Main/>
      </article>
    );
  };

};

export default App;
