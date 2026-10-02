import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, User, Menu, X, Globe, ChevronDown, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { currencies, languages, products, categories } from '@/data/mockData';

export default function Header() {
  const { cartCount, favorites, user, currency, setCurrency, language, setLanguage } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/boutique', label: 'Boutique' },
    { to: '/categories', label: 'Catégories' },
    { to: '/conseils', label: 'Conseils' },
    { to: '/inspiration', label: 'Inspiration' },
    { to: '/communaute', label: 'Communauté' },
    { to: '/assistant', label: 'Assistant Style' },
  ];

  const suggestions = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.style.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">StyleWorld</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-slate-600 hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Recherche"
              >
                <Search className="w-5 h-5 text-slate-700" />
              </button>

              {/* Language */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => { setLangOpen(!langOpen); setCurrencyOpen(false); }}
                  className="flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Globe className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-medium text-slate-600">{language.flag}</span>
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                          language.code === lang.code ? 'text-blue-900 font-medium' : 'text-slate-600'
                        }`}
                      >
                        {lang.flag} — {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Currency */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => { setCurrencyOpen(!currencyOpen); setLangOpen(false); }}
                  className="flex items-center gap-1 px-2 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-xs font-medium text-slate-600">{currency.symbol}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {currencyOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    {currencies.map(c => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                          currency.code === c.code ? 'text-blue-900 font-medium' : 'text-slate-600'
                        }`}
                      >
                        {c.symbol} {c.name} ({c.code})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/profil/favoris" className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Heart className="w-5 h-5 text-slate-700" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link to="/panier" className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <ShoppingCart className="w-5 h-5 text-slate-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <Link to="/profil" className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                </Link>
              ) : (
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <Link to="/connexion" className="text-sm font-medium text-slate-600 hover:text-blue-900 transition-colors">
                    Connexion
                  </Link>
                  <Link to="/inscription" className="text-sm font-medium text-white bg-blue-900 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                    Créer un compte
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5 text-slate-700" /> : <Menu className="w-5 h-5 text-slate-700" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200 focus-within:border-blue-500 transition-colors">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Que recherchez-vous ? Chemise homme, robe élégante, style streetwear..."
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button type="submit" className="text-sm font-medium text-blue-900 hover:text-blue-700">
                      Rechercher
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50 max-h-80 overflow-y-auto">
                    {suggestions.map(p => (
                      <Link
                        key={p.id}
                        to={`/produit/${p.slug}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 transition-colors"
                      >
                        <img src={p.images[0].url} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.brand}</p>
                        </div>
                        <span className="text-sm font-semibold text-blue-900">{currency.symbol}{p.price}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? 'text-blue-900 bg-blue-50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-4 px-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang)}
                      className={`text-sm ${language.code === lang.code ? 'text-blue-900 font-bold' : 'text-slate-500'}`}
                    >
                      {lang.flag}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {currencies.map(c => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c)}
                      className={`text-xs px-2 py-1 rounded ${currency.code === c.code ? 'bg-blue-100 text-blue-900 font-bold' : 'text-slate-500'}`}
                    >
                      {c.symbol}
                    </button>
                  ))}
                </div>
              </div>
              {!user && (
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <Link to="/connexion" className="block text-center px-4 py-3 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg">
                    Connexion
                  </Link>
                  <Link to="/inscription" className="block text-center px-4 py-3 text-sm font-medium text-white bg-blue-900 rounded-lg">
                    Créer un compte
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
      <div className="h-16 lg:h-20" />
    </>
  );
}
