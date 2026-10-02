import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Check, Truck, Clock, MapPin } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { useApp } from '@/context/AppContext';
import { products } from '@/data/mockData';

const mockOrders = [
  { id: 'SW-2026-00125', date: '30 Sept 2026', status: 'En transit', total: 238.70, items: [products[0], products[2], products[7]] },
  { id: 'SW-2026-00119', date: '22 Sept 2026', status: 'Livrée', total: 129.90, items: [products[1], products[3]] },
  { id: 'SW-2026-00112', date: '15 Sept 2026', status: 'Livrée', total: 79.90, items: [products[2]] },
  { id: 'SW-2026-00108', date: '08 Sept 2026', status: 'Préparation', total: 199.00, items: [products[4]] },
  { id: 'SW-2026-00095', date: '28 Août 2026', status: 'Livrée', total: 59.90, items: [products[6]] },
  { id: 'SW-2026-00088', date: '20 Août 2026', status: 'Confirmée', total: 34.90, items: [products[9]] },
];

const statusFilters = ['Toutes', 'Confirmée', 'Préparation', 'En transit', 'Livrée'];
const { formatPrice } = { formatPrice: (n: number) => `${n.toFixed(2)} €` };

export default function ProfileOrders() {
  const { user, formatPrice: fmt } = useApp();
  const [filter, setFilter] = useState('Toutes');

  if (!user) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Veuillez vous connecter.</p>
        <Link to="/connexion" className="mt-4 inline-block text-blue-900 font-medium">Connexion</Link>
      </Container>
    );
  }

  const filtered = filter === 'Toutes' ? mockOrders : mockOrders.filter(o => o.status === filter);

  const statusIcon = (status: string) => {
    if (status === 'Livrée') return <Check className="w-4 h-4 text-emerald-600" />;
    if (status === 'En transit') return <Truck className="w-4 h-4 text-blue-900" />;
    if (status === 'Préparation') return <Package className="w-4 h-4 text-amber-600" />;
    return <Clock className="w-4 h-4 text-slate-400" />;
  };

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Profil', to: '/profil' }, { label: 'Mes commandes' }]} />

      <h1 className="text-2xl font-bold text-slate-900 mb-6">Mes commandes</h1>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {statusFilters.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${filter === s ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {filtered.map(order => (
          <div key={order.id} className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div>
                <p className="font-bold text-slate-900">#{order.id}</p>
                <p className="text-sm text-slate-400">{order.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${
                  order.status === 'Livrée' ? 'bg-emerald-50 text-emerald-600' :
                  order.status === 'En transit' ? 'bg-blue-50 text-blue-900' :
                  order.status === 'Préparation' ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {statusIcon(order.status)} {order.status}
                </span>
              </div>
            </div>

            {/* Items preview */}
            <div className="flex items-center gap-3 mb-4">
              {order.items.slice(0, 3).map((p, i) => (
                <img key={i} src={p.images[0].url} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />
              ))}
              {order.items.length > 3 && (
                <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                  +{order.items.length - 3}
                </div>
              )}
              <div className="flex-1 text-right">
                <p className="text-xs text-slate-400">{order.items.length} article(s)</p>
                <p className="font-bold text-slate-900">{fmt(order.total)}</p>
              </div>
            </div>

            <Link
              to={`/commande/${order.id}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Voir détails <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Aucune commande avec ce statut.</p>
        </div>
      )}
    </Container>
  );
}
