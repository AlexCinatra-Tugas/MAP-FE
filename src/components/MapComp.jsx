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

  const data = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        id: "09213",
        properties: { name: "a", density: 94.65 },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-7.771322923340632, 110.37719107913776],
              [-7.772226497749426, 110.37588148399519],
              [-7.772779271723014, 110.37755604827585],
            ],
          ],
        },
      },
    ],
  };

  const onCreate = (e) => {
    const { layer, layerType } = e;
    const coordinates = layer._latlngs;
    const type = layerType;
    console.log(type);
    console.log(coordinates);
  };

  return (
    // edit width di sini
    <div className='h-full w-full rounded-lg p-1 overflow-hidden border-[5px] bg-white'>
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
          <GeoJSON data={data} />
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapComp;
