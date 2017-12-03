import * as React from "react";
import "./App.css";

const logo = require("./logo.svg");

class App extends React.Component {
    render() {
        console.log(this);
        return (
            <div className="App">
                <div className="header">
                    <img src={logo} className="logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
