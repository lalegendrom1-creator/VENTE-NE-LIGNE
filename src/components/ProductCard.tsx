import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useApp } from '@/context/AppContext';

export default function ProductCard({ product }: { product: Product }) {
  const { formatPrice, toggleFavorite, isFavorite, addToCart } = useApp();
  const fav = isFavorite(product.id, 'product');

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isOnSale && <span className="px-2.5 py-1 bg-rose-500 text-white text-xs font-semibold rounded-full">-{discount}%</span>}
        {product.isNew && <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">Nouveau</span>}
        {product.isBestSeller && <span className="px-2.5 py-1 bg-blue-900 text-white text-xs font-semibold rounded-full">Best-seller</span>}
      </div>

      {/* Favorite */}
      <button
        onClick={() => toggleFavorite({ id: product.id, type: 'product' })}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white shadow-sm transition-all"
        aria-label="Ajouter aux favoris"
      >
        <Heart className={`w-4 h-4 transition-all ${fav ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
      </button>

      {/* Image */}
      <Link to={`/produit/${product.slug}`}>
        <div className="aspect-[3/4] overflow-hidden bg-slate-50">
          <img
            src={product.images[0].url}
            alt={product.images[0].alt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Quick actions on hover */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={() => addToCart({ productId: product.id, size: product.sizes[0].label, color: product.colors[0].name, quantity: 1 })}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg text-sm font-medium text-slate-900 hover:bg-blue-900 hover:text-white transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Ajout rapide
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <Link to={`/vendeur/${product.vendorId}`}>
          <p className="text-xs text-slate-400 font-medium mb-1 hover:text-blue-900 transition-colors">{product.brand}</p>
        </Link>
        <Link to={`/produit/${product.slug}`}>
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-1 hover:text-blue-900 transition-colors">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-slate-600">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-slate-900">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-sm text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5 mt-3">
          {product.colors.slice(0, 4).map(c => (
            <div
              key={c.name}
              className="w-4 h-4 rounded-full border border-slate-200"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-slate-400">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </div>
  );
}
