import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Register() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', country: 'France' });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const update = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!acceptedTerms) {
      alert('Veuillez accepter les conditions générales.');
      return;
    }
    login(formData.email, formData.name);
    navigate('/');
  };

  const inputClass = "w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors text-sm";

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
          <h1 className="text-2xl font-bold text-slate-900">Créer un compte</h1>
          <p className="text-slate-500 mt-2 text-sm">Rejoignez la communauté StyleWorld et découvrez votre style.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Nom complet</label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" required value={formData.name} onChange={e => update('name', e.target.value)} placeholder="Jean Dupont" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Email</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="email" required value={formData.email} onChange={e => update('email', e.target.value)} placeholder="vous@email.com" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Pays</label>
            <select value={formData.country} onChange={e => update('country', e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 text-sm">
              <option>France</option><option>Sénégal</option><option>États-Unis</option><option>Royaume-Uni</option>
              <option>Canada</option><option>Allemagne</option><option>Espagne</option><option>Italie</option>
              <option>Japon</option><option>Brésil</option><option>Côte d'Ivoire</option><option>Nigeria</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Mot de passe</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" className={inputClass} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1 block">Confirmer le mot de passe</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type={showPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="••••••••" className={inputClass} />
            </div>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} className="mt-0.5 accent-blue-900" />
            <span className="text-sm text-slate-600">J'accepte les <Link to="/cgu" className="text-blue-900 font-medium">conditions générales</Link> et la <Link to="/confidentialite" className="text-blue-900 font-medium">politique de confidentialité</Link></span>
          </label>

          <button type="submit" className="w-full py-3.5 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
            Créer mon compte <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Déjà un compte ? <Link to="/connexion" className="text-blue-900 font-medium hover:text-blue-700">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
