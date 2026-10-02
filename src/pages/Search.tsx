import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, BookOpen, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, articles, looks } from '@/data/mockData';

export default function Search() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';

  const query = q.toLowerCase();
  const matchedProducts = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.brand.toLowerCase().includes(query) ||
    p.style.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );
  const matchedArticles = articles.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.excerpt.toLowerCase().includes(query) ||
    a.category.toLowerCase().includes(query) ||
    a.tags.some(t => t.toLowerCase().includes(query))
  );
  const matchedLooks = looks.filter(l =>
    l.title.toLowerCase().includes(query) ||
    l.category.toLowerCase().includes(query) ||
    l.style.toLowerCase().includes(query)
  );

  const hasResults = matchedProducts.length > 0 || matchedArticles.length > 0 || matchedLooks.length > 0;

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Recherche' }]} />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          {q ? `Résultats pour "${q}"` : 'Recherche'}
        </h1>
        <p className="text-slate-500 mt-2">
          {hasResults
            ? `${matchedProducts.length} produit(s), ${matchedArticles.length} article(s), ${matchedLooks.length} look(s)`
            : 'Aucun résultat trouvé'
          }
        </p>
      </div>

      {!hasResults && q && (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Aucun résultat</h2>
          <p className="text-slate-500 mt-2">Essayez d'autres mots-clés comme "chemise", "robe", "streetwear".</p>
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {['Chemise homme', 'Robe élégante', 'Streetwear', 'Sneakers', 'Montre'].map(s => (
              <Link key={s} to={`/recherche?q=${encodeURIComponent(s)}`} className="px-4 py-2 bg-slate-100 text-slate-600 text-sm rounded-full hover:bg-slate-200 transition-colors">
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}

      {!q && (
        <div className="text-center py-20">
          <SearchIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Utilisez la barre de recherche en haut pour trouver des produits, articles et looks.</p>
        </div>
      )}

      {/* Products */}
      {matchedProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-900" /> Produits ({matchedProducts.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {matchedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* Articles */}
      {matchedArticles.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-900" /> Articles & Conseils ({matchedArticles.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedArticles.map(a => (
              <Link key={a.id} to={`/conseils/${a.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={a.thumbnail} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2 py-1 rounded-full">{a.category}</span>
                  <h3 className="font-semibold text-slate-900 mt-2 line-clamp-2 group-hover:text-blue-900 transition-colors">{a.title}</h3>
                  <p className="text-xs text-slate-400 mt-2">{a.readTime} · {a.views.toLocaleString('fr-FR')} vues</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Looks */}
      {matchedLooks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-900" /> Looks & Inspiration ({matchedLooks.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {matchedLooks.map(l => (
              <Link key={l.id} to="/inspiration" className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100">
                <img src={l.image} alt={l.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-white font-semibold text-sm">{l.title}</h3>
                  <p className="text-white/60 text-xs">{l.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
