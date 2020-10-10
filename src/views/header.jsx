import { Elements } from "@augmentedjs/elements";

class Header extends Elements.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <section className="header" id={this.props.id} name={this.props.name}>
        <header>
          <h1>Video Retro Simulator</h1>
        </header>
      </section>
    );
  };
};

export default Header;
