import React from 'react';
import { ShoppingCart, Search, Plus, PackageOpen } from 'lucide-react';

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Sales Orders</h2>
          <p className="text-slate-400 mt-1">Manage outbound customer orders</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full sm:w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition-colors font-medium border border-blue-400/30 shadow-lg shadow-blue-500/20">
            <Plus size={18} />
            <span>New Order</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-12 text-center flex flex-col items-center justify-center rounded-2xl">
        <ShoppingCart size={48} className="text-slate-500 mb-4" />
        <h3 className="text-xl font-bold text-white">No active orders</h3>
        <p className="text-slate-400 mt-2">Create a new sales order to track outbound logistics.</p>
      </div>
    </div>
  );
};

export default Orders;
