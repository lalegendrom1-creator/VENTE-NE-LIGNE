import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem, FavoriteItem, Currency, Language } from '@/types';
import { currencies, languages } from '@/data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  country: string;
}

interface AppContextValue {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;

  favorites: FavoriteItem[];
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (id: string, type: FavoriteItem['type']) => boolean;

  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;

  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;

  formatPrice: (price: number) => string;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('sw_cart') || '[]'); } catch { return []; }
  });
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('sw_favorites') || '[]'); } catch { return []; }
  });
  const [user, setUser] = useState<User | null>(() => {
    try { return JSON.parse(localStorage.getItem('sw_user') || 'null'); } catch { return null; }
  });
  const [currency, setCurrencyState] = useState<Currency>(() => {
    try { return JSON.parse(localStorage.getItem('sw_currency') || 'null') || currencies[0]; } catch { return currencies[0]; }
  });
  const [language, setLanguageState] = useState<Language>(() => {
    try { return JSON.parse(localStorage.getItem('sw_language') || 'null') || languages[0]; } catch { return languages[0]; }
  });

  useEffect(() => { localStorage.setItem('sw_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('sw_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('sw_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('sw_currency', JSON.stringify(currency)); }, [currency]);
  useEffect(() => { localStorage.setItem('sw_language', JSON.stringify(language)); }, [language]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.findIndex(
        i => i.productId === item.productId && i.size === item.size && i.color === item.color
      );
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (index: number) => setCart(prev => prev.filter((_, i) => i !== index));
  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map((item, i) => i === index ? { ...item, quantity } : item));
  };
  const clearCart = () => setCart([]);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id && f.type === item.type);
      return exists ? prev.filter(f => !(f.id === item.id && f.type === item.type)) : [...prev, item];
    });
  };

  const isFavorite = (id: string, type: FavoriteItem['type']) =>
    favorites.some(f => f.id === id && f.type === type);

  const login = (email: string, name: string) => {
    setUser({
      id: 'u1', email, name,
      avatar: 'https://images.pexels.com/photos/7897299/pexels-photo-7897299.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
      country: 'France',
    });
  };

  const logout = () => setUser(null);

  const setCurrency = (c: Currency) => setCurrencyState(c);
  const setLanguage = (l: Language) => setLanguageState(l);

  const formatPrice = (price: number) => {
    const converted = price * currency.rate;
    if (currency.code === 'XOF') {
      return `${Math.round(converted).toLocaleString('fr-FR')} ${currency.symbol}`;
    }
    return `${converted.toFixed(2)} ${currency.symbol}`;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount,
      favorites, toggleFavorite, isFavorite,
      user, login, logout,
      currency, setCurrency, language, setLanguage, formatPrice,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
