import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Container, Breadcrumb, SectionTitle } from '@/components/Layout';
import { categories } from '@/data/mockData';

const popularStyles = [
  'Casual', 'Chic', 'Streetwear', 'Classique', 'Sport', 'Élégant',
  'Minimaliste', 'Vintage', 'Traditionnel', 'Business', 'Y2K', 'Afro', 'Fashion',
];

export default function Categories() {
  const [selectedGender, setSelectedGender] = useState<string>('all');

  const filtered = selectedGender === 'all'
    ? categories
    : categories.filter(c => c.gender === selectedGender || (!c.gender && selectedGender === 'accessoires'));

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Catégories' }]} />

      <div className="relative bg-slate-900 rounded-3xl overflow-hidden mb-10">
        <img src="https://images.pexels.com/photos/6220660/pexels-photo-6220660.jpeg?auto=compress&cs=tinysrgb&h=400&w=1200" alt="Catégories" className="w-full h-48 sm:h-64 object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/40" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Catégories</h1>
            <p className="text-slate-200 mt-2 max-w-md">Explorez toutes nos catégories de mode et trouvez exactement ce que vous cherchez.</p>
          </div>
        </div>
      </div>

      {/* Gender filter */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedGender('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${selectedGender === 'all' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Toutes
        </button>
        {['homme', 'femme', 'enfant'].map(g => (
          <button
            key={g}
            onClick={() => setSelectedGender(g)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${selectedGender === g ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}s
          </button>
        ))}
        <button
          onClick={() => setSelectedGender('accessoires')}
          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${selectedGender === 'accessoires' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Accessoires
        </button>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map(cat => (
          <Link
            key={cat.id}
            to={`/boutique?cat=${cat.id}`}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100"
          >
            <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-base">{cat.name}</h3>
              <p className="text-white/60 text-xs mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Découvrir <ArrowRight className="w-3 h-3" />
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Popular styles */}
      <div className="mt-16">
        <SectionTitle title="Styles populaires" subtitle="Découvrez nos vêtements par style vestimentaire" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {popularStyles.map(style => (
            <Link
              key={style}
              to={`/boutique`}
              className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-lg hover:border-slate-200 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium text-slate-900 text-sm">{style}</span>
              <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
