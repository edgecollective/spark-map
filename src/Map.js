import React, { useRef, useEffect } from "react";

import { Map } from "react-leaflet";

import { CRS } from "leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";



export default () => {

  const mapRef = useRef(null);

  useEffect(() => {

    const map = mapRef.current.leafletElement;

    const w = 2438,
    h = 1464,
   // url = 'http://kempe.net/images/newspaper-big.jpg';
    url = './middle.jpg';

    const southWest = map.unproject([0, h], map.getMaxZoom()-1);
    const northEast = map.unproject([w, 0], map.getMaxZoom()-1);
    var bounds = new L.LatLngBounds(southWest, northEast);

    //const bounds = [[-26.5, -25], [1021.5, 1023]];
    
    const image = L.imageOverlay(
      url,
      bounds
    ).addTo(map);

    map.fitBounds(image.getBounds());

  }, []);



  return (

    <>

      <Map

        ref={mapRef}

        minZoom={0}

        crs={CRS.Simple}

        maxBoundsViscosity={1.0}

        boundsOptions={{ padding: [50, 50] }}

        style={{ height: "100vh" }}

      />

    </>

  );

};


