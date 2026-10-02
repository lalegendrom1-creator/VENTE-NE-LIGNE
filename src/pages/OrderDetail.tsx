import { useParams, Link } from 'react-router-dom';
import { Check, Package, Truck, MapPin, CreditCard, Download, ArrowRight } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const orderSteps = [
  { label: 'Commande confirmée', date: '30 Sept 2026', done: true },
  { label: 'Préparation', date: '30 Sept 2026', done: true },
  { label: 'Expédiée', date: '01 Oct 2026', done: true },
  { label: 'En transit', date: 'En cours', done: false, active: true },
  { label: 'Livrée', date: 'Estimée: 04 Oct 2026', done: false },
];

export default function OrderDetail() {
  const { id } = useParams();
  const { formatPrice } = useApp();
  const orderItems = [products[0], products[2], products[7]].map((p, i) => ({ product: p, quantity: i + 1, size: 'M', color: p.colors[0].name }));
  const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 5.90;
  const total = subtotal + shipping;

  return (
    <Container className="py-6">
      <Breadcrumb items={[
        { label: 'Accueil', to: '/' },
        { label: 'Profil', to: '/profil' },
        { label: 'Mes commandes', to: '/profil/commandes' },
        { label: `Commande #${id}` },
      ]} />

      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Commande #{id}</h1>
          <p className="text-slate-500 mt-1">Passée le 30 Septembre 2026</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" /> Télécharger la facture
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-900" /> Suivi de commande
            </h2>
            <div className="relative">
              {orderSteps.map((step, i) => (
                <div key={i} className="flex gap-4 pb-8 last:pb-0 relative">
                  {i < orderSteps.length - 1 && (
                    <div className={`absolute left-4 top-8 bottom-0 w-0.5 ${step.done ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  )}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    step.done ? 'bg-emerald-500 text-white' : step.active ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step.done ? <Check className="w-4 h-4" /> : step.active ? <Truck className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                  </div>
                  <div className="pt-1">
                    <p className={`font-medium ${step.done || step.active ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{step.date}</p>
                    {step.active && (
                      <p className="text-xs text-blue-900 mt-1">Votre colis est en cours de transport</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="font-bold text-slate-900 mb-4">Articles commandés</h2>
            <div className="space-y-4">
              {orderItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <img src={item.product.images[0].url} alt={item.product.name} className="w-16 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">{item.product.brand}</p>
                    <Link to={`/produit/${item.product.slug}`} className="font-medium text-slate-900 text-sm hover:text-blue-900 transition-colors">{item.product.name}</Link>
                    <p className="text-xs text-slate-500 mt-1">Taille: {item.size} · Couleur: {item.color} · Qté: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <Link to="/boutique" className="mt-6 inline-flex items-center gap-2 text-sm text-blue-900 font-medium hover:text-blue-700">
              Continuer mes achats <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          {/* Shipping address */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-900" /> Adresse de livraison</h3>
            <p className="text-sm text-slate-600">Jean Dupont</p>
            <p className="text-sm text-slate-600">12 rue de la Mode</p>
            <p className="text-sm text-slate-600">75001 Paris, France</p>
            <p className="text-sm text-slate-600 mt-2">+33 6 12 34 56 78</p>
          </div>

          {/* Payment */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4 text-blue-900" /> Paiement</h3>
            <p className="text-sm text-slate-600">Carte Visa **** 4242</p>
            <p className="text-sm text-slate-400 mt-1">Paiement confirmé</p>
          </div>

          {/* Total */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-2">
            <h3 className="font-bold text-slate-900 mb-2">Récapitulatif</h3>
            <div className="flex justify-between text-sm text-slate-600"><span>Sous-total</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between text-sm text-slate-600"><span>Livraison</span><span className="font-medium">{formatPrice(shipping)}</span></div>
            <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-50"><span>Total</span><span className="text-blue-900">{formatPrice(total)}</span></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
