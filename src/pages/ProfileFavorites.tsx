import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, User, BookOpen, Image as ImageIcon, Plus, Folder } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useApp } from '@/context/AppContext';
import { products, articles, looks, creators } from '@/data/mockData';

const collections = [
  { name: 'Tenues de travail', count: 5 },
  { name: 'Mes idées', count: 3 },
  { name: 'Voyage', count: 8 },
  { name: 'À acheter', count: 12 },
];

export default function ProfileFavorites() {
  const { favorites, user } = useApp();
  const [activeTab, setActiveTab] = useState<'product' | 'look' | 'article' | 'creator'>('product');

  if (!user) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Veuillez vous connecter.</p>
        <Link to="/connexion" className="mt-4 inline-block text-blue-900 font-medium">Connexion</Link>
      </Container>
    );
  }

  const tabs = [
    { id: 'product' as const, label: 'Produits', icon: Heart },
    { id: 'look' as const, label: 'Looks', icon: ImageIcon },
    { id: 'article' as const, label: 'Articles', icon: BookOpen },
    { id: 'creator' as const, label: 'Créateurs', icon: User },
  ];

  const favProducts = favorites.filter(f => f.type === 'product').map(f => products.find(p => p.id === f.id)).filter(Boolean) as typeof products;
  const favLooks = favorites.filter(f => f.type === 'look').map(f => looks.find(l => l.id === f.id)).filter(Boolean);
  const favArticles = favorites.filter(f => f.type === 'article').map(f => articles.find(a => a.id === f.id)).filter(Boolean);
  const favCreators = favorites.filter(f => f.type === 'creator').map(f => creators.find(c => c.id === f.id)).filter(Boolean);

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Profil', to: '/profil' }, { label: 'Mes favoris' }]} />

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Collections sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 text-sm">Collections</h2>
              <button className="p-1.5 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {collections.map(col => (
                <button key={col.name} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  <span className="flex items-center gap-2"><Folder className="w-4 h-4 text-slate-400" /> {col.name}</span>
                  <span className="text-xs text-slate-400">{col.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Favorites */}
        <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Mes favoris</h1>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const count = favorites.filter(f => f.type === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label} {count > 0 && <span className="text-xs text-slate-400">({count})</span>}
                </button>
              );
            })}
          </div>

          {activeTab === 'product' && (
            favProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {favProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <EmptyState icon={Heart} text="Aucun produit favori pour le moment" />
            )
          )}

          {activeTab === 'look' && (
            favLooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {favLooks.map(l => (
                  <Link key={l.id} to="/inspiration" className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100">
                    <img src={l.image} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-0 p-3">
                      <p className="text-white text-sm font-semibold">{l.title}</p>
                      <p className="text-white/60 text-xs">{l.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState icon={ImageIcon} text="Aucun look favori pour le moment" />
            )
          )}

          {activeTab === 'article' && (
            favArticles.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {favArticles.map(a => (
                  <Link key={a.id} to={`/conseils/${a.slug}`} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all">
                    <img src={a.thumbnail} alt={a.title} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                    <div>
                      <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full">{a.category}</span>
                      <h3 className="font-semibold text-slate-900 text-sm mt-2 line-clamp-2">{a.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{a.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState icon={BookOpen} text="Aucun article sauvegardé pour le moment" />
            )
          )}

          {activeTab === 'creator' && (
            favCreators.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4">
                {favCreators.map(c => (
                  <Link key={c.id} to={`/createur/${c.id}`} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all">
                    <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.followers.toLocaleString('fr-FR')} abonnés</p>
                      <div className="flex gap-1 mt-1">
                        {c.specialties.slice(0, 2).map(s => <span key={s} className="text-xs text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full">{s}</span>)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState icon={User} text="Aucun créateur suivi pour le moment" />
            )
          )}
        </div>
      </div>
    </Container>
  );
}

function EmptyState({ icon: Icon, text }: { icon: typeof Heart; text: string }) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
        <Icon className="w-8 h-8 text-slate-300" />
      </div>
      <p className="text-slate-500">{text}</p>
      <Link to="/boutique" className="mt-4 inline-block text-blue-900 font-medium text-sm">Découvrir des produits</Link>
    </div>
  );
}
