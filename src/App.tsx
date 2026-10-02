import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import { Layout } from '@/components/Layout';

import Home from '@/pages/Home';
import Boutique from '@/pages/Boutique';
import Categories from '@/pages/Categories';
import ProductDetail from '@/pages/ProductDetail';
import Search from '@/pages/Search';
import StyleQuiz from '@/pages/StyleQuiz';
import Assistant from '@/pages/Assistant';
import OutfitAnalysis from '@/pages/OutfitAnalysis';
import Conseils from '@/pages/Conseils';
import ArticleDetail from '@/pages/ArticleDetail';
import Inspiration from '@/pages/Inspiration';
import Communaute from '@/pages/Communaute';
import PostDetail from '@/pages/PostDetail';
import CreatorProfile from '@/pages/CreatorProfile';
import VendorProfile from '@/pages/VendorProfile';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import OrderDetail from '@/pages/OrderDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import ProfileStyle from '@/pages/ProfileStyle';
import ProfileFavorites from '@/pages/ProfileFavorites';
import ProfileOrders from '@/pages/ProfileOrders';
import ProfileSettings from '@/pages/ProfileSettings';
import VendorDashboard from '@/pages/VendorDashboard';
import Admin from '@/pages/Admin';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Header />
          <main className="flex-1 pb-20 lg:pb-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/produit/:slug" element={<ProductDetail />} />
              <Route path="/recherche" element={<Search />} />
              <Route path="/style" element={<StyleQuiz />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/analyse-tenue" element={<OutfitAnalysis />} />
              <Route path="/conseils" element={<Conseils />} />
              <Route path="/conseils/:slug" element={<ArticleDetail />} />
              <Route path="/inspiration" element={<Inspiration />} />
              <Route path="/communaute" element={<Communaute />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/createur/:id" element={<CreatorProfile />} />
              <Route path="/vendeur/:id" element={<VendorProfile />} />
              <Route path="/panier" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/commande/:id" element={<OrderDetail />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscription" element={<Register />} />
              <Route path="/profil" element={<Profile />} />
              <Route path="/profil/style" element={<ProfileStyle />} />
              <Route path="/profil/favoris" element={<ProfileFavorites />} />
              <Route path="/profil/commandes" element={<ProfileOrders />} />
              <Route path="/profil/parametres" element={<ProfileSettings />} />
              <Route path="/vendeur/dashboard" element={<VendorDashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <MobileNav />
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
