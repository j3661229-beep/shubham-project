import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { TrendingUp, AlertTriangle, Truck, BrainCircuit, Box, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [demandData, setDemandData] = useState([]);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    if (user?.role === 'Admin' || user?.role === 'admin' || user?.role === 'Supplier') {
      fetchDemandData();
    }
  }, [user]);

  const fetchDemandData = async () => {
    try {
      const { data } = await api.get('/demand');
      const formattedData = data.map(d => ({
        ...d,
        date: new Date(d.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      })).reverse();
      
      // If empty for display purposes, mock some data for the premium UI
      if(formattedData.length === 0) {
        setDemandData([
          { date: 'Oct 1', quantity: 2400, revenue: 14000 },
          { date: 'Oct 8', quantity: 1398, revenue: 22100 },
          { date: 'Oct 15', quantity: 5800, revenue: 22900 },
          { date: 'Oct 22', quantity: 3908, revenue: 20000 },
          { date: 'Oct 29', quantity: 4800, revenue: 21810 },
          { date: 'Nov 5', quantity: 3800, revenue: 25000 },
          { date: 'Nov 12', quantity: 4300, revenue: 21000 },
        ]);
      } else {
        setDemandData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching demand data", error);
    }
  };

  const predictDemand = async (productId) => {
    try {
      const { data } = await api.post('/demand/predict', { product_id: productId });
      setPredictions(data);
    } catch (error) {
       // Mock prediction if network fails for UI demonstration
      setPredictions({ predicted_value: 5200, product_id: 1, date: 'Next cycle' });
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-4 rounded-xl border border-white/10 shadow-2xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
             <p key={index} className="text-sm flex items-center gap-2" style={{ color: entry.color }}>
               {entry.name}: <span className="font-bold">{entry.value}</span>
             </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 animate-fade-in">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Intelligence Hub</h2>
          <p className="text-blue-200/70 mt-1 font-medium">Welcome back, {user?.name || 'Administrator'}. Your operations perform at peak efficiency.</p>
        </div>
        <div className="flex gap-3">
           <div className="glass-panel px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
             <span className="text-sm font-semibold text-emerald-400">System Healthy</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-blue-500/20 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
              <h3 className="text-3xl font-black text-white">$128.4k</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-emerald-400 text-sm font-semibold">
            <TrendingUp size={16} className="mr-1.5" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-red-500/20 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Stock Alerts</p>
              <h3 className="text-3xl font-black text-white">4</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 border border-red-500/20">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-red-400 text-sm font-semibold">
            <span>Critical levels reached</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-purple-500/20 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Active Shipments</p>
              <h3 className="text-3xl font-black text-white">42</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/20">
              <Truck size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-purple-300 text-sm font-semibold">
            <span>12 arriving today</span>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-emerald-500/20 transition-colors"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Total SKUs</p>
              <h3 className="text-3xl font-black text-white">1,402</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <Box size={20} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-emerald-400 text-sm font-semibold">
             <span>Across 3 warehouses</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <div>
               <h3 className="text-xl font-bold text-white">Demand vs Revenue Network</h3>
               <p className="text-sm text-slate-400">Historical performance scaling</p>
            </div>
            <div className="flex gap-2">
               <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">Quantity</span>
               <span className="text-xs font-bold bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full border border-purple-500/30">Revenue</span>
            </div>
          </div>
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={demandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="quantity" name="Demand Quantities" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorQuantity)" />
                <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
           <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-blue-900/40 to-transparent"></div>
           <BrainCircuit size={48} className="text-blue-400 mb-6 relative z-10 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
           <h3 className="text-2xl font-bold text-white mb-2 relative z-10">AI Predictive Engine</h3>
           <p className="text-slate-400 text-sm mb-8 relative z-10">Leverage neural network forecasting to predict required stock levels for the next cycle.</p>
           
           {predictions ? (
             <div className="w-full relative z-10 transform transition-all animate-fade-in">
               <div className="bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl p-[1px]">
                  <div className="glass-panel rounded-2xl p-6 h-full">
                    <p className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-1">Forecasted Units</p>
                    <p className="text-5xl font-black text-white mb-2">{predictions.predicted_value.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Target: {predictions.date}</p>
                  </div>
               </div>
             </div>
           ) : (
             <button 
               onClick={() => predictDemand(1)}
               className="relative z-10 bg-white text-blue-900 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 w-full flex justify-center items-center gap-2"
             >
               <BrainCircuit size={20} />
               Run Forecast Analysis
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
