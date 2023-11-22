import React, { useRef, useState } from "react";
import {
  TileLayer,
  FeatureGroup,
  MapContainer,
  Popup,
  Marker,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const MapComp = () => {
  const showsomething = (e) => {
    console.log(e);
  };
  const position = [-7.772297405953391, 110.37734234583341];

  return (
    // edit width di sini
    <div className='h-full w-full rounded-lg p-1 overflow-hidden border-[5px]'>
      <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <FeatureGroup>
          <EditControl
            position='topright'
            onCreated={showsomething}
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
