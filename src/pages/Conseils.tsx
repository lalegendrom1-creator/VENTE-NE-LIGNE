import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Heart, BookOpen, Video, GraduationCap, FileText, Image as ImageIcon, Bookmark } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { articles, articleCategories } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const contentTypes = [
  { value: 'all', label: 'Tous', icon: BookOpen },
  { value: 'article', label: 'Articles', icon: FileText },
  { value: 'video', label: 'Vidéos', icon: Video },
  { value: 'tutoriel', label: 'Tutoriels', icon: GraduationCap },
  { value: 'guide', label: 'Guides', icon: BookOpen },
  { value: 'infographie', label: 'Infographies', icon: ImageIcon },
];

export default function Conseils() {
  const { toggleFavorite, isFavorite } = useApp();
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [savedItems, setSavedItems] = useState<string[]>([]);

  const filtered = articles.filter(a => {
    const catMatch = selectedCat === 'all' || a.category === selectedCat;
    const typeMatch = selectedType === 'all' || a.type === selectedType;
    return catMatch && typeMatch;
  });

  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toggleFavorite({ id, type: 'article' });
  };

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Conseils' }]} />

      {/* Hero */}
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden mb-8">
        <img src="https://images.pexels.com/photos/7081132/pexels-photo-7081132.jpeg?auto=compress&cs=tinysrgb&h=400&w=1200" alt="Apprendre" className="w-full h-48 sm:h-64 object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/40" />
        <div className="absolute inset-0 flex items-center px-6 sm:px-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-3">
              <GraduationCap className="w-4 h-4" /> Centre d'apprentissage
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Apprenez à mieux vous habiller</h1>
            <p className="text-slate-200 mt-2 max-w-md">Articles, guides, tutoriels et vidéos pour développer votre sens du style.</p>
          </div>
        </div>
      </div>

      {/* Type filters */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        {contentTypes.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.value}
              onClick={() => setSelectedType(t.value)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                selectedType === t.value ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" /> {t.label}
            </button>
          );
        })}
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${selectedCat === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
        >
          Toutes les catégories
        </button>
        {articleCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${selectedCat === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Aucun contenu dans cette catégorie pour le moment.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(a => (
            <div key={a.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
              <Link to={`/conseils/${a.slug}`}>
                <div className="aspect-video overflow-hidden relative">
                  <img src={a.thumbnail} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-blue-900 rounded-full capitalize">
                    {a.type}
                  </span>
                </div>
              </Link>
              <div className="p-5">
                <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full">{a.category}</span>
                <Link to={`/conseils/${a.slug}`}>
                  <h3 className="font-semibold text-slate-900 mt-3 line-clamp-2 group-hover:text-blue-900 transition-colors">{a.title}</h3>
                </Link>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{a.excerpt}</p>

                <div className="flex items-center gap-3 mt-4">
                  <img src={a.authorAvatar} alt={a.author} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs text-slate-600 font-medium">{a.author}</span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {a.readTime}</span>
                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {a.views.toLocaleString('fr-FR')}</span>
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {a.likes}</span>
                  </div>
                  <button
                    onClick={() => toggleSave(a.id)}
                    className={`p-1.5 rounded-lg transition-colors ${savedItems.includes(a.id) ? 'text-blue-900 bg-blue-50' : 'text-slate-300 hover:text-slate-500'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${savedItems.includes(a.id) ? 'fill-blue-900' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
