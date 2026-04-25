import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Package, Search, Plus, Archive, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data } = await api.get('/inventory');
      setInventory(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Inventory Monitor</h2>
          <p className="text-blue-200 mt-1">Real-time stock tracking across warehouses</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300">
             <Archive size={20} />
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm rounded-xl transition-all font-medium border border-blue-400/30 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            <Plus size={18} />
            <span>Add Stock</span>
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/5">
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search inventory..." 
              className="pl-9 pr-4 py-1.5 bg-black/20 border border-white/10 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
            />
          </div>
          <button className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-black/20 border border-white/10 transition-colors">
            Filter <ChevronDown size={14} />
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5 text-sm">
              <thead className="bg-black/20">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-slate-400 tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400 tracking-wider">SKU / Cat</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400 tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400 tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400 tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left font-medium text-slate-400 tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inventory.length > 0 ? inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-400/20 group-hover:bg-blue-500/20 transition-colors">
                        <Package size={16} />
                      </div>
                      {item.Product?.name || `Product #${item.product_id}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-300">{item.Product?.category_id || '--'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2.5 py-1 rounded-md text-xs">
                        WH-{item.warehouse_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="font-semibold text-white tracking-wide">{item.quantity}</span>
                       <span className="text-slate-500 ml-1 text-xs">units</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.quantity < 20 ? (
                        <div className="flex items-center text-red-400 text-xs font-semibold bg-red-400/10 px-2.5 py-1 rounded-full border border-red-400/20 w-max">
                           <AlertCircle size={14} className="mr-1.5" /> Low Stock
                        </div>
                      ) : (
                        <div className="flex items-center text-emerald-400 text-xs font-semibold bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20 w-max">
                           <CheckCircle2 size={14} className="mr-1.5" /> Optimal
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-400 font-medium hover:text-blue-300 cursor-pointer transition-colors hover:underline">
                      Manage
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                        <Archive size={40} className="mb-3 opacity-20" />
                        <p>No inventory records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
