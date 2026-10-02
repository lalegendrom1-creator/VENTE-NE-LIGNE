import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, Plus, MapPin } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { posts as initialPosts } from '@/data/mockData';
import type { Post } from '@/types';

export default function Communaute() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeTab, setActiveTab] = useState('foryou');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'foryou', label: 'Pour vous' },
    { id: 'trending', label: 'Tendance' },
    { id: 'following', label: 'Abonnements' },
  ];

  const toggleLike = (id: string) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: likedPosts.includes(id) ? p.likes - 1 : p.likes + 1 } : p));
  };

  const toggleSave = (id: string) => {
    setSavedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleComments = (id: string) => {
    setExpandedComments(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const sortedPosts = activeTab === 'trending'
    ? [...posts].sort((a, b) => b.likes - a.likes)
    : posts;

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Communauté' }]} />

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Communauté</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 text-white rounded-xl font-medium text-sm hover:bg-blue-800 transition-colors"
          >
            <Plus className="w-4 h-4" /> Publier
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 border-b border-slate-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {sortedPosts.map(post => {
            const liked = likedPosts.includes(post.id);
            const saved = savedPosts.includes(post.id);
            const showComments = expandedComments.includes(post.id);

            return (
              <div key={post.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
                {/* User header */}
                <div className="flex items-center gap-3 p-4">
                  <Link to={`/createur/${post.id}`}>
                    <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 text-sm">{post.userName}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {post.userCountry} · {post.createdAt}
                    </p>
                  </div>
                </div>

                {/* Image */}
                <Link to={`/post/${post.id}`}>
                  <div className="aspect-square overflow-hidden bg-slate-100">
                    <img src={post.image} alt={post.caption} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-4 px-4 py-3">
                  <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-sm transition-colors">
                    <Heart className={`w-5 h-5 ${liked ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                    <span className={liked ? 'text-rose-500 font-medium' : 'text-slate-600'}>{post.likes}</span>
                  </button>
                  <button onClick={() => toggleComments(post.id)} className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <MessageCircle className="w-5 h-5" /> {post.comments.length}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    <Share2 className="w-5 h-5" /> {post.shares}
                  </button>
                  <button onClick={() => toggleSave(post.id)} className="ml-auto">
                    <Bookmark className={`w-5 h-5 ${saved ? 'fill-blue-900 text-blue-900' : 'text-slate-600'}`} />
                  </button>
                </div>

                {/* Caption */}
                <div className="px-4 pb-4">
                  <p className="text-sm text-slate-700">{post.caption}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {post.hashtags.map(tag => (
                      <span key={tag} className="text-xs text-blue-900 font-medium">{tag}</span>
                    ))}
                  </div>

                  {/* Comments */}
                  {showComments && post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-50 space-y-3">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-2">
                          <img src={comment.userAvatar} alt={comment.userName} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                          <div>
                            <p className="text-xs"><span className="font-medium text-slate-900">{comment.userName}</span> <span className="text-slate-600">{comment.text}</span></p>
                            <p className="text-xs text-slate-400 mt-0.5">{comment.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Create modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Créer une publication</h2>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center mb-4">
              <Plus className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Cliquez pour sélectionner une photo de votre look</p>
            </div>
            <textarea placeholder="Décrivez votre look..." className="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors mb-4" rows={3} />
            <button
              onClick={() => { setShowCreateModal(false); alert('Publication créée ! (démo)'); }}
              className="w-full py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors"
            >
              Publier
            </button>
          </div>
        </div>
      )}
    </Container>
  );
}
