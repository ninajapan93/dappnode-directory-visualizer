import React, { Component } from "react";
import "./App.css";
import DirectoryVisualizer from "./DirectoryVisualizer";
import logo from "./img/logo.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <img src={logo} width="200" style={{ padding: "7px 0px" }} />
          </div>
        </header>
        <section className="container">
          <h3 className="mt-2">Directory visualizer</h3>
        </section>
        <div className="horizontal-line" />
        <section className="container mt-2">
          <DirectoryVisualizer />
        </section>
      </div>
    );
  }
}

export default App;
