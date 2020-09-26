import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login, Dashboard } from './containers';
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
