import "./App.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import React, { useState } from "react";

function App() {

  const [signal] = useState([
    [5,10,3,2,4,5,2],[5,2,3,2,5,5,2],[5,2,20,2,5,5,2]
  ]);

  const [markers, setMarkers] = useState([
    { lat: 51.505, lng: -0.09 },
    { lat: 51.525, lng: -0.09 },
    { lat: 51.535, lng: -0.08 },
  ]);


  const [center, setCenter] = useState({ lat: 51.505, lng: -0.09 });

  function addMarker(newMarker) {
    setMarkers(markers.concat(newMarker));
  }

  function deleteMarker(index) {
    const newMarkers = [].concat(markers);
    newMarkers.splice(index, 1);
    setMarkers(newMarkers);
  }

  function centerMarker(index) {
    console.log(index);
    console.log(markers[index]);
    setCenter(markers[index]);
  }

  return (
    <div className="App">
      <div className="wrapper">
 {/*      <PollSidebar
          markers={markers}
          addMarker={addMarker}
          deleteMarker={deleteMarker}
          centerMarker={centerMarker}
        /> */}
        <SparklineSidebar
         signal={signal}
        />
        <PollMap
          markers={markers}
          center={center}
          centerMarker={centerMarker}
        />
      </div>
    </div>
  );
}

function PollMap(props) {
  const { markers, center, centerMarker } = props;

  return (
    <Map center={[center.lat, center.lng]} zoom={13} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((m, i) => (
        // onClick={centerMarker.bind(this,i)}
        <Marker
          position={[m.lat, m.lng]}
          key={`${m.lat}${m.lng}`}
          onClick={() => {
            centerMarker(i);
          }}
        >
          <Popup>
            A pretty CSS3 popup.
            <br />
            Easily customizable.
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}

function SparklineSidebar(props) {
  const { signal } = props
  return (
    <div className="sidebar">
     <Sparklines data={signal[0]}>
  <SparklinesLine color="blue" />
</Sparklines>
<Sparklines data={signal[1]}>
  <SparklinesLine color="red" />
</Sparklines>
<Sparklines data={signal[2]}>
  <SparklinesLine color="green" />
</Sparklines>
      </div>
    );
      
}

function PollSidebar(props) {
  const { markers, addMarker, deleteMarker, centerMarker } = props;
  const [lngInput, setLngInput] = useState("");
  const [latInput, setLatInput] = useState("");

  function addNewMarker() {
    addMarker({ lat: latInput, lng: lngInput });
  }

  return (
    <div className="sidebar">
      <ul>
        {markers.map((m, i) => (
          <li
            key={`${m.lat}${m.lng}`}
            onClick={() => {
              centerMarker(i);
            }}
          >
            Lat: {m.lat}, Long: {m.lng}{" "}
            <button onClick={deleteMarker.bind(this, i)}>x</button>
          </li>
        ))}
      </ul>
      <div>
        Lat: <input onChange={(event) => setLatInput(event.target.value)} />
        Lng: <input onChange={(event) => setLngInput(event.target.value)} />
      </div>
      <button onClick={addNewMarker}>Add Marker</button>
    </div>
  );
}

export default App;
