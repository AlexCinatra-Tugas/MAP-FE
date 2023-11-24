import React, { useRef, useState } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// import data from "../data/data.json";

const MapComp = () => {
  const mapRef = useRef();
  const initialPos = [-7.772297405953391, 110.37734234583341];
  // const initialPos = [-85.058981, 32.13674];

  const onCreate = (e) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON();
    console.log(coordinates);
  };

  return (
    <div className='h-full w-full rounded-lg overflow-hidden border-[5px] bg-white'>
      <MapContainer
        center={initialPos}
        zoom={20}
        scrollWheelZoom={false}
        ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <FeatureGroup>
          <EditControl
            position='topright'
            onCreated={onCreate}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapComp;
