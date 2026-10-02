import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Heart, ShoppingBag, Tag, ArrowRight, Truck } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, formatPrice, toggleFavorite, clearCart } = useApp();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 5.90;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'STYLE10') {
      setPromoApplied(true);
    } else {
      alert('Code promo invalide. Essayez "STYLE10" pour -10%.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-16">
        <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Panier' }]} />
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Votre panier est vide</h2>
          <p className="text-slate-500 mt-2">Découvrez nos collections et ajoutez vos articles préférés.</p>
          <Link to="/boutique" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-800 transition-colors">
            Découvrir la boutique <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Panier' }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Mon panier</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl">
              <Link to={`/produit/${item.product!.slug}`}>
                <img src={item.product!.images[0].url} alt={item.product!.name} className="w-24 h-32 rounded-xl object-cover" />
              </Link>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-400">{item.product!.brand}</p>
                    <Link to={`/produit/${item.product!.slug}`}>
                      <h3 className="font-semibold text-slate-900 hover:text-blue-900 transition-colors">{item.product!.name}</h3>
                    </Link>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span>Taille : {item.size}</span>
                      <span>Couleur : {item.color}</span>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900">{formatPrice(item.product!.price * item.quantity)}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-slate-200 rounded-lg">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)} className="p-2 hover:bg-slate-50 rounded-l-lg"><Minus className="w-4 h-4" /></button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} className="p-2 hover:bg-slate-50 rounded-r-lg"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => { toggleFavorite({ id: item.product!.id, type: 'product' }); removeFromCart(index); }} className="text-sm text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors">
                      <Heart className="w-4 h-4" /> Favoris
                    </button>
                    <button onClick={() => removeFromCart(index)} className="text-sm text-slate-500 hover:text-rose-500 flex items-center gap-1 transition-colors">
                      <Trash2 className="w-4 h-4" /> Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <Link to="/boutique" className="text-sm text-blue-900 font-medium hover:text-blue-700">← Continuer mes achats</Link>
            <button onClick={clearCart} className="text-sm text-slate-400 hover:text-rose-500 transition-colors">Vider le panier</button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-slate-900 text-lg">Récapitulatif</h2>

            {/* Promo code */}
            <div>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2.5 border border-slate-200 rounded-lg">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="Code promo"
                    className="flex-1 outline-none text-sm bg-transparent"
                  />
                </div>
                <button onClick={applyPromo} className="px-4 py-2.5 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors">
                  Appliquer
                </button>
              </div>
              {promoApplied && <p className="text-xs text-emerald-600 mt-1">Code STYLE10 appliqué : -10%</p>}
              {!promoApplied && <p className="text-xs text-slate-400 mt-1">Essayez "STYLE10" pour -10%</p>}
            </div>

            <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
              <div className="flex justify-between text-slate-600">
                <span>Sous-total</span>
                <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Remise (-10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Livraison</span>
                <span className="font-medium text-slate-900">{shipping === 0 ? 'Gratuite' : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-slate-400">Plus que {formatPrice(50 - subtotal)} pour la livraison gratuite</p>
              )}
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-4">
              <span className="font-bold text-slate-900">Total estimé</span>
              <span className="text-xl font-bold text-blue-900">{formatPrice(total)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
            >
              Passer commande <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Truck className="w-4 h-4" /> Livraison estimée : 3-5 jours ouvrés
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
