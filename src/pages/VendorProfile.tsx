import { useParams, Link } from 'react-router-dom';
import { Star, Package, ShoppingBag, MapPin, MessageCircle, Store } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { brands, products } from '@/data/mockData';

export default function VendorProfile() {
  const { id } = useParams();
  const brand = brands.find(b => b.id === id);

  if (!brand) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Vendeur introuvable.</p>
        <Link to="/boutique" className="mt-4 inline-block text-blue-900 font-medium">Retour à la boutique</Link>
      </Container>
    );
  }

  const vendorProducts = products.filter(p => p.vendorId === brand.id);

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Boutique', to: '/boutique' }, { label: brand.name }]} />

      {/* Vendor header */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-blue-900 to-slate-800" />
        <div className="px-6 pb-6">
          <div className="flex items-start gap-4 -mt-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center border-4 border-white shadow-lg flex-shrink-0">
              <span className="text-white font-bold text-2xl">{brand.name.charAt(0)}</span>
            </div>
            <div className="flex-1 mt-4">
              <h1 className="text-2xl font-bold text-slate-900">{brand.name}</h1>
              <p className="text-sm text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" /> {brand.country}</p>
              <p className="text-sm text-slate-600 mt-3 max-w-xl">{brand.description}</p>
            </div>
            <button className="mt-4 flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50 transition-colors">
              <MessageCircle className="w-4 h-4" /> Contacter
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-50">
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
              </div>
              <p className="text-lg font-bold text-slate-900">{brand.rating}</p>
              <p className="text-xs text-slate-400">Note</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2">
                <Package className="w-5 h-5 text-blue-900" />
              </div>
              <p className="text-lg font-bold text-slate-900">{brand.productCount}</p>
              <p className="text-xs text-slate-400">Produits</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-2">
                <ShoppingBag className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-lg font-bold text-slate-900">{brand.sales.toLocaleString('fr-FR')}</p>
              <p className="text-xs text-slate-400">Ventes</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2">
                <Store className="w-5 h-5 text-slate-600" />
              </div>
              <p className="text-lg font-bold text-slate-900">{brand.country}</p>
              <p className="text-xs text-slate-400">Pays</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Tous les produits ({vendorProducts.length})</h2>
        {vendorProducts.length === 0 ? (
          <p className="text-slate-400 text-center py-12">Aucun produit disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {vendorProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </Container>
  );
}
