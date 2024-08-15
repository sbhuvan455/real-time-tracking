import React, { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from 'socket.io-client';
import { Icon } from "leaflet";

export const Delivery = () => {
  const socket = useMemo(() => io("https://real-time-tracking-iijd.onrender.com"), []);
  const [position, setPosition] = useState([28.4722, 77.080]);
  const [location, setLocation] = useState([]);
  const [socketId, setId] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("deliver-food", (obj) => {
      console.log("I can hear you");
      let answer = confirm("Do you want to deliver food?");
      console.log("Delivered", obj);
      
      if (answer) {
        console.log("Yes is your answer");
        setLocation([obj.latitude, obj.longitude]);
        setId(obj.id);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);


  useEffect(() => {
    if(socketId){
      console.log("Socket ID set, starting location updates");

      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((success, error) => {
          console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIID", socketId);
          setPosition([success.coords.latitude, success.coords.longitude]);
          sendLocation();
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [socketId, position]);

  const sendLocation = () => {
    console.log("sending location to server", position[0], position[1], socketId);
    socket.emit('update-location', { latitude: position[0], longitude: position[1], id: socketId });
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3085/3085330.png",
    iconSize: [38, 38]
  })

  return (
    <div>
      {(location.length > 0) ? (
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
              driver
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <h1>Hello world</h1>
      )}
      {socketId && <h1>Its there {socketId}</h1>}
    </div>
  );
};
