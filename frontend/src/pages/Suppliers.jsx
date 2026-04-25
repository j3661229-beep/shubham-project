import React from 'react';
import { Users, Search, Plus } from 'lucide-react';

const Suppliers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Suppliers</h2>
          <p className="text-slate-400 mt-1">Manage vendor relationships and capabilities</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl transition-colors font-medium border border-emerald-400/30 shadow-lg shadow-emerald-500/20">
            <Plus size={18} />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-12 text-center flex flex-col items-center justify-center rounded-2xl">
        <Users size={48} className="text-slate-500 mb-4" />
        <h3 className="text-xl font-bold text-white">Supplier directory empty</h3>
        <p className="text-slate-400 mt-2">Add vendors to streamline your purchasing process.</p>
      </div>
    </div>
  );
};

export default Suppliers;
