import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1) || 'Utilisateur';
    login(email, name);
    navigate('/');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">StyleWorld</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Connexion</h1>
          <p className="text-slate-500 mt-2 text-sm">Bienvenue ! Connectez-vous pour accéder à votre compte.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
            <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl focus-within:border-blue-500 transition-colors">
              <Mail className="w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vous@email.com"
                className="flex-1 outline-none text-sm bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Mot de passe</label>
            <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl focus-within:border-blue-500 transition-colors">
              <Lock className="w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="flex-1 outline-none text-sm bg-transparent"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-blue-900" />
              <span className="text-slate-600">Se souvenir de moi</span>
            </label>
            <button type="button" className="text-blue-900 font-medium hover:text-blue-700">Mot de passe oublié ?</button>
          </div>

          <button type="submit" className="w-full py-3.5 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
            Se connecter <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social login */}
        <div className="mt-6">
          <p className="text-center text-sm text-slate-400 mb-4">ou connectez-vous avec</p>
          <div className="grid grid-cols-3 gap-3">
            {['Google', 'Apple', 'Facebook'].map(provider => (
              <button
                key={provider}
                disabled
                className="py-3 border border-slate-200 rounded-xl text-sm font-medium text-slate-400 cursor-not-allowed relative"
                title="Bientôt disponible"
              >
                {provider}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Pas encore de compte ? <Link to="/inscription" className="text-blue-900 font-medium hover:text-blue-700">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}
