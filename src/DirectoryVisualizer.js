import React, { Component } from "react";
import "./App.css";
import getDirectory from "./API";
import loader from "./img/dappNodeAnimation.gif";
import directoryFake from "./directoryFake.json";
import img from "./img/logo.svg";

class DirectoryVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      directory: directoryFake
      // directory: []
    };
  }

  // componentDidMount() {
  //   console.log("hola me he montado ");
  //   this.setState({ loading: true });
  //   getDirectory().then(directory => {
  //     console.log(directory);
  //     this.setState({ loading: false, directory });
  //   });
  // }

  render() {
    console.log(this.state);
    if (this.state.loading) {
      // the directory is loading
      return <img src={loader} alt="loader" />;
    } else {
      // directory has loaded
      return (
        <div>
          {this.state.directory.map(pkg => (
            <details>
              <summary>{pkg.name}</summary>
              {Object.keys(pkg.versions).map(version => (
                <details>
                  <summary>{version}</summary>
                  <p>{JSON.stringify(pkg.versions[version], null, 2)}</p>
                </details>
              ))}
            </details>
          ))}
        </div>
      );
    }
  }
}

export default DirectoryVisualizer;
