import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Send, ArrowLeft } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { posts, products } from '@/data/mockData';

export default function PostDetail() {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Publication introuvable.</p>
        <Link to="/communaute" className="mt-4 inline-block text-blue-900 font-medium">Retour à la communauté</Link>
      </Container>
    );
  }

  const relatedPosts = posts.filter(p => p.id !== post.id).slice(0, 4);

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, {
        id: `c${Date.now()}`,
        userName: 'Vous',
        userAvatar: 'https://images.pexels.com/photos/7897299/pexels-photo-7897299.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
        text: newComment,
        date: new Date().toISOString().split('T')[0],
      }]);
      setNewComment('');
    }
  };

  const postProducts = post.productIds?.map(pid => products.find(p => p.id === pid)).filter(Boolean) || [];

  return (
    <Container className="py-6">
      <Breadcrumb items={[
        { label: 'Accueil', to: '/' },
        { label: 'Communauté', to: '/communaute' },
        { label: 'Publication' },
      ]} />

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 sticky top-24">
            <img src={post.image} alt={post.caption} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* User */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-100">
            <img src={post.userAvatar} alt={post.userName} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{post.userName}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {post.userCountry}
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors">
              Suivre
            </button>
          </div>

          {/* Caption */}
          <div className="p-4 border-b border-slate-100">
            <p className="text-sm text-slate-700">{post.caption}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {post.hashtags.map(tag => (
                <span key={tag} className="text-xs text-blue-900 font-medium">{tag}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-slate-100">
            <button onClick={() => setLiked(!liked)} className="flex items-center gap-1.5 text-sm">
              <Heart className={`w-5 h-5 ${liked ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
              <span className={liked ? 'text-rose-500 font-medium' : 'text-slate-600'}>{post.likes + (liked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-slate-600">
              <MessageCircle className="w-5 h-5" /> {comments.length}
            </button>
            <button className="flex items-center gap-1.5 text-sm text-slate-600">
              <Share2 className="w-5 h-5" /> {post.shares}
            </button>
            <button onClick={() => setSaved(!saved)} className="ml-auto">
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-blue-900 text-blue-900' : 'text-slate-600'}`} />
            </button>
          </div>

          {/* Products */}
          {postProducts.length > 0 && (
            <div className="p-4 border-b border-slate-100">
              <p className="text-sm font-bold text-slate-900 mb-3">Produits dans cette publication</p>
              <div className="space-y-2">
                {postProducts.map(p => p && (
                  <Link key={p.id} to={`/produit/${p.slug}`} className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <img src={p.images[0].url} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 line-clamp-1">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.brand}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-64">
            {comments.map(comment => (
              <div key={comment.id} className="flex items-start gap-3">
                <img src={comment.userAvatar} alt={comment.userName} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div>
                  <p className="text-sm"><span className="font-medium text-slate-900">{comment.userName}</span> <span className="text-slate-600">{comment.text}</span></p>
                  <p className="text-xs text-slate-400 mt-0.5">{comment.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comment input */}
          <form onSubmit={handleComment} className="p-4 border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Ajoutez un commentaire..."
              className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-900/20 transition-all"
            />
            <button type="submit" disabled={!newComment.trim()} className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors disabled:opacity-40">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Related posts */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Autres publications</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedPosts.map(p => (
            <Link key={p.id} to={`/post/${p.id}`} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
              <img src={p.image} alt={p.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-0 p-3">
                <p className="text-white text-xs font-medium">{p.userName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center gap-1 text-white/70 text-xs"><Heart className="w-3 h-3" /> {p.likes}</span>
                  <span className="flex items-center gap-1 text-white/70 text-xs"><MessageCircle className="w-3 h-3" /> {p.comments.length}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
