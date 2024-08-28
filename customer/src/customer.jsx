import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from 'socket.io-client';
import L, { Icon } from "leaflet";
import "leaflet-routing-machine";

function Routing({ start, end }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1])
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }]
      }
    }).addTo(map);

    return () => {
      map.removeControl(routingControl); 
    };
  }, [map, start, end]);

  return null;
}

export default function Customer() {
  const socket = useMemo(() => io("https://real-time-tracking-iijd.onrender.com"), []);
  const [position, setPosition] = useState([28.4722, 77.080]); 
  const [location, setLocation] = useState([]); 

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition((success, error) => {
      try {
        socket.emit('Order-food', { latitude: success.coords.latitude, longitude: success.coords.longitude });
        console.log("Request sent successfully");
        setLocation([success.coords.latitude, success.coords.longitude]);
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on('recieve-location', (obj) => {
      console.log("Event received");
      setPosition([obj.latitude, obj.longitude]);
      console.log(obj);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3085/3085330.png",
    iconSize: [38, 38]
  });

  return (
    <div className="text-3xl font-bold underline">
      Hello world!
      <button onClick={handleClick}>Order</button>
      {location.length > 0 ? (
        <MapContainer center={location} zoom={13} scrollWheelZoom={false} className="h-[100vh]">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={position} icon={customIcon}>
            <Popup>
              Driver
            </Popup>
          </Marker>
          <Routing start={location} end={position} />
        </MapContainer>
      ) : (
        <h2>Hello world</h2>
      )}
    </div>
  );
}
