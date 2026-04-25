import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Truck, MapPinned, Clock, ShieldCheck } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem'
};

const defaultCenter = {
  lat: 40.7128,
  lng: -74.0060
};

const Logistics = () => {
  const [shipments, setShipments] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY_HERE"
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      const { data } = await api.get('/shipments');
      setShipments(data);
    } catch (error) {
       // fallback for preview
       setShipments([{ id: 1, order_id: 1024, status: 'In Transit', eta: new Date().toISOString() }]);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Global Logistics</h2>
          <p className="text-slate-400 mt-1">Real-time telematics and shipment routing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full pb-6">
        {/* Shipment List (Sidebar) */}
        <div className="glass-panel border-white/5 rounded-2xl shadow-xl flex flex-col overflow-hidden h-[600px] lg:h-full">
          <div className="p-5 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck size={20} className="text-purple-400" />
              Active Convoys
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {shipments.length > 0 ? shipments.map((shipment) => (
              <div key={shipment.id} className="group p-4 rounded-xl bg-black/20 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-white text-sm">Order #{shipment.order_id}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-bold ${
                      shipment.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      shipment.status === 'In Transit' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {shipment.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1 text-medium">
                     <Clock size={12} className="text-slate-500" />
                     ETA: {shipment.eta ? new Date(shipment.eta).toLocaleDateString() : 'Pending'}
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                     <ShieldCheck size={12} className="text-slate-500" />
                     Status: Insured & Bonded
                  </div>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col flex-1 items-center justify-center text-slate-500">
                 <MapPinned size={32} className="mb-2 opacity-50" />
                 <p className="text-sm">No shipments tracked</p>
              </div>
            )}
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-3 glass-panel border-white/5 rounded-2xl shadow-xl overflow-hidden relative h-[600px] lg:h-full p-2">
          {isLoaded ? (
            <div className="w-full h-full rounded-xl overflow-hidden border border-white/5 relative bg-slate-900">
               <GoogleMap
                 mapContainerStyle={containerStyle}
                 center={defaultCenter}
                 zoom={5}
                 options={{
                   disableDefaultUI: true,
                   styles: [
                     { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
                     { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
                     { elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] },
                     { featureType: "water", elementType: "geometry", stylers: [{ color: "#09090b" }] },
                     { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] }
                   ]
                 }}
               >
                 {shipments.filter(s => s.location_lat && s.location_lng).map((shipment) => (
                   <Marker 
                     key={shipment.id}
                     position={{ lat: shipment.location_lat, lng: shipment.location_lng }}
                     title={`Order #${shipment.order_id} - ${shipment.status}`}
                   />
                 ))}
               </GoogleMap>
               
               {/* UI Map Overlay */}
               <div className="absolute top-4 left-4 glass-panel border-white/10 px-4 py-2 rounded-xl backdrop-blur-md text-xs font-bold text-white shadow-2xl flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  LIVE TRACKING
               </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-3">
               <div className="w-10 h-10 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin"></div>
               <p className="font-semibold text-sm tracking-wide">INITIALIZING SATELLITE LINK...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logistics;
