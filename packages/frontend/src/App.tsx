import React, { ReactElement } from "react";

// @ts-expect-error TODO: set logo
import logo from "./logo.svg";
import "./App.css";

// eslint-disable-next-line @typescript-eslint/naming-convention
function App(): ReactElement {
  return (
    <div className="App">
      <header className="App-header">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
