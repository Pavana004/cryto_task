import React from "react"
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Crypto from "./components/Crypto";
import Cart from "./components/Cart";



function App() {
  return (
    <>
      <Router>

        <Route path="/" component={Crypto} exact/>
        <Route path="/cart" component={Cart} exact/>

      </Router>
    </>
  );
}

export default App;
