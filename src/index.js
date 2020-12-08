import React from "react";

import ReactDOM from "react-dom";

import "leaflet/dist/leaflet.css";

import Map from "./Map";

import "./styles.css";



function App() {

  return <Map />;

}



const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);


