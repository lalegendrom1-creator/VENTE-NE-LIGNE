import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Globe, Bell, Lock, Shield, Check } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { useApp } from '@/context/AppContext';
import { currencies, languages } from '@/data/mockData';

export default function ProfileSettings() {
  const { user, currency, setCurrency, language, setLanguage } = useApp();
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '', email: user?.email || '', phone: '+33 6 12 34 56 78',
    country: 'France', isPublic: true, notifOrders: true, notifPromos: true, notifSocial: true,
  });

  if (!user) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Veuillez vous connecter.</p>
        <Link to="/connexion" className="mt-4 inline-block text-blue-900 font-medium">Connexion</Link>
      </Container>
    );
  }

  const update = (field: string, value: string | boolean) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass = "w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors text-sm";
  const toggleClass = (on: boolean) => `w-11 h-6 rounded-full transition-colors relative ${on ? 'bg-blue-900' : 'bg-slate-200'}`;

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Profil', to: '/profil' }, { label: 'Paramètres' }]} />

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Paramètres</h1>

      <div className="max-w-2xl space-y-6">
        {/* Personal info */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-blue-900" /> Informations personnelles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Nom</label><input className={inputClass} value={formData.name} onChange={e => update('name', e.target.value)} /></div>
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Email</label><input className={inputClass} value={formData.email} onChange={e => update('email', e.target.value)} /></div>
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Téléphone</label><input className={inputClass} value={formData.phone} onChange={e => update('phone', e.target.value)} /></div>
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Pays</label>
              <select className={inputClass} value={formData.country} onChange={e => update('country', e.target.value)}>
                {['France', 'Sénégal', 'États-Unis', 'Royaume-Uni', 'Canada', 'Allemagne', 'Espagne', 'Italie', 'Japon'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-900" /> Préférences</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Langue</label>
              <select className={inputClass} value={language.code} onChange={e => { const l = languages.find(x => x.code === e.target.value); if (l) setLanguage(l); }}>
                {languages.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
              </select>
            </div>
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Devise</label>
              <select className={inputClass} value={currency.code} onChange={e => { const c = currencies.find(x => x.code === e.target.value); if (c) setCurrency(c); }}>
                {currencies.map(c => <option key={c.code} value={c.code}>{c.name} ({c.symbol})</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t border-slate-50">
            {[
              { key: 'notifOrders', label: 'Notifications de commandes', desc: 'Statut de vos commandes et livraisons' },
              { key: 'notifPromos', label: 'Promotions et offres', desc: 'Ventes flash, codes promo et réductions' },
              { key: 'notifSocial', label: 'Activité sociale', desc: 'Likes, commentaires et nouveaux abonnés' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div><p className="text-sm font-medium text-slate-900">{item.label}</p><p className="text-xs text-slate-400">{item.desc}</p></div>
                <button onClick={() => update(item.key, !formData[item.key as keyof typeof formData])} className={toggleClass(formData[item.key as keyof typeof formData] as boolean)}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${formData[item.key as keyof typeof formData] ? 'left-0.5 translate-x-5' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-blue-900" /> Confidentialité</h2>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium text-slate-900">Profil public</p><p className="text-xs text-slate-400">Permettre aux autres de voir votre profil et vos publications</p></div>
            <button onClick={() => update('isPublic', !formData.isPublic)} className={toggleClass(formData.isPublic)}>
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${formData.isPublic ? 'translate-x-5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-900" /> Sécurité</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Nouveau mot de passe</label><input type="password" className={inputClass} placeholder="••••••••" /></div>
            <div><label className="text-sm font-medium text-slate-700 mb-1 block">Confirmer</label><input type="password" className={inputClass} placeholder="••••••••" /></div>
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center justify-end gap-3">
          {saved && <span className="text-sm text-emerald-600 flex items-center gap-1"><Check className="w-4 h-4" /> Enregistré</span>}
          <button onClick={handleSave} className="px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors">
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </Container>
  );
}
