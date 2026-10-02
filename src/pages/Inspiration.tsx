import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { looks, products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const filterTabs = ['Tous', 'Homme', 'Femme', 'Streetwear', 'Chic', 'Casual', 'Business', 'Sport', 'Traditionnel', 'Cérémonie'];

export default function Inspiration() {
  const { toggleFavorite, isFavorite } = useApp();
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedLook, setSelectedLook] = useState<typeof looks[0] | null>(null);

  const filtered = activeFilter === 'Tous'
    ? looks
    : looks.filter(l =>
        l.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
        l.gender.toLowerCase().includes(activeFilter.toLowerCase()) ||
        l.style.toLowerCase().includes(activeFilter.toLowerCase())
      );

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Inspiration' }]} />

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Inspiration</h1>
        <p className="text-slate-500 mt-2">Découvrez des looks tendance et trouvez l'inspiration pour votre prochain style.</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {filterTabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
              activeFilter === tab ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Looks grid - masonry style */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {filtered.map(look => {
          const fav = isFavorite(look.id, 'look');
          return (
            <div key={look.id} className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedLook(look)}>
              <img src={look.image} alt={look.title} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs text-white/70 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">{look.category}</span>
                <h3 className="text-white font-semibold text-sm mt-2">{look.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Heart className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/70">{look.likes}</span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite({ id: look.id, type: 'look' }); }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all"
              >
                <Heart className={`w-4 h-4 ${fav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Look detail modal */}
      {selectedLook && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedLook(null)}>
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="grid sm:grid-cols-2">
              <div className="relative">
                <img src={selectedLook.image} alt={selectedLook.title} className="w-full h-full object-cover min-h-[300px]" />
                <button onClick={() => setSelectedLook(null)} className="absolute top-3 right-3 sm:hidden w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
                  <X className="w-5 h-5 text-slate-700" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full">{selectedLook.category}</span>
                    <h2 className="text-2xl font-bold text-slate-900 mt-3">{selectedLook.title}</h2>
                    <p className="text-slate-500 mt-2 text-sm">{selectedLook.description}</p>
                    <div className="flex items-center gap-3 mt-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {selectedLook.likes} likes</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedLook(null)} className="hidden sm:flex w-9 h-9 rounded-full bg-slate-100 items-center justify-center hover:bg-slate-200 transition-colors">
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-blue-900" /> Produits utilisés dans cette tenue
                  </h3>
                  <div className="space-y-3">
                    {selectedLook.productIds.map(pid => {
                      const product = products.find(p => p.id === pid);
                      if (!product) return null;
                      return (
                        <Link key={pid} to={`/produit/${product.slug}`} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <img src={product.images[0].url} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{product.name}</p>
                            <p className="text-xs text-slate-400">{product.brand}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </Link>
                      );
                    })}
                  </div>
                  <Link to="/boutique" className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors">
                    Acheter l'ensemble <ShoppingBag className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
