import { Link } from 'react-router-dom';
import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function MobileNav() {
  const { cartCount, favorites, user } = useApp();

  const items = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/boutique', icon: Search, label: 'Boutique' },
    { to: '/profil/favoris', icon: Heart, label: 'Favoris', badge: favorites.length },
    { to: '/panier', icon: ShoppingBag, label: 'Panier', badge: cartCount },
    { to: '/profil', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map(item => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-slate-500 hover:text-blue-900 transition-colors"
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
