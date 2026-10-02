import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Instagram, Facebook, Youtube, Twitter, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Recevez nos conseils et tendances</h3>
              <p className="text-slate-400">Inscrivez-vous pour recevoir nos nouveautés, offres exclusives et conseils de style.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="flex-1 lg:w-80 px-4 py-3 bg-slate-800 text-white rounded-lg border border-slate-700 focus:border-blue-500 outline-none transition-colors"
              />
              <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-medium">
                {subscribed ? 'Inscrit !' : 'Je m\'inscris'}
                {!subscribed && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">StyleWorld</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-xs">
              Un style pour chaque personne, une mode pour tous. Découvrez, achetez, apprenez et partagez votre style avec le monde.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">À propos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/a-propos" className="hover:text-white transition-colors">À propos de nous</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Nous contacter</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/cgu" className="hover:text-white transition-colors">Conditions générales</Link></li>
              <li><Link to="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link></li>
              <li><Link to="/retours" className="hover:text-white transition-colors">Politique de retour</Link></li>
              <li><Link to="/livraison" className="hover:text-white transition-colors">Livraison</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Catégories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/boutique?cat=hommes" className="hover:text-white transition-colors">Hommes</Link></li>
              <li><Link to="/boutique?cat=femmes" className="hover:text-white transition-colors">Femmes</Link></li>
              <li><Link to="/boutique?cat=enfants" className="hover:text-white transition-colors">Enfants</Link></li>
              <li><Link to="/boutique?cat=chaussures" className="hover:text-white transition-colors">Chaussures</Link></li>
              <li><Link to="/boutique?cat=accessoires" className="hover:text-white transition-colors">Accessoires</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Apprendre</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/conseils" className="hover:text-white transition-colors">Conseils</Link></li>
              <li><Link to="/conseils" className="hover:text-white transition-colors">Guides</Link></li>
              <li><Link to="/conseils" className="hover:text-white transition-colors">Tutoriels</Link></li>
              <li><Link to="/conseils" className="hover:text-white transition-colors">Vidéos</Link></li>
              <li><Link to="/communaute" className="hover:text-white transition-colors">Communauté</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 StyleWorld. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>VISA</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Stripe</span>
            <span>Mobile Money</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
