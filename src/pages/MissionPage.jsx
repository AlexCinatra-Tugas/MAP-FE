import axios from "axios";
import useSWR, { mutate, useSWRConfig } from "swr";
import React, { useRef, useState, useEffect } from "react";
import { TileLayer, FeatureGroup, MapContainer, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const MissionPage = () => {
  const mapRef = useRef();
  // const initialPos = [-7.772297405953391, 110.37734234583341];
  const initialPos = [-7.971605, 110.276907];

  const [row, setRow] = useState({});

  const onCreate = (e) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON();
    console.log(coordinates);
  };

  const fetcher = async () => {
    const response = await axios.get(`http://localhost:9000/api/mission?id=4`);
    return response.data;
  };

  const { data, error } = useSWR(`http://localhost:9000/api/mission?id=4`, fetcher);

  if (!data) {
    return <h1>Error ngab</h1>;
  }

  if (error) {
    return <h1>Error ngab</h1>;
  }
  return (
    <div className='flex flex-col md:grid md:grid-cols-4 h-screen'>
      {/* start mission event section */}
      <section className='flex items-center justify-center h-full py-5'>
        <form className='flex flex-col items-center justify-start space-y-3 px-5 h-full w-full pt-5'>
          <div
            to={"/"}
            className='text-xl text-center font-semibold md:flex md:items-center md:justify-center md:space-x-2'>
            Update Mission
          </div>
          <div className='w-full flex items-center justify-center py-5'>
              {data.map((items) => {
                return (
                  <>
                  <div
                  className='flex items-center justify-between px-3 py-2 border w-[200px] rounded-md cursor-pointer my-2 hover:translate-y-[-1px]'
                  key={items.id}>
                    <p>MISI : {items.data.properties.name}</p>
                  </div>
                  </>
                );
              })}
          </div>
          <div className='flex flex-col items-center justify-center w-full hover:translate-y-[-1px]'>
            <button className='px-2 py-3 w-full rounded-md bg-yellow-300 font-semibold'>
              Update
            </button>
          </div>
        </form>
      </section>
      {/* end mission event section */}

      {/* start map section */}
      <div className='flex items-center justify-center p-5 col-span-3 overflow-hidden'>
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
                  polyline : false,
                  polygon : false,
                  marker : false,
                  rectangle: false,
                  circle: false,
                  circlemarker: false,
                }}
              />
              <GeoJSON data={data} />
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
      {/* end map section */}
    </div>
  );
};

export default MissionPage;
