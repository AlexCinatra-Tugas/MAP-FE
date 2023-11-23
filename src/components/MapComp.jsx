import React, { useRef, useState } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const MapComp = () => {
  const mapRef = useRef();
  const initialPos = [-7.772297405953391, 110.37734234583341];
  const [data, setData] = useState({});

  const onCreate = (e) => {
    const { layer, layerType } = e;
    const coordinates = layer._latlngs;
    const type = layerType;
    setData(() => {
      data.push(coordinates);
    });
    console.log(data);
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
        </FeatureGroup>
      </MapContainer>
    </div>
  );
};

export default MapComp;
