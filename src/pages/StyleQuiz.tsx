import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Sparkles, Palette, RefreshCw, ShoppingBag } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { styleQuizQuestions, products } from '@/data/mockData';
import type { StyleType } from '@/types';

export default function StyleQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const totalSteps = styleQuizQuestions.length;
  const progress = showResults ? 100 : (currentStep / totalSteps) * 100;

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowResults(true);
      }
    }, 200);
  };

  const computeResults = () => {
    const styleCount: Record<string, number> = {};
    Object.entries(answers).forEach(([qId, value]) => {
      const question = styleQuizQuestions.find(q => q.id === qId);
      if (question) {
        const option = question.options.find(o => o.value === value);
        option?.styles.forEach(s => {
          styleCount[s] = (styleCount[s] || 0) + 1;
        });
      }
    });
    const sorted = Object.entries(styleCount).sort((a, b) => b[1] - a[1]);
    return sorted;
  };

  const restart = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  if (showResults) {
    const results = computeResults();
    const primaryStyle = results[0]?.[0] || 'Casual';
    const secondaryStyles = results.slice(1, 3).map(r => r[0]);
    const recommendedProducts = products.filter(p =>
      p.style === primaryStyle || secondaryStyles.includes(p.style)
    ).slice(0, 8);

    const colorMap: Record<string, string[]> = {
      'Minimaliste': ['Noir', 'Blanc', 'Gris'],
      'Classique': ['Bleu nuit', 'Gris', 'Beige'],
      'Streetwear': ['Noir', 'Blanc', 'Kaki'],
      'Chic': ['Noir', 'Rouge', 'Blanc'],
      'Business': ['Bleu nuit', 'Gris', 'Noir'],
      'Casual': ['Bleu', 'Blanc', 'Beige'],
      'Afro': ['Multicolore', 'Rouge', 'Vert'],
      'Sport': ['Noir', 'Bleu', 'Rose'],
      'Élégant': ['Noir', 'Bleu nuit', 'Rouge'],
    };
    const recommendedColors = colorMap[primaryStyle] || ['Noir', 'Blanc', 'Bleu'];
    const colorHex: Record<string, string> = { 'Noir': '#1a1a1a', 'Blanc': '#f5f5f0', 'Gris': '#808080', 'Bleu': '#1e3a5f', 'Bleu nuit': '#0f172a', 'Beige': '#D2B48C', 'Rouge': '#CC0000', 'Kaki': '#556B2F', 'Vert': '#228B22', 'Rose': '#FF69B4', 'Multicolore': 'linear-gradient(135deg, #FF6B35, #4B0082, #228B22)' };

    return (
      <Container className="py-6">
        <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Mon style' }]} />

        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium mb-4">
            <Check className="w-4 h-4" /> Profil stylistique généré
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Votre profil de style</h1>
          <p className="text-slate-500 mt-3">Basé sur vos réponses, voici nos recommandations personnalisées pour vous.</p>
        </div>

        {/* Style results */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white rounded-2xl p-6">
            <Sparkles className="w-8 h-8 mb-3" />
            <p className="text-sm text-blue-200">Style principal</p>
            <p className="text-2xl font-bold mt-1">{primaryStyle}</p>
          </div>
          {secondaryStyles.map((s, i) => (
            <div key={s} className="bg-white border border-slate-100 rounded-2xl p-6">
              <Sparkles className="w-8 h-8 text-slate-300 mb-3" />
              <p className="text-sm text-slate-400">Style secondaire {i + 1}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{s}</p>
            </div>
          ))}
        </div>

        {/* Colors */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Palette className="w-5 h-5 text-blue-900" /> Couleurs recommandées</h2>
          <div className="flex items-center gap-4">
            {recommendedColors.map(c => (
              <div key={c} className="text-center">
                <div className="w-16 h-16 rounded-2xl border-4 border-white shadow-lg" style={{ background: colorHex[c] || '#ccc' }} />
                <p className="text-xs text-slate-500 mt-2">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mb-8">
          <h2 className="font-bold text-slate-900 text-xl mb-4 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-blue-900" /> Produits correspondant à votre style</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {recommendedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={restart} className="flex items-center gap-2 px-6 py-3 border border-slate-200 rounded-xl font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <RefreshCw className="w-4 h-4" /> Refaire le test
          </button>
          <Link to="/boutique" className="flex items-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors">
            Voir tous les produits <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    );
  }

  const question = styleQuizQuestions[currentStep];

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Trouver mon style' }]} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-900 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Questionnaire de style
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Quel est votre style ?</h1>
          <p className="text-slate-500 mt-2">Répondez à quelques questions pour découvrir votre profil stylistique.</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>Question {currentStep + 1} sur {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-900 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question */}
        <div key={currentStep} className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(question.id, opt.value)}
                className={`w-full flex items-center justify-between p-4 border-2 rounded-xl transition-all text-left ${
                  answers[question.id] === opt.value
                    ? 'border-blue-900 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <span className="font-medium text-slate-900">{opt.label}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  answers[question.id] === opt.value ? 'border-blue-900 bg-blue-900' : 'border-slate-300'
                }`}>
                  {answers[question.id] === opt.value && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 ? (
            <button onClick={() => setCurrentStep(currentStep - 1)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Précédent
            </button>
          ) : <div />}
          <p className="text-sm text-slate-400">{Object.keys(answers).length} / {totalSteps} répondues</p>
        </div>
      </div>
    </Container>
  );
}
