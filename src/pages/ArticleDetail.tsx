import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, Heart, Bookmark, ArrowLeft, Share2, ThumbsUp, User } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { articles } from '@/data/mockData';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(article?.likes || 0);

  if (!article) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Article introuvable.</p>
        <Link to="/conseils" className="mt-4 inline-block text-blue-900 font-medium">Retour aux conseils</Link>
      </Container>
    );
  }

  const related = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Container className="py-6">
      <Breadcrumb items={[
        { label: 'Accueil', to: '/' },
        { label: 'Conseils', to: '/conseils' },
        { label: article.title },
      ]} />

      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full">{article.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 tracking-tight">{article.title}</h1>
          <p className="text-lg text-slate-500 mt-3">{article.excerpt}</p>
        </div>

        {/* Author & meta */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img src={article.authorAvatar} alt={article.author} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-medium text-slate-900">{article.author}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString('fr-FR')} vues</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${liked ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} /> {likeCount.toLocaleString('fr-FR')}
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-lg transition-colors ${saved ? 'bg-blue-50 text-blue-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-900' : ''}`} />
            </button>
            <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero image */}
        <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-slate-100">
          <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none space-y-4">
          {article.content.map((paragraph, i) => (
            <p key={i} className="text-slate-700 leading-relaxed text-base sm:text-lg">{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-slate-100">
          {article.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm rounded-full">#{tag}</span>
          ))}
        </div>

        {/* Author card */}
        <div className="mt-8 bg-slate-50 rounded-2xl p-6 flex items-center gap-4">
          <img src={article.authorAvatar} alt={article.author} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="text-sm text-slate-400">Écrit par</p>
            <p className="font-bold text-slate-900">{article.author}</p>
            <p className="text-sm text-slate-500 mt-1">Expert mode et conseiller stylistique sur StyleWorld.</p>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto mt-16">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Articles similaires</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(a => (
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
        </div>
      )}
    </Container>
  );
}
