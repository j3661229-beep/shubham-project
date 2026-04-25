import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Truck, Package, LogOut, PackageOpen, FolderTree, ShoppingCart, Users, ClipboardList } from 'lucide-react';

const Sidebar = () => {
  const { logout, user } = useContext(AuthContext);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/products', icon: <FolderTree size={20} /> },
    { name: 'Inventory', path: '/inventory', icon: <Package size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Purchase Orders', path: '/po', icon: <ClipboardList size={20} /> },
    { name: 'Suppliers', path: '/suppliers', icon: <Users size={20} /> },
    { name: 'Logistics', path: '/logistics', icon: <Truck size={20} /> },
  ];

  return (
    <div className="w-64 glass-panel border-r-0 h-screen flex flex-col z-20 m-4 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 flex items-center space-x-3 bg-gradient-to-r from-blue-900/40 to-transparent border-b border-white/5">
        <PackageOpen size={32} className="text-blue-400" />
        <span className="text-2xl font-extrabold text-white tracking-tight">Nexus<span className="text-blue-400 font-light">IMS</span></span>
      </div>
      
      <div className="px-6 py-4">
        <p className="text-xs text-blue-300/60 uppercase tracking-widest font-bold">Main Navigation</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide pb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive 
                ? 'bg-blue-600/80 text-white shadow-lg shadow-blue-900/50 border border-blue-500/50' 
                : 'text-slate-300 hover:bg-white/10 hover:text-white hover:pl-6'
              }`
            }
          >
            {item.icon}
            <span className="font-medium tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 bg-slate-900/40">
        <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-xl mb-3 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
            {user?.name?.charAt(0) || 'A'}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{user?.name || 'Administrator'}</p>
            <p className="text-xs text-blue-300">{user?.role || 'Admin Account'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center justify-center w-full space-x-2 px-4 py-3 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all border border-transparent hover:border-red-500/30"
        >
          <LogOut size={18} />
          <span className="font-semibold text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
