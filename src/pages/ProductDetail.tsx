import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Share2, Truck, RotateCcw, Shield, Check, Minus, Plus, ChevronRight, Ruler } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, reviews, brands } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const { formatPrice, addToCart, toggleFavorite, isFavorite } = useApp();
  const product = products.find(p => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews' | 'shipping'>('desc');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <p className="text-slate-400">Produit introuvable.</p>
        <Link to="/boutique" className="mt-4 inline-block text-blue-900 font-medium">Retour à la boutique</Link>
      </Container>
    );
  }

  const fav = isFavorite(product.id, 'product');
  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.id !== product.id && (p.style === product.style || p.category === product.category)).slice(0, 4);
  const completeLook = products.filter(p => p.id !== product.id && p.category !== product.category).slice(0, 3);
  const brand = brands.find(b => b.id === product.vendorId);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Veuillez sélectionner une taille');
      return;
    }
    addToCart({
      productId: product.id,
      size: selectedSize,
      color: selectedColor || product.colors[0].name,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const sizeChart = [
    { label: 'EU', sizes: ['44', '46', '48', '50', '52', '54'] },
    { label: 'US', sizes: ['34', '36', '38', '40', '42', '44'] },
    { label: 'UK', sizes: ['34', '36', '38', '40', '42', '44'] },
    { label: 'INT', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
  ];

  return (
    <Container className="py-6">
      <Breadcrumb items={[
        { label: 'Accueil', to: '/' },
        { label: 'Boutique', to: '/boutique' },
        { label: product.name },
      ]} />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-50">
            <img src={product.images[activeImage].url} alt={product.images[activeImage].alt} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === i ? 'border-blue-900' : 'border-slate-200'
                }`}
              >
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <Link to={`/vendeur/${product.vendorId}`} className="text-sm font-medium text-blue-900 hover:text-blue-700">{product.brand}</Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-700">{product.rating}</span>
            <span className="text-sm text-slate-400">({product.reviewCount} avis)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-slate-400 line-through">{formatPrice(product.oldPrice)}</span>
                <span className="px-2 py-1 bg-rose-100 text-rose-600 text-sm font-semibold rounded-full">-{discount}%</span>
              </>
            )}
          </div>

          {/* Colors */}
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-900 mb-2">Couleur : <span className="text-slate-600">{selectedColor || product.colors[0].name}</span></p>
            <div className="flex gap-2">
              {product.colors.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    (selectedColor || product.colors[0].name) === c.name ? 'border-blue-900 ring-2 ring-blue-900/20' : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-900">Taille</p>
              <button onClick={() => setShowSizeGuide(true)} className="flex items-center gap-1 text-sm text-blue-900 hover:text-blue-700">
                <Ruler className="w-4 h-4" /> Guide des tailles
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map(s => (
                <button
                  key={s.label}
                  disabled={!s.inStock}
                  onClick={() => setSelectedSize(s.label)}
                  className={`py-2.5 text-sm rounded-lg border transition-all ${
                    !s.inStock
                      ? 'border-slate-100 text-slate-300 cursor-not-allowed line-through'
                      : selectedSize === s.label
                        ? 'border-blue-900 bg-blue-900 text-white'
                        : 'border-slate-200 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-900 mb-2">Quantité</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 hover:bg-slate-50 rounded-l-lg"><Minus className="w-4 h-4" /></button>
                <span className="px-4 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 hover:bg-slate-50 rounded-r-lg"><Plus className="w-4 h-4" /></button>
              </div>
              <span className="text-sm text-slate-500">{product.stock} en stock</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold transition-all ${
                addedToCart ? 'bg-emerald-500 text-white' : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              {addedToCart ? <><Check className="w-5 h-5" /> Ajouté !</> : <><ShoppingCart className="w-5 h-5" /> Ajouter au panier</>}
            </button>
            <Link to="/checkout" onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-500 transition-colors">
              Acheter maintenant
            </Link>
            <button
              onClick={() => toggleFavorite({ id: product.id, type: 'product' })}
              className="p-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Heart className={`w-5 h-5 ${fav ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
            </button>
            <button className="p-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          {/* Shipping info */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl">
              <Truck className="w-5 h-5 text-blue-900 mb-1" />
              <p className="text-xs font-medium text-slate-700">Livraison rapide</p>
              <p className="text-xs text-slate-400">3-5 jours</p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl">
              <RotateCcw className="w-5 h-5 text-blue-900 mb-1" />
              <p className="text-xs font-medium text-slate-700">Retours gratuits</p>
              <p className="text-xs text-slate-400">30 jours</p>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-slate-50 rounded-xl">
              <Shield className="w-5 h-5 text-blue-900 mb-1" />
              <p className="text-xs font-medium text-slate-700">Paiement sécurisé</p>
              <p className="text-xs text-slate-400">SSL encrypté</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="border-b border-slate-200 flex gap-6">
          {[
            { key: 'desc', label: 'Description' },
            { key: 'reviews', label: `Avis (${product.reviewCount})` },
            { key: 'shipping', label: 'Livraison & Retours' },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as typeof activeTab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === t.key ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="py-6">
          {activeTab === 'desc' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Description</h3>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Matières & Détails</h3>
                <ul className="space-y-2">
                  {product.materials.map(m => (
                    <li key={m} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-emerald-500" /> {m}
                    </li>
                  ))}
                  <li className="flex items-center gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-emerald-500" /> Origine : {product.originCountry}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center gap-6 p-4 bg-slate-50 rounded-2xl">
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-900">{product.rating}</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{product.reviewCount} avis</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-slate-500">{s}</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${s === 5 ? 65 : s === 4 ? 20 : s === 3 ? 10 : 3}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {productReviews.map(r => (
                <div key={r.id} className="p-4 border border-slate-100 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <img src={r.userAvatar} alt={r.userName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{r.userName}</p>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-3 h-3 ${i <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
                      </div>
                    </div>
                    <span className="ml-auto text-xs text-slate-400">{r.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">{r.comment}</p>
                  <p className="text-xs text-slate-400 mt-2">Utile pour {r.helpful} personne{r.helpful > 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex gap-3"><Truck className="w-5 h-5 text-blue-900 flex-shrink-0" /><p>{product.shippingInfo}</p></div>
              <div className="flex gap-3"><RotateCcw className="w-5 h-5 text-blue-900 flex-shrink-0" /><p>Retours gratuits dans les 30 jours. Le produit doit être non porté et dans son emballage d'origine.</p></div>
              <div className="flex gap-3"><Shield className="w-5 h-5 text-blue-900 flex-shrink-0" /><p>Paiement sécurisé par carte bancaire, PayPal, Stripe ou Mobile Money. Vos données sont protégées par un chiffrement SSL.</p></div>
              <div className="flex gap-3"><Truck className="w-5 h-5 text-blue-900 flex-shrink-0" /><p>Expédition depuis {product.originCountry}. Livraison internationale disponible.</p></div>
            </div>
          )}
        </div>
      </div>

      {/* Complete the look */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Complétez votre tenue</h2>
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          <div className="flex-shrink-0 w-40">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50">
              <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs font-medium text-slate-900 mt-2 line-clamp-1">{product.name}</p>
            <p className="text-xs text-blue-900 font-semibold">{formatPrice(product.price)}</p>
          </div>
          {completeLook.map(p => (
            <div key={p.id} className="flex-shrink-0 w-40">
              <Link to={`/produit/${p.slug}`}>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-50">
                  <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-medium text-slate-900 mt-2 line-clamp-1">{p.name}</p>
                <p className="text-xs text-blue-900 font-semibold">{formatPrice(p.price)}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* You may also like */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Vous pourriez aussi aimer</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* Size guide modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Guide des tailles</h2>
              <button onClick={() => setShowSizeGuide(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <p className="text-sm text-slate-500 mb-4">Comparez les tailles entre les systèmes internationaux.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    {sizeChart.map(s => <th key={s.label} className="py-3 text-left font-semibold text-slate-900">{s.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3, 4, 5].map(row => (
                    <tr key={row} className="border-b border-slate-100">
                      {sizeChart.map(s => <td key={s.label} className="py-3 text-slate-600">{s.sizes[row]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-4">Les mesures peuvent varier légèrement selon les marques. En cas de doute, choisissez la taille supérieure.</p>
          </div>
        </div>
      )}
    </Container>
  );
}
