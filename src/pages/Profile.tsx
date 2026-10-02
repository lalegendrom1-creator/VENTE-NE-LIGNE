import { Link } from 'react-router-dom';
import { LayoutDashboard, User, Palette, Package, Heart, ShoppingCart, MapPin, CreditCard, Star, Image, Users, Bell, Settings, LogOut, ArrowRight, Sparkles } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { products, notifications } from '@/data/mockData';

const menuItems = [
  { to: '/profil', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/profil', icon: User, label: 'Mon profil' },
  { to: '/profil/style', icon: Palette, label: 'Mon style' },
  { to: '/profil/commandes', icon: Package, label: 'Mes commandes' },
  { to: '/profil/favoris', icon: Heart, label: 'Mes favoris' },
  { to: '/panier', icon: ShoppingCart, label: 'Mon panier' },
  { to: '/profil', icon: MapPin, label: 'Mes adresses' },
  { to: '/profil', icon: CreditCard, label: 'Moyens de paiement' },
  { to: '/profil', icon: Star, label: 'Mes avis' },
  { to: '/profil', icon: Image, label: 'Mes publications' },
  { to: '/profil', icon: Users, label: 'Mes abonnements' },
  { to: '/profil', icon: Bell, label: 'Notifications' },
  { to: '/profil/parametres', icon: Settings, label: 'Paramètres' },
];

export default function Profile() {
  const { user, logout, favorites } = useApp();

  if (!user) {
    return (
      <Container className="py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Connectez-vous pour accéder à votre profil</h2>
        <p className="text-slate-500 mt-2">Gérez vos commandes, favoris, style et plus encore.</p>
        <div className="flex gap-3 justify-center mt-6">
          <Link to="/connexion" className="px-6 py-3 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-800 transition-colors">Connexion</Link>
          <Link to="/inscription" className="px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">Créer un compte</Link>
        </div>
      </Container>
    );
  }

  const recommendedProducts = products.slice(0, 4);
  const recentOrders = [
    { id: 'SW-2026-00125', date: '30 Sept 2026', status: 'En transit', items: 3, total: 238.70 },
    { id: 'SW-2026-00119', date: '22 Sept 2026', status: 'Livrée', items: 2, total: 129.90 },
    { id: 'SW-2026-00112', date: '15 Sept 2026', status: 'Livrée', items: 1, total: 79.90 },
  ];

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Profil' }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 sticky top-24">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-0.5">
              {menuItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    to={item.to}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-blue-900 transition-colors"
                  >
                    <Icon className="w-4 h-4" /> {item.label}
                  </Link>
                );
              })}
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Déconnexion
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Welcome */}
          <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white rounded-2xl p-6">
            <h1 className="text-2xl font-bold">Bonjour, {user.name} !</h1>
            <p className="text-blue-200 mt-1 text-sm">Voici un aperçu de votre activité sur StyleWorld.</p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Package, label: 'Commandes', value: '12', color: 'bg-blue-50 text-blue-900' },
              { icon: Heart, label: 'Favoris', value: String(favorites.length), color: 'bg-rose-50 text-rose-600' },
              { icon: Users, label: 'Abonnés', value: '248', color: 'bg-emerald-50 text-emerald-600' },
              { icon: Star, label: 'Avis', value: '8', color: 'bg-amber-50 text-amber-600' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Recent orders */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900">Commandes récentes</h2>
              <Link to="/profil/commandes" className="text-sm text-blue-900 font-medium hover:text-blue-700 flex items-center gap-1">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentOrders.map(order => (
                <Link key={order.id} to={`/commande/${order.id}`} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div>
                    <p className="font-medium text-slate-900 text-sm">#{order.id}</p>
                    <p className="text-xs text-slate-400">{order.date} · {order.items} article(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 text-sm">{order.total.toFixed(2)}€</p>
                    <span className={`text-xs font-medium ${order.status === 'Livrée' ? 'text-emerald-600' : 'text-blue-900'}`}>{order.status}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-4">Notifications récentes</h2>
            <div className="space-y-3">
              {notifications.slice(0, 3).map(notif => (
                <div key={notif.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{notif.message}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">{notif.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="font-bold text-slate-900 mb-4">Recommandé pour vous</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommendedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
