import React from 'react';
import { ClipboardList, Search, Plus } from 'lucide-react';

const PurchaseOrders = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Purchase Orders</h2>
          <p className="text-slate-400 mt-1">Manage inbound shipments from suppliers</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl transition-colors font-medium border border-purple-400/30 shadow-lg shadow-purple-500/20">
            <Plus size={18} />
            <span>Create PO</span>
          </button>
        </div>
      </div>

      <div className="glass-card p-12 text-center flex flex-col items-center justify-center rounded-2xl">
        <ClipboardList size={48} className="text-slate-500 mb-4" />
        <h3 className="text-xl font-bold text-white">No purchase orders found</h3>
        <p className="text-slate-400 mt-2">Request new inventory from your suppliers.</p>
      </div>
    </div>
  );
};

export default PurchaseOrders;
