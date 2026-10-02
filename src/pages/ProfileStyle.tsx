import { Link } from 'react-router-dom';
import { Palette, RefreshCw, Sparkles, ShoppingBag } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function ProfileStyle() {
  const { user } = useApp();

  if (!user) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Veuillez vous connecter.</p>
        <Link to="/connexion" className="mt-4 inline-block text-blue-900 font-medium">Connexion</Link>
      </Container>
    );
  }

  const primaryStyle = 'Casual chic';
  const secondaryStyles = ['Minimaliste', 'Streetwear'];
  const favoriteColors = [
    { name: 'Noir', hex: '#1a1a1a' },
    { name: 'Blanc', hex: '#f5f5f0' },
    { name: 'Bleu nuit', hex: '#0f172a' },
  ];
  const morphology = 'Morphologie en V — Épaules larges, taille fine';
  const recommendedProducts = products.filter(p => p.style === 'Casual' || p.style === 'Minimaliste').slice(0, 4);

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Profil', to: '/profil' }, { label: 'Mon style' }]} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-900 text-sm font-medium mb-3">
            <Palette className="w-4 h-4" /> Profil stylistique
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Votre profil stylistique</h1>
          <p className="text-slate-500 mt-2">Découvrez les recommandations basées sur votre style unique.</p>
        </div>

        {/* Style cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl p-6">
            <Sparkles className="w-8 h-8 mb-3" />
            <p className="text-sm text-blue-200">Style principal</p>
            <p className="text-2xl font-bold mt-1">{primaryStyle}</p>
          </div>
          {secondaryStyles.map((s, i) => (
            <div key={s} className="bg-white border border-slate-100 rounded-2xl p-6">
              <Sparkles className="w-8 h-8 text-slate-300 mb-3" />
              <p className="text-sm text-slate-400">Style secondaire {i + 1}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{s}</p>
            </div>
          ))}
        </div>

        {/* Colors */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Palette className="w-5 h-5 text-blue-900" /> Couleurs préférées</h2>
          <div className="flex items-center gap-6">
            {favoriteColors.map(c => (
              <div key={c.name} className="text-center">
                <div className="w-16 h-16 rounded-2xl shadow-lg border-4 border-white" style={{ backgroundColor: c.hex }} />
                <p className="text-xs text-slate-500 mt-2">{c.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Morphology */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-6">
          <h2 className="font-bold text-slate-900 mb-2">Morphologie</h2>
          <p className="text-slate-600 text-sm">{morphology}</p>
          <p className="text-slate-500 text-sm mt-2">Vos vêtements sont sélectionnés pour flatter votre silhouette. Privilégiez les coupes ajustées et les couleurs sombres pour équilibrer le haut du corps.</p>
        </div>

        {/* Recommended products */}
        <div className="mb-6">
          <h2 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-blue-900" /> Produits recommandés pour votre style</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* Action */}
        <div className="text-center">
          <Link to="/style" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors">
            <RefreshCw className="w-4 h-4" /> Mettre à jour mon style
          </Link>
        </div>
      </div>
    </Container>
  );
}
