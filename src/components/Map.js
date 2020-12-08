import React from "react";
import "./Map.css";
import { Map, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { showDataOnMap } from "../util";
function TheMap({ center, countries, casesType, zoom }) {
  return (
    <div className="map">
      <MapContainer
        className="markercluster-map"
        center={[51.0, 19.0]}
        zoom={zoom}
        center={center}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default TheMap;
