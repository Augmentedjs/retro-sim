import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <section className="header">
        <header>
          <h1>Video Retro Simulator</h1>
        </header>
      </section>
    );
  };
};

export default Header;
