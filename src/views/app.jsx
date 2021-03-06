import { Elements } from "@augmentedjs/elements";
import Header from "./header.jsx";
import Main from "./main.jsx";

class App extends Elements.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <article>
        <Header/>
        <Main name="main" id="main"/>
      </article>
    );
  };

};

export default App;
