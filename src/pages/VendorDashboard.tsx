import { Link } from 'react-router-dom';
import { DollarSign, Package, ShoppingCart, Eye, TrendingUp, Star, ArrowRight, Store, Settings, Tag, BarChart3 } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const monthlySales = [
  { month: 'Jan', value: 45 }, { month: 'Fév', value: 52 }, { month: 'Mar', value: 48 },
  { month: 'Avr', value: 65 }, { month: 'Mai', value: 72 }, { month: 'Jun', value: 68 },
  { month: 'Jul', value: 80 }, { month: 'Aoû', value: 85 }, { month: 'Sep', value: 92 },
];

const recentOrders = [
  { id: 'SW-2026-00125', customer: 'Thomas L.', date: '30 Sept', total: 238.70, status: 'En transit' },
  { id: 'SW-2026-00124', customer: 'Aminata D.', date: '29 Sept', total: 129.90, status: 'Livrée' },
  { id: 'SW-2026-00123', customer: 'James W.', date: '28 Sept', total: 79.90, status: 'Préparation' },
  { id: 'SW-2026-00122', customer: 'Sofia R.', date: '27 Sept', total: 199.00, status: 'Livrée' },
  { id: 'SW-2026-00121', customer: 'Chen W.', date: '26 Sept', total: 59.90, status: 'Livrée' },
];

export default function VendorDashboard() {
  const { formatPrice } = useApp();
  const topProducts = products.slice(0, 5);
  const maxSales = Math.max(...monthlySales.map(m => m.value));

  const stats = [
    { icon: DollarSign, label: 'Chiffre d\'affaires', value: formatPrice(48520), change: '+12.5%', color: 'bg-emerald-50 text-emerald-600' },
    { icon: ShoppingCart, label: 'Commandes', value: '342', change: '+8.2%', color: 'bg-blue-50 text-blue-900' },
    { icon: Package, label: 'Produits en stock', value: '612', change: '-3.1%', color: 'bg-amber-50 text-amber-600' },
    { icon: Eye, label: 'Visites', value: '12.4K', change: '+24.7%', color: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Espace vendeur' }]} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Tableau de bord vendeur</h1>
          <p className="text-slate-500 mt-1">Urban Heritage — Vue d'ensemble de votre boutique</p>
        </div>
        <div className="flex gap-2">
          <Link to="/boutique" className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Store className="w-4 h-4" /> Ma boutique
          </Link>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors">
            <Settings className="w-4 h-4" /> Gérer
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Sales chart */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-900" /> Ventes par mois</h2>
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlySales.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-slate-100 rounded-t-lg relative group" style={{ height: `${(m.value / maxSales) * 100}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-600 rounded-t-lg group-hover:from-blue-800 group-hover:to-blue-500 transition-colors" style={{ height: '100%' }} />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">{m.value}K</span>
                </div>
                <span className="text-xs text-slate-400">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4">Actions rapides</h2>
          <div className="space-y-2">
            {[
              { icon: Package, label: 'Ajouter un produit', to: '/boutique' },
              { icon: Tag, label: 'Créer une promotion', to: '/boutique' },
              { icon: ShoppingCart, label: 'Gérer les commandes', to: '/boutique' },
              { icon: Star, label: 'Répondre aux avis', to: '/boutique' },
            ].map((action, i) => {
              const Icon = action.icon;
              return (
                <Link key={i} to={action.to} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                  <span className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <Icon className="w-4 h-4 text-blue-900" /> {action.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent orders */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4">Commandes récentes</h2>
          <div className="space-y-2">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-slate-900">#{order.id}</p>
                  <p className="text-xs text-slate-400">{order.customer} · {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{formatPrice(order.total)}</p>
                  <span className={`text-xs ${order.status === 'Livrée' ? 'text-emerald-600' : order.status === 'En transit' ? 'text-blue-900' : 'text-amber-600'}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-900" /> Produits les plus vendus</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300 w-4">{i + 1}</span>
                <img src={p.images[0].url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 line-clamp-1">{p.name}</p>
                  <p className="text-xs text-slate-400">{p.reviewCount} ventes</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{formatPrice(p.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
