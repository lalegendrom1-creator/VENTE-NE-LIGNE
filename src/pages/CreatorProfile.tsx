import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Heart, ShoppingBag, Grid, UserPlus, Check } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { creators, products, posts } from '@/data/mockData';

export default function CreatorProfile() {
  const { id } = useParams();
  const creator = creators.find(c => c.id === id);
  const [isFollowing, setIsFollowing] = useState(creator?.isFollowing || false);
  const [followers, setFollowers] = useState(creator?.followers || 0);

  if (!creator) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Créateur introuvable.</p>
        <Link to="/communaute" className="mt-4 inline-block text-blue-900 font-medium">Retour à la communauté</Link>
      </Container>
    );
  }

  const creatorProducts = (creator.productIds || [])
    .map(pid => products.find(p => p.id === pid))
    .filter(Boolean) as typeof products;
  const creatorPosts = posts.slice(0, 6);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers(isFollowing ? followers - 1 : followers + 1);
  };

  return (
    <div>
      {/* Banner */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-800 relative">
        <img src="https://images.pexels.com/photos/6220702/pexels-photo-6220702.jpeg?auto=compress&cs=tinysrgb&h=400&w=1200" alt="" className="w-full h-full object-cover opacity-30" />
      </div>

      <Container className="relative -mt-16 sm:-mt-20">
        <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Communauté', to: '/communaute' }, { label: creator.name }]} />

        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img src={creator.avatar} alt={creator.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg -mt-12 sm:-mt-16" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{creator.name}</h1>
              <p className="text-sm text-slate-400 flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" /> {creator.country}</p>
              <p className="text-sm text-slate-600 mt-3 max-w-xl">{creator.bio}</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {creator.specialties.map(s => (
                  <span key={s} className="px-3 py-1 bg-blue-50 text-blue-900 text-xs font-medium rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <button
              onClick={handleFollow}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                isFollowing ? 'bg-slate-100 text-slate-700' : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              {isFollowing ? <><Check className="w-4 h-4" /> Suivi</> : <><UserPlus className="w-4 h-4" /> Suivre</>}
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 sm:gap-8 mt-6 pt-6 border-t border-slate-50">
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">{followers.toLocaleString('fr-FR')}</p>
              <p className="text-xs text-slate-400">Abonnés</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">{creator.following}</p>
              <p className="text-xs text-slate-400">Abonnements</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-slate-900">{creator.posts}</p>
              <p className="text-xs text-slate-400">Publications</p>
            </div>
          </div>
        </div>

        {/* Products */}
        {creatorProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-900" /> Produits recommandés
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {creatorProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Grid className="w-5 h-5 text-blue-900" /> Publications
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {creatorPosts.map(post => (
              <Link key={post.id} to={`/post/${post.id}`} className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                <img src={post.image} alt={post.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                  <div className="flex items-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4 fill-white" /> {post.likes}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {post.comments.length}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
