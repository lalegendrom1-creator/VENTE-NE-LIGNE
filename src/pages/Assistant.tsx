import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, ShoppingBag } from 'lucide-react';
import { Container, Breadcrumb } from '@/components/Layout';
import { products } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import type { Product } from '@/types';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  products?: Product[];
}

const quickQuestions = [
  'Comment m\'habiller pour un entretien ?',
  'Que porter pour un mariage ?',
  'Quelle couleur me correspond ?',
  'Comment associer ce pantalon ?',
];

function generateResponse(query: string): { text: string; products: Product[] } {
  const q = query.toLowerCase();
  if (q.includes('entretien') || q.includes('business') || q.includes('professionnel')) {
    return {
      text: 'Pour un entretien d\'embauche, je vous recommande un look professionnel et soigné. Optez pour un costume bien coupé, une chemise blanche et des chaussures en cuir. Voici ma sélection pour vous :',
      products: products.filter(p => p.style === 'Business' || p.category === 'professionnel').slice(0, 3),
    };
  }
  if (q.includes('mariage') || q.includes('cérémonie') || q.includes('soirée') || q.includes('élégant')) {
    return {
      text: 'Pour un mariage ou une cérémonie, l\'élégance est de mise. Je vous suggère une robe élégante ou un costume raffiné, accompagné d\'accessoires soignés. Voici mes recommandations :',
      products: products.filter(p => p.style === 'Élégant' || p.style === 'Chic').slice(0, 3),
    };
  }
  if (q.includes('couleur')) {
    return {
      text: 'Le choix des couleurs dépend de votre carnation et de votre style. Le bleu nuit va à presque tout le monde, le blanc est un classique intemporel, et le noir élégant. Pour les touches de couleur, le vert et le bordeaux sont très tendance cette saison.',
      products: products.slice(0, 3),
    };
  }
  if (q.includes('pantalon') || q.includes('associer') || q.includes('jean')) {
    return {
      text: 'Pour associer un pantalon, la règle est simple : contrastez les couleurs. Un pantalon foncé avec un haut clair, ou inversement. Pour un jean, une chemise blanche et des sneakers blanches forment un combo parfait. Voici quelques suggestions :',
      products: products.filter(p => p.category === 'hommes' || p.category === 'chaussures').slice(0, 3),
    };
  }
  if (q.includes('streetwear') || q.includes('urbain')) {
    return {
      text: 'Le streetwear est un style urbain audacieux. Misez sur des pièces oversized, des sneakers tendance et des accessoires comme les lunettes de soleil. Voici ma sélection streetwear :',
      products: products.filter(p => p.style === 'Streetwear').slice(0, 3),
    };
  }
  if (q.includes('sport') || q.includes('gym') || q.includes('fitness')) {
    return {
      text: 'Pour le sport, privilégiez des vêtements techniques respirants et confortables. Voici ma sélection d\'articles de sport :',
      products: products.filter(p => p.style === 'Sport').slice(0, 3),
    };
  }
  return {
    text: 'Excellente question ! Pour vous aider au mieux, j\'ai sélectionné quelques produits tendance qui pourraient vous plaire. N\'hésitez pas à me poser des questions plus spécifiques sur une occasion, une couleur ou un style particulier !',
    products: products.slice(0, 3),
  };
}

export default function Assistant() {
  const { formatPrice } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'assistant', text: 'Bonjour ! Je suis Style AI, votre assistant personnel de style. Posez-moi toutes vos questions mode : comment vous habiller pour une occasion, quelles couleurs choisir, comment associer des pièces... Je suis là pour vous aider !' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: response.text,
        products: response.products,
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Container className="py-6">
      <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Assistant Style' }]} />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" /> Style AI
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Votre assistant personnel de style</h1>
          <p className="text-slate-500 mt-2">Posez vos questions et recevez des recommandations personnalisées.</p>
        </div>

        {/* Chat container */}
        <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? '' : 'flex flex-col gap-3 w-full'}`}>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-900 to-emerald-500 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">Style AI</span>
                    </div>
                  )}
                  <div className={`rounded-2xl px-4 py-3 text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-900 text-white rounded-br-md'
                      : 'bg-slate-50 text-slate-700 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Product recommendations */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {msg.products.map(p => (
                        <Link key={p.id} to={`/produit/${p.slug}`} className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-all">
                          <div className="aspect-square overflow-hidden">
                            <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div className="p-2">
                            <p className="text-xs font-medium text-slate-900 line-clamp-1">{p.name}</p>
                            <p className="text-xs text-blue-900 font-semibold mt-0.5">{formatPrice(p.price)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-900 to-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-slate-50 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {quickQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-2 bg-slate-100 text-slate-600 rounded-full hover:bg-blue-50 hover:text-blue-900 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-100 p-4">
            <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-3 bg-slate-50 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-900/20 transition-all"
              />
              <button type="submit" disabled={!input.trim()} className="w-11 h-11 bg-blue-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
