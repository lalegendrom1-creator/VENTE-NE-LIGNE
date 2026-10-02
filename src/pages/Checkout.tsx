import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Smartphone, Wallet, Truck, MapPin, User as UserIcon, ChevronRight } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const steps = ['Informations', 'Adresse', 'Livraison', 'Paiement', 'Confirmation'];

export default function Checkout() {
  const { cart, formatPrice, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [formData, setFormData] = useState({
    name: user?.name || '', email: user?.email || '', phone: '',
    address: '', city: '', postalCode: '', country: 'France',
    cardNumber: '', cardName: '', cardExpiry: '', cardCvv: '',
  });

  const cartItems = cart.map(item => ({
    ...item, product: products.find(p => p.id === item.productId)!,
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = shippingMethod === 'express' ? 14.90 : shippingMethod === 'relay' ? 3.90 : subtotal > 50 ? 0 : 5.90;
  const total = subtotal + shippingCost;

  const updateField = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleNext = () => {
    if (step < 4) {
      if (step === 3) {
        clearCart();
        setStep(4);
      } else {
        setStep(step + 1);
      }
    }
  };

  if (cartItems.length === 0 && step < 4) {
    return (
      <Container className="py-16 text-center">
        <p className="text-slate-400">Votre panier est vide.</p>
        <Link to="/boutique" className="mt-4 inline-block text-blue-900 font-medium">Aller à la boutique</Link>
      </Container>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-slate-200 rounded-lg outline-none focus:border-blue-500 transition-colors text-sm";

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Panier', to: '/panier' }, { label: 'Commande' }]} />

      {/* Steps indicator */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              i <= step ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${i <= step ? 'text-slate-900' : 'text-slate-400'}`}>{s}</span>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300" />}
          </div>
        ))}
      </div>

      {step === 4 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Commande confirmée !</h1>
          <p className="text-slate-500 mt-2">Merci pour votre achat. Un email de confirmation a été envoyé.</p>
          <div className="mt-6 inline-block bg-slate-50 rounded-2xl px-8 py-4">
            <p className="text-sm text-slate-500">Numéro de commande</p>
            <p className="text-xl font-bold text-blue-900">#SW-2026-00125</p>
          </div>
          <div className="mt-6 flex gap-3 justify-center">
            <Link to="/profil/commandes" className="px-6 py-3 bg-blue-900 text-white rounded-xl font-medium hover:bg-blue-800 transition-colors">Suivre ma commande</Link>
            <Link to="/boutique" className="px-6 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors">Continuer mes achats</Link>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Step 1: Personal info */}
            {step === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><UserIcon className="w-5 h-5 text-blue-900" /> Informations personnelles</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-slate-700 mb-1 block">Nom complet</label><input className={inputClass} value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="Jean Dupont" /></div>
                  <div><label className="text-sm font-medium text-slate-700 mb-1 block">Email</label><input className={inputClass} value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="jean@email.com" /></div>
                  <div><label className="text-sm font-medium text-slate-700 mb-1 block">Téléphone</label><input className={inputClass} value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+33 6 12 34 56 78" /></div>
                </div>
              </div>
            )}

            {/* Step 2: Address */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-900" /> Adresse de livraison</h2>
                <div><label className="text-sm font-medium text-slate-700 mb-1 block">Adresse</label><input className={inputClass} value={formData.address} onChange={e => updateField('address', e.target.value)} placeholder="12 rue de la Mode" /></div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div><label className="text-sm font-medium text-slate-700 mb-1 block">Ville</label><input className={inputClass} value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="Paris" /></div>
                  <div><label className="text-sm font-medium text-slate-700 mb-1 block">Code postal</label><input className={inputClass} value={formData.postalCode} onChange={e => updateField('postalCode', e.target.value)} placeholder="75001" /></div>
                  <div><label className="text-sm font-medium text-slate-700 mb-1 block">Pays</label><select className={inputClass} value={formData.country} onChange={e => updateField('country', e.target.value)}><option>France</option><option>Sénégal</option><option>États-Unis</option><option>Royaume-Uni</option><option>Canada</option><option>Allemagne</option><option>Espagne</option><option>Italie</option><option>Japon</option></select></div>
                </div>
              </div>
            )}

            {/* Step 3: Shipping */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Truck className="w-5 h-5 text-blue-900" /> Mode de livraison</h2>
                {[
                  { id: 'standard', label: 'Livraison standard', desc: '3-5 jours ouvrés', price: subtotal > 50 ? 0 : 5.90 },
                  { id: 'express', label: 'Livraison express', desc: '24-48h', price: 14.90 },
                  { id: 'relay', label: 'Point relais', desc: '4-6 jours', price: 3.90 },
                  { id: 'international', label: 'Livraison internationale', desc: '7-14 jours', price: 12.90 },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setShippingMethod(opt.id)}
                    className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                      shippingMethod === opt.id ? 'border-blue-900 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingMethod === opt.id ? 'border-blue-900' : 'border-slate-300'}`}>
                        {shippingMethod === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-900" />}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-900">{opt.label}</p>
                        <p className="text-sm text-slate-500">{opt.desc}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-900">{opt.price === 0 ? 'Gratuit' : formatPrice(opt.price)}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-900" /> Mode de paiement</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'card', label: 'Carte', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: Wallet },
                    { id: 'stripe', label: 'Stripe', icon: CreditCard },
                    { id: 'mobile', label: 'Mobile Money', icon: Smartphone },
                  ].map(m => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => setPaymentMethod(m.id)}
                        className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all ${
                          paymentMethod === m.id ? 'border-blue-900 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-slate-700" />
                        <span className="text-sm font-medium">{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mt-4">
                    <div><label className="text-sm font-medium text-slate-700 mb-1 block">Numéro de carte</label><input className={inputClass} value={formData.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="1234 5678 9012 3456" /></div>
                    <div><label className="text-sm font-medium text-slate-700 mb-1 block">Nom sur la carte</label><input className={inputClass} value={formData.cardName} onChange={e => updateField('cardName', e.target.value)} placeholder="JEAN DUPONT" /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-sm font-medium text-slate-700 mb-1 block">Expiration</label><input className={inputClass} value={formData.cardExpiry} onChange={e => updateField('cardExpiry', e.target.value)} placeholder="MM/AA" /></div>
                      <div><label className="text-sm font-medium text-slate-700 mb-1 block">CVV</label><input className={inputClass} value={formData.cardCvv} onChange={e => updateField('cardCvv', e.target.value)} placeholder="123" /></div>
                    </div>
                  </div>
                )}
                {paymentMethod === 'paypal' && <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-xl">Vous serez redirigé vers PayPal pour finaliser le paiement.</p>}
                {paymentMethod === 'stripe' && <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-xl">Paiement sécurisé via Stripe. Vos informations bancaires sont protégées.</p>}
                {paymentMethod === 'mobile' && (
                  <div className="space-y-4 mt-4">
                    <div><label className="text-sm font-medium text-slate-700 mb-1 block">Numéro Mobile Money</label><input className={inputClass} placeholder="+221 77 123 45 67" /></div>
                    <div><label className="text-sm font-medium text-slate-700 mb-1 block">Opérateur</label><select className={inputClass}><option>Orange Money</option><option>Wave</option><option>MTN Mobile Money</option><option>Moov Money</option></select></div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Retour
                </button>
              ) : (
                <Link to="/panier" className="px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Retour au panier
                </Link>
              )}
              <button onClick={handleNext} className="px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors">
                {step === 3 ? 'Confirmer et payer' : 'Continuer'}
              </button>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-slate-900">Votre commande</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <img src={item.product.images[0].url} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-slate-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-slate-400">{item.size} · {item.color} · ×{item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-slate-100 pt-4">
                <div className="flex justify-between text-slate-600"><span>Sous-total</span><span className="font-medium text-slate-900">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-slate-600"><span>Livraison</span><span className="font-medium text-slate-900">{shippingCost === 0 ? 'Gratuit' : formatPrice(shippingCost)}</span></div>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-4">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-blue-900">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
