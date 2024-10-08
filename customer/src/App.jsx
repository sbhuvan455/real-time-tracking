// import { useState, useMemo, useEffect } from 'react'
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { io } from 'socket.io-client'
// import L, { Icon } from "leaflet";

// export default function App() {

//   const socket = useMemo(() => io("https://real-time-tracking-iijd.onrender.com"), []);
//   const [position, setPosition] = useState([28.4722, 77.080]);
//   const [location, setLocation] = useState([]);

//   const handleClick = () => {
//     navigator.geolocation.getCurrentPosition((success, error) => {
//       try {
//         socket.emit('Order-food', {latitude: success.coords.latitude, longitude: success.coords.longitude})
//         console.log("request sent successfully")
//         setLocation([success.coords.latitude, success.coords.longitude])
//       }catch(error){
//         console.log(error);
//       }
//     })
//   }

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("Socket connected");
//     })

//     socket.on('recieve-location', (obj) => {
//       console.log("event recieved")
//       setPosition([obj.latitude, obj.longitude])
//       console.log(obj)
//     })

//     return () => {
//       socket.disconnect();
//     }
//   }, [socket])

//   const customIcon = new Icon({
//     iconUrl: "https://cdn-icons-png.flaticon.com/512/3085/3085330.png",
//     iconSize: [38, 38]
//   })

//   L.Routing.control({
//     waypoints: [
//       L.latLng(57.74, 11.94),
//       L.latLng(57.6792, 11.949)
//     ]
//   }).addTo(map);


//   return (
//     <div className="text-3xl font-bold underline">
//       Hello world!
//       <button onClick={handleClick}>order</button>
//       {(location.length > 0) ? (
//         <MapContainer center={location} zoom={13} scrollWheelZoom={false} className="h-[100vh]">
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker position={location}>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//           <Marker position={position} icon={customIcon}>
//             <Popup>
//               driver
//             </Popup>
//           </Marker>
//         </MapContainer>
//       ) : (
//         <h2>Hello world</h2>
//       )}
//     </div>
//   )
// }

import React from 'react'
import Customer from './customer'

function App() {
  return (
    <div>
      <Customer />
    </div>
  )
}

export default App
