import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, Palette, Heart, ShoppingBag, GraduationCap, Users, Star, TrendingUp, Zap } from 'lucide-react';
import { Container, SectionTitle } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { categories, products, looks, articles, posts, brands, creators } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function Home() {
  const { currency } = useApp();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const popularProducts = products.filter(p => p.isBestSeller || p.isOnSale).slice(0, 8);
  const newProducts = products.filter(p => p.isNew).slice(0, 4);
  const trendingLooks = looks.slice(0, 4);
  const featuredArticles = articles.slice(0, 3);
  const communityPosts = posts.slice(0, 3);
  const topBrands = brands.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6220702/pexels-photo-6220702.jpeg?auto=compress&cs=tinysrgb&h=1200&w=2000"
            alt="Mode diverse"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        <Container className="relative">
          <div className="py-20 lg:py-32 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Nouvelle collection automne 2026</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Découvrez votre style.
            </h1>
            <p className="mt-4 text-lg text-slate-200 leading-relaxed max-w-xl">
              Achetez, apprenez, inspirez-vous et trouvez les vêtements qui vous correspondent. Une plateforme mondiale de mode pour chaque personne.
            </p>

            {/* Search bar */}
            <div className="mt-8 max-w-xl">
              <form onSubmit={e => { e.preventDefault(); if (searchValue) navigate(`/recherche?q=${encodeURIComponent(searchValue)}`); }}>
                <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-2xl">
                  <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Que recherchez-vous ? Chemise homme, robe élégante..."
                    className="flex-1 outline-none text-slate-900 placeholder:text-slate-400 text-sm bg-transparent"
                  />
                  <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition-colors flex-shrink-0">
                    Rechercher
                  </button>
                </div>
              </form>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="text-xs text-slate-300">Suggestions :</span>
                {['Chemise homme', 'Robe élégante', 'Style streetwear', 'Tenue entretien'].map(s => (
                  <Link key={s} to={`/recherche?q=${s}`} className="text-xs text-white/70 hover:text-white bg-white/10 px-2.5 py-1 rounded-full transition-colors">
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/boutique" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                <ShoppingBag className="w-4 h-4" />
                Découvrir la boutique
              </Link>
              <Link to="/style" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors">
                <Sparkles className="w-4 h-4" />
                Trouver mon style
              </Link>
              <Link to="/conseils" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                <GraduationCap className="w-4 h-4" />
                Explorer les conseils
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <Container className="py-16">
        <SectionTitle title="Catégories populaires" subtitle="Explorez nos sélections pour chaque style et chaque occasion" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/boutique?cat=${cat.id}`}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100"
            >
              <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm sm:text-base">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Style Quiz CTA */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <Container className="py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-4">
                <Palette className="w-4 h-4" />
                <span>Profil stylistique personnalisé</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Quel est votre style ?</h2>
              <p className="text-blue-100 text-lg max-w-lg mb-6">
                Répondez à notre questionnaire interactif et découvrez votre profil stylistique unique. Couleurs, coupes, styles recommandés — tout est personnalisé pour vous.
              </p>
              <Link to="/style" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                Commencer le test
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 w-full">
              {['Casual', 'Streetwear', 'Élégant', 'Minimaliste', 'Business', 'Afro'].map(s => (
                <div key={s} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center border border-white/10">
                  <p className="text-lg font-semibold">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Popular Products */}
      <Container className="py-16">
        <SectionTitle
          title="Produits populaires"
          subtitle="Les coups de cœur du moment, sélectionnés pour vous"
          action={<Link to="/boutique" className="text-sm font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1">Voir tout <ArrowRight className="w-4 h-4" /></Link>}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {popularProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </Container>

      {/* New Arrivals */}
      <section className="bg-slate-50">
        <Container className="py-16">
          <SectionTitle title="Nouveautés" subtitle="Les derniers arrivages à découvrir en avant-première" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </Container>
      </section>

      {/* Trending Looks */}
      <Container className="py-16">
        <SectionTitle
          title="Looks tendance"
          subtitle="L'inspiration du moment, style par style"
          action={<Link to="/inspiration" className="text-sm font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1">Voir tout <ArrowRight className="w-4 h-4" /></Link>}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingLooks.map(look => (
            <Link key={look.id} to="/inspiration" className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100">
              <img src={look.image} alt={look.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs text-white/70 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">{look.category}</span>
                <h3 className="text-white font-semibold text-sm mt-2">{look.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <Heart className="w-3 h-3 text-white/70" />
                  <span className="text-xs text-white/70">{look.likes}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* Learn Section */}
      <section className="bg-slate-50">
        <Container className="py-16">
          <SectionTitle
            title="Apprenez à mieux vous habiller"
            subtitle="Articles, guides et tutoriels pour développer votre sens du style"
            action={<Link to="/conseils" className="text-sm font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1">Voir tout <ArrowRight className="w-4 h-4" /></Link>}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map(a => (
              <Link key={a.id} to={`/conseils/${a.slug}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={a.thumbnail} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full">{a.category}</span>
                  <h3 className="font-semibold text-slate-900 mt-3 line-clamp-2 group-hover:text-blue-900 transition-colors">{a.title}</h3>
                  <p className="text-sm text-slate-500 mt-2 line-clamp-2">{a.excerpt}</p>
                  <div className="flex items-center gap-3 mt-4 text-xs text-slate-400">
                    <span>{a.author}</span>
                    <span>•</span>
                    <span>{a.readTime}</span>
                    <span>•</span>
                    <span>{a.views.toLocaleString('fr-FR')} vues</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Community */}
      <Container className="py-16">
        <SectionTitle
          title="Découvrez notre communauté"
          subtitle="Partagez vos looks, inspirez-vous des autres et échangez des conseils"
          action={<Link to="/communaute" className="text-sm font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1">Voir tout <ArrowRight className="w-4 h-4" /></Link>}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityPosts.map(post => (
            <Link key={post.id} to={`/post/${post.id}`} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all">
              <div className="aspect-square overflow-hidden">
                <img src={post.image} alt={post.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <img src={post.userAvatar} alt={post.userName} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">{post.userName}</p>
                    <p className="text-xs text-slate-400">{post.userCountry}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-3 line-clamp-2">{post.caption}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {post.comments.length}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* AI Assistant CTA */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <Container className="py-16 relative">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-4">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Style AI — Votre assistant personnel</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Votre assistant personnel de style</h2>
              <p className="text-blue-100 text-lg max-w-lg mb-6">
                Discutez avec notre IA, posez vos questions mode, obtenez des recommandations personnalisées et analysez vos tenues en photo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/assistant" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                  <Sparkles className="w-4 h-4" />
                  Discuter avec l'assistant
                </Link>
                <Link to="/analyse-tenue" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Analyser ma tenue
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <p className="text-sm text-white/80">Vous : Comment m'habiller pour un entretien ?</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 ml-8">
                <p className="text-sm text-white/80">Assistant : Pour un entretien, je recommande un costume bleu marine, chemise blanche et chaussures en cuir. Découvrez 3 produits adaptés à votre profil...</p>
              </div>
              <div className="flex gap-2">
                {['Tenue pour mariage ?', 'Quelle couleur me va ?', 'Associe ce pantalon'].map(q => (
                  <span key={q} className="text-xs text-white/60 bg-white/5 px-3 py-2 rounded-lg border border-white/10">{q}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Brands */}
      <Container className="py-16">
        <SectionTitle title="Marques populaires" subtitle="Des vendeurs de confiance, du monde entier" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {topBrands.map(b => (
            <Link key={b.id} to={`/vendeur/${b.id}`} className="group bg-white border border-slate-100 rounded-2xl p-6 text-center hover:shadow-lg hover:border-slate-200 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">{b.name.charAt(0)}</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">{b.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{b.country}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs text-slate-600 font-medium">{b.rating}</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
