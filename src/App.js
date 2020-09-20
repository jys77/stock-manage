import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Login } from "./containers/Login";
import { Dashboard } from "./containers/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
