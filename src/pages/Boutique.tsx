import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products, categories, brands } from '@/data/mockData';
import type { Gender, StyleType } from '@/types';

const allStyles: StyleType[] = ['Casual', 'Chic', 'Streetwear', 'Classique', 'Sport', 'Élégant', 'Minimaliste', 'Vintage', 'Traditionnel', 'Business', 'Y2K', 'Afro', 'Fashion'];
const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '40', '41', '42', '43', '44', '45'];
const allColors = ['Noir', 'Blanc', 'Bleu', 'Rouge', 'Vert', 'Gris', 'Beige', 'Marron', 'Jaune', 'Rose'];
const sortOptions = [
  { value: 'relevance', label: 'Pertinence' },
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'bestseller', label: 'Meilleures ventes' },
  { value: 'rating', label: 'Mieux notés' },
];

export default function Boutique() {
  const [searchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOpen, setSortOpen] = useState(false);

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [newOnly, setNewOnly] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCats([cat]);
  }, [searchParams]);

  const toggle = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCats.length) result = result.filter(p => selectedCats.includes(p.category));
    if (selectedGenders.length) result = result.filter(p => selectedGenders.includes(p.gender) || p.gender === 'unisexe');
    if (selectedStyles.length) result = result.filter(p => selectedStyles.includes(p.style));
    if (selectedSizes.length) result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s.label)));
    if (selectedColors.length) result = result.filter(p => p.colors.some(c => selectedColors.includes(c.name)));
    if (selectedBrands.length) result = result.filter(p => selectedBrands.includes(p.brand));
    if (onSaleOnly) result = result.filter(p => p.isOnSale);
    if (newOnly) result = result.filter(p => p.isNew);
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'bestseller': result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }
    return result;
  }, [selectedCats, selectedGenders, selectedStyles, selectedSizes, selectedColors, selectedBrands, onSaleOnly, newOnly, priceRange, sortBy]);

  const activeCount = selectedCats.length + selectedGenders.length + selectedStyles.length + selectedSizes.length + selectedColors.length + selectedBrands.length + (onSaleOnly ? 1 : 0) + (newOnly ? 1 : 0);

  const clearAll = () => {
    setSelectedCats([]); setSelectedGenders([]); setSelectedStyles([]);
    setSelectedSizes([]); setSelectedColors([]); setSelectedBrands([]);
    setOnSaleOnly(false); setNewOnly(false); setPriceRange([0, 300]);
  };

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-slate-100 py-4">
      <h3 className="font-semibold text-sm text-slate-900 mb-3">{title}</h3>
      {children}
    </div>
  );

  const CheckboxOption = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center gap-2 py-1.5 cursor-pointer group">
      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${checked ? 'bg-blue-900 border-blue-900' : 'border-slate-300 group-hover:border-slate-400'}`}>
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  );

  const filterContent = (
    <>
      <FilterSection title="Catégories">
        <div className="space-y-0">
          {categories.map(c => (
            <CheckboxOption key={c.id} label={c.name} checked={selectedCats.includes(c.id)} onChange={() => toggle(selectedCats, c.id, setSelectedCats)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Genre">
        {(['homme', 'femme', 'enfant', 'unisexe'] as Gender[]).map(g => (
          <CheckboxOption key={g} label={g.charAt(0).toUpperCase() + g.slice(1)} checked={selectedGenders.includes(g)} onChange={() => toggle(selectedGenders, g, setSelectedGenders)} />
        ))}
      </FilterSection>

      <FilterSection title="Style">
        <div className="flex flex-wrap gap-2">
          {allStyles.map(s => (
            <button
              key={s}
              onClick={() => toggle(selectedStyles, s, setSelectedStyles)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                selectedStyles.includes(s) ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Taille">
        <div className="grid grid-cols-4 gap-2">
          {allSizes.map(s => (
            <button
              key={s}
              onClick={() => toggle(selectedSizes, s, setSelectedSizes)}
              className={`py-2 text-xs rounded-lg border transition-all ${
                selectedSizes.includes(s) ? 'border-blue-900 bg-blue-900 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Couleur">
        <div className="flex flex-wrap gap-2">
          {allColors.map(c => (
            <button
              key={c}
              onClick={() => toggle(selectedColors, c, setSelectedColors)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                selectedColors.includes(c) ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Prix">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>{priceRange[0]}€</span>
            <span>{priceRange[1]}€</span>
          </div>
          <input
            type="range" min={0} max={300} value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-blue-900"
          />
        </div>
      </FilterSection>

      <FilterSection title="Marques">
        {brands.map(b => (
          <CheckboxOption key={b.id} label={b.name} checked={selectedBrands.includes(b.name)} onChange={() => toggle(selectedBrands, b.name, setSelectedBrands)} />
        ))}
      </FilterSection>

      <FilterSection title="Disponibilité">
        <CheckboxOption label="En promotion" checked={onSaleOnly} onChange={() => setOnSaleOnly(!onSaleOnly)} />
        <CheckboxOption label="Nouveautés" checked={newOnly} onChange={() => setNewOnly(!newOnly)} />
      </FilterSection>

      {activeCount > 0 && (
        <button onClick={clearAll} className="w-full mt-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
          Réinitialiser ({activeCount})
        </button>
      )}
    </>
  );

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Boutique' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Boutique</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres
            {activeCount > 0 && <span className="bg-blue-900 text-white text-xs px-1.5 rounded-full">{activeCount}</span>}
          </button>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Trier : {sortOptions.find(s => s.value === sortBy)?.label}
              <ChevronDown className="w-4 h-4" />
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-30">
                {sortOptions.map(o => (
                  <button
                    key={o.value}
                    onClick={() => { setSortBy(o.value); setSortOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      sortBy === o.value ? 'text-blue-900 font-medium' : 'text-slate-600'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl p-5 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-bold text-slate-900">Filtres</h2>
              {activeCount > 0 && (
                <span className="text-xs text-slate-400">{activeCount} actif{activeCount > 1 ? 's' : ''}</span>
              )}
            </div>
            {filterContent}
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-4">{filtered.length} produit{filtered.length > 1 ? 's' : ''}</p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400">Aucun produit ne correspond à vos filtres.</p>
              <button onClick={clearAll} className="mt-4 text-blue-900 font-medium hover:text-blue-700">Réinitialiser les filtres</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm" onClick={() => setFiltersOpen(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-bold text-slate-900">Filtres</h2>
              <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
            </div>
            <div className="px-5 pb-20">
              {filterContent}
              <div className="fixed bottom-0 left-0 right-0 w-80 max-w-[85vw] bg-white border-t border-slate-100 p-4">
                <button onClick={() => setFiltersOpen(false)} className="w-full py-3 bg-blue-900 text-white rounded-xl font-medium">
                  Voir {filtered.length} produits
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
