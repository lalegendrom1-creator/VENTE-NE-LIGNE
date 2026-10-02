import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Store, Package, DollarSign, ShoppingCart, Flag, Check, X, Eye, Ban, Shield, LayoutDashboard, Tag, Bell, Image, MessageCircle, Truck, CreditCard } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord' },
  { icon: Users, label: 'Utilisateurs' },
  { icon: Store, label: 'Vendeurs' },
  { icon: Package, label: 'Produits' },
  { icon: Tag, label: 'Catégories' },
  { icon: ShoppingCart, label: 'Commandes' },
  { icon: CreditCard, label: 'Paiements' },
  { icon: Truck, label: 'Livraisons' },
  { icon: Eye, label: 'Avis' },
  { icon: Image, label: 'Publications' },
  { icon: MessageCircle, label: 'Commentaires' },
  { icon: Package, label: 'Articles' },
  { icon: Image, label: 'Vidéos' },
  { icon: Tag, label: 'Promotions' },
  { icon: Bell, label: 'Notifications' },
  { icon: Flag, label: 'Signalements' },
];

const reports = [
  { id: 'r1', type: 'Publication', reporter: 'Utilisateur123', reason: 'Contenu inapproprié', target: 'Post de Aïcha B.', date: '30 Sept', status: 'En attente' },
  { id: 'r2', type: 'Commentaire', reporter: 'Marie L.', reason: 'Spam publicitaire', target: 'Commentaire sur post #post3', date: '29 Sept', status: 'En attente' },
  { id: 'r3', type: 'Vendeur', reporter: 'Client456', reason: 'Faux produits', target: 'Tokyo Street', date: '28 Sept', status: 'Examiné' },
  { id: 'r4', type: 'Produit', reporter: 'User789', reason: 'Description trompeuse', target: 'Sneakers Urbaines', date: '27 Sept', status: 'Résolu' },
  { id: 'r5', type: 'Utilisateur', reporter: 'Admin', reason: 'Comportement abusif', target: 'User_spam_bot', date: '26 Sept', status: 'Banni' },
];

const roles = ['Super Admin', 'Admin', 'Modérateur', 'Support', 'Vendeur', 'Créateur', 'Utilisateur'];

export default function Admin() {
  const { formatPrice } = useApp();
  const [activeSection, setActiveSection] = useState('Tableau de bord');

  const stats = [
    { icon: Users, label: 'Utilisateurs', value: '48,251', change: '+1,243', color: 'bg-blue-50 text-blue-900' },
    { icon: ShoppingCart, label: 'Commandes', value: '12,847', change: '+342', color: 'bg-emerald-50 text-emerald-600' },
    { icon: DollarSign, label: 'Revenus', value: formatPrice(892450), change: '+12.5%', color: 'bg-amber-50 text-amber-600' },
    { icon: Store, label: 'Vendeurs actifs', value: '1,205', change: '+28', color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Administration' }]} />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-2xl p-3 sticky top-24">
            <div className="flex items-center gap-2 p-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Admin Panel</p>
                <p className="text-xs text-slate-400">Super Admin</p>
              </div>
            </div>
            <nav className="space-y-0.5 max-h-[60vh] overflow-y-auto">
              {sidebarItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveSection(item.label)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      activeSection === item.label ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="lg:col-span-4 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{activeSection}</h1>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-slate-400">{stat.label}</p>
                    <span className="text-xs text-emerald-600 font-medium">{stat.change}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reports table */}
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-50">
              <h2 className="font-bold text-slate-900 flex items-center gap-2"><Flag className="w-5 h-5 text-rose-500" /> Signalements récents</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Type</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700 hidden sm:table-cell">Cible</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700 hidden md:table-cell">Raison</th>
                    <th className="px-6 py-3 text-left font-semibold text-slate-700">Statut</th>
                    <th className="px-6 py-3 text-right font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map(report => (
                    <tr key={report.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">{report.type}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 hidden sm:table-cell">{report.target}</td>
                      <td className="px-6 py-4 text-slate-600 hidden md:table-cell">{report.reason}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium ${
                          report.status === 'Résolu' ? 'text-emerald-600' :
                          report.status === 'Banni' ? 'text-rose-600' :
                          report.status === 'Examiné' ? 'text-blue-900' : 'text-amber-600'
                        }`}>{report.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors" title="Approuver"><Check className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors" title="Examiner"><Eye className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors" title="Bannir"><Ban className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors" title="Rejeter"><X className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Roles */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-900" /> Rôles et permissions</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {roles.map(role => (
                <span key={role} className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  role === 'Super Admin' ? 'bg-rose-100 text-rose-700' :
                  role === 'Admin' ? 'bg-blue-100 text-blue-900' :
                  role === 'Modérateur' ? 'bg-amber-100 text-amber-700' :
                  role === 'Support' ? 'bg-emerald-100 text-emerald-700' :
                  role === 'Vendeur' ? 'bg-slate-100 text-slate-600' :
                  role === 'Créateur' ? 'bg-indigo-100 text-indigo-700' :
                  'bg-slate-50 text-slate-500'
                }`}>{role}</span>
              ))}
            </div>
          </div>

          {/* Recent products preview */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-4">Produits récents</h2>
            <div className="space-y-3">
              {products.slice(0, 4).map(p => (
                <div key={p.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <img src={p.images[0].url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.brand} · {p.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{formatPrice(p.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
