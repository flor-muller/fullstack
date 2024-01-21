import React, { Component } from "react";

class LimiteError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haOcurridoError: false,
      error: null,
      infoError: null
    };
  }

  componentDidCatch(error, infoError) {
    this.setState({
      haOcurridoError: true,
      error: error,
      infoError: infoError
    });
  }

  render() {
    if (this.state.haOcurridoError) {
      return (
        <div>
          <h1>OOPS!! Algo salió mal.</h1>
          <p>{this.state.error.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default LimiteError;

