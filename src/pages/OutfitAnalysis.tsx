import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, ImageIcon, Check, Lightbulb, TrendingUp, Sparkles, X } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mockData';

export default function OutfitAnalysis() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setShowResults(true);
        }, 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setShowResults(true);
        }, 2500);
      };
      reader.readAsDataURL(file);
    }
  };

  const reset = () => {
    setUploadedImage(null);
    setShowResults(false);
    setAnalyzing(false);
  };

  const recommendedProducts = products.slice(0, 3);

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Analyse de tenue' }]} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" /> IA Vision
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Analyse de votre tenue</h1>
          <p className="text-slate-500 mt-2">Téléversez une photo de votre tenue et recevez une analyse détaillée.</p>
        </div>

        {!uploadedImage && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            className="border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center cursor-pointer hover:border-blue-900 hover:bg-blue-50/50 transition-all"
          >
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Upload className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Téléversez votre photo</h3>
            <p className="text-slate-500 mt-1 text-sm">Glissez-déposez une image ici ou cliquez pour sélectionner</p>
            <p className="text-xs text-slate-400 mt-2">JPG, PNG · Max 10MB</p>
          </div>
        )}

        {uploadedImage && (
          <div className="space-y-6">
            {/* Uploaded image preview */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-100">
              <img src={uploadedImage} alt="Tenue" className="w-full max-h-96 object-contain" />
              <button onClick={reset} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                <X className="w-5 h-5 text-slate-700" />
              </button>
              {analyzing && (
                <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center text-white">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-3" />
                  <p className="font-medium">Analyse en cours...</p>
                  <p className="text-sm text-white/70 mt-1">L'IA examine votre tenue</p>
                </div>
              )}
            </div>

            {showResults && (
              <div className="space-y-6">
                {/* Score */}
                <div className="bg-gradient-to-br from-blue-900 to-emerald-600 text-white rounded-2xl p-6 text-center">
                  <p className="text-sm text-white/80">Note globale de la tenue</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-5xl font-bold">8.5</span>
                    <span className="text-2xl text-white/60">/ 10</span>
                  </div>
                  <p className="text-sm text-white/80 mt-2">Très bonne harmonie de couleurs et style cohérent</p>
                </div>

                {/* Positive points */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Check className="w-5 h-5 text-emerald-500" /> Points positifs
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Excellente harmonie des couleurs — le bleu et le blanc se complètent parfaitement',
                      'La coupe du vêtement correspond bien à votre morphologie',
                      'Les accessoires ajoutent une touche élégante sans surcharger la tenue',
                      'Le style est cohérent et adapté à une occasion décontractée chic',
                    ].map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="bg-white border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-amber-500" /> Suggestions d'amélioration
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Ajouter une ceinture pour structurer davantage la silhouette',
                      'Une montre ou un bracelet apporterait une touche finale',
                      'Les chaussures pourraient être dans une couleur plus contrastée',
                    ].map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <TrendingUp className="w-3 h-3 text-amber-600" />
                        </div>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommended products */}
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Produits recommandés pour compléter votre tenue</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    {recommendedProducts.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                </div>

                {/* Future note */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900">
                    Cette analyse est générée par un système simulé. Une future intégration avec un modèle d'IA de vision réel permettra une analyse encore plus précise de vos tenues.
                  </p>
                </div>

                <button onClick={reset} className="w-full py-3 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Analyser une autre tenue
                </button>
              </div>
            )}
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
      </div>
    </Container>
  );
}
