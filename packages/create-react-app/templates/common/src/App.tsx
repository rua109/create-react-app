import React from "react";

import logo from "./logo.svg";
<%_ if (options.usesTailwind) { -%>
import "./tailwind.css";
<%_ } -%>
import "./App.css";

/**
 * start
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <%_ if (options.usesTailwind) { -%>
        <h1 className="text-3xl font-thin underline">Hello world!</h1>
        <%_ } -%>
      </header>
    </div>
  );
}

export default App;
