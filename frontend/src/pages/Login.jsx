import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PackageOpen } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900 w-full text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <PackageOpen size={48} className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-white">Smart Supply Chain</h2>
          <p className="mt-2 text-sm text-slate-400">Sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center bg-red-500/10 p-3 rounded">{error}</p>}
          <div className="space-y-4">
            <div>
              <input
                type="email"
                required
                className="w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-700 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
