import type {
  Product, Brand, Category, Article, Look, Post, Review, Creator, Notification, Currency, Language,
} from '@/types';

export const currencies: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 1 },
  { code: 'USD', symbol: '$', name: 'Dollar US', rate: 1.08 },
  { code: 'GBP', symbol: '£', name: 'Livre Sterling', rate: 0.85 },
  { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA', rate: 655.96 },
  { code: 'CAD', symbol: 'C$', name: 'Dollar Canadien', rate: 1.47 },
];

export const languages: Language[] = [
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'es', name: 'Español', flag: 'ES' },
];

export const categories: Category[] = [
  { id: 'hommes', name: 'Hommes', icon: 'User', image: 'https://images.pexels.com/photos/775771/pexels-photo-775771.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', gender: 'homme' },
  { id: 'femmes', name: 'Femmes', icon: 'User', image: 'https://images.pexels.com/photos/37015070/pexels-photo-37015070.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', gender: 'femme' },
  { id: 'enfants', name: 'Enfants', icon: 'Baby', image: 'https://images.pexels.com/photos/34608858/pexels-photo-34608858.jpeg?auto=compress&cs=tinysrgb&h=400&w=600', gender: 'enfant' },
  { id: 'chaussures', name: 'Chaussures', icon: 'Footprints', image: 'https://images.pexels.com/photos/27204251/pexels-photo-27204251.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'accessoires', name: 'Accessoires', icon: 'Glasses', image: 'https://images.pexels.com/photos/32677231/pexels-photo-32677231.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'sacs', name: 'Sacs', icon: 'ShoppingBag', image: 'https://images.pexels.com/photos/19869754/pexels-photo-19869754.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'bijoux', name: 'Bijoux', icon: 'Watch', image: 'https://images.pexels.com/photos/29502932/pexels-photo-29502932.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'sport', name: 'Sport', icon: 'Dumbbell', image: 'https://images.pexels.com/photos/29242372/pexels-photo-29242372.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'professionnel', name: 'Tenues Pro', icon: 'Briefcase', image: 'https://images.pexels.com/photos/32279088/pexels-photo-32279088.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'streetwear', name: 'Streetwear', icon: 'Zap', image: 'https://images.pexels.com/photos/18432086/pexels-photo-18432086.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'traditionnel', name: 'Traditionnel', icon: 'Globe', image: 'https://images.pexels.com/photos/39105578/pexels-photo-39105578.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
  { id: 'ceremonie', name: 'Cérémonie', icon: 'Crown', image: 'https://images.pexels.com/photos/14801160/pexels-photo-14801160.jpeg?auto=compress&cs=tinysrgb&h=400&w=600' },
];

const img = (url: string, alt: string) => ({ url, alt });

export const brands: Brand[] = [
  { id: 'b1', name: 'Urban Heritage', logo: '', description: 'Marque de vêtements urbains intemporels, mêlant tradition et modernité.', country: 'France', rating: 4.7, productCount: 156, sales: 12450 },
  { id: 'b2', name: 'Sahel Couture', logo: '', description: 'Mode africaine contemporaine, tissus wax et coupes modernes.', country: 'Sénégal', rating: 4.9, productCount: 89, sales: 8200 },
  { id: 'b3', name: 'Nordic Form', logo: '', description: 'Minimalisme scandinave, matières durables et designs épurés.', country: 'Suède', rating: 4.6, productCount: 203, sales: 18900 },
  { id: 'b4', name: 'Tokyo Street', logo: '', description: 'Streetwear japonais avant-gardiste inspiré des rues de Harajuku.', country: 'Japon', rating: 4.8, productCount: 178, sales: 15600 },
  { id: 'b5', name: 'Maison Élégance', logo: '', description: 'Haute couture accessible pour les occasions spéciales.', country: 'Italie', rating: 4.9, productCount: 67, sales: 5400 },
  { id: 'b6', name: 'Active Motion', logo: '', description: 'Vêtements de sport techniques pour une performance optimale.', country: 'États-Unis', rating: 4.5, productCount: 234, sales: 22000 },
];

const baseSizes = [
  { label: 'XS', inStock: true }, { label: 'S', inStock: true },
  { label: 'M', inStock: true }, { label: 'L', inStock: true },
  { label: 'XL', inStock: true }, { label: 'XXL', inStock: false },
];

const shoeSizes = [
  { label: '40', inStock: true }, { label: '41', inStock: true },
  { label: '42', inStock: true }, { label: '43', inStock: true },
  { label: '44', inStock: false }, { label: '45', inStock: true },
];

const baseColors = [
  { name: 'Noir', hex: '#1a1a1a' }, { name: 'Blanc', hex: '#f5f5f0' },
  { name: 'Bleu nuit', hex: '#1e3a5f' }, { name: 'Gris', hex: '#808080' },
];

export const products: Product[] = [
  {
    id: 'p1', slug: 'chemise-linen-homme', name: 'Chemise en Lin Homme', brand: 'Urban Heritage', vendorId: 'b1',
    category: 'hommes', gender: 'homme', style: 'Casual', price: 49.90, oldPrice: 69.90, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/2421356/pexels-photo-2421356.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Chemise en lin homme'),
      img('https://images.pexels.com/photos/4443831/pexels-photo-4443831.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Détail chemise'),
      img('https://images.pexels.com/photos/6616673/pexels-photo-6616673.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Style casual homme'),
    ],
    rating: 4.6, reviewCount: 234, sizes: baseSizes,
    colors: [{ name: 'Bleu ciel', hex: '#87CEEB' }, { name: 'Blanc', hex: '#f5f5f0' }, { name: 'Beige', hex: '#D2B48C' }],
    materials: ['100% Lin', 'Respirant', 'Biologique'], description: 'Chemise en lin véritable, idéale pour les journées chaudes. Coupe régulière, col classique, boutons en nacre. Un essentielpour un style estival élégant et décontracté.',
    shippingInfo: 'Livraison standard 3-5 jours, express 24h', originCountry: 'Portugal', isOnSale: true, stock: 45,
  },
  {
    id: 'p2', slug: 'robe-soiree-elegante-femme', name: 'Robe de Soirée Élégante', brand: 'Maison Élégance', vendorId: 'b5',
    category: 'femmes', gender: 'femme', style: 'Élégant', price: 129.00, oldPrice: 189.00, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/14801160/pexels-photo-14801160.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Robe de soirée'),
      img('https://images.pexels.com/photos/20335936/pexels-photo-20335936.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Robe élégante'),
      img('https://images.pexels.com/photos/16971643/pexels-photo-16971643.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Robe florale'),
    ],
    rating: 4.9, reviewCount: 178, sizes: baseSizes,
    colors: [{ name: 'Noir', hex: '#1a1a1a' }, { name: 'Rouge', hex: '#8B0000' }, { name: 'Bleu', hex: '#1e3a5f' }],
    materials: ['92% Polyester', '8% Élasthanne', 'Doublure satinée'], description: 'Robe de soirée longue avec fente latérale et dos nu. Tissu fluide qui épouse délicatement les courbes. Parfaite pour les galas, mariages et occasions spéciales.',
    shippingInfo: 'Livraison standard 3-5 jours, express 24h', originCountry: 'Italie', isOnSale: true, isBestSeller: true, stock: 22,
  },
  {
    id: 'p3', slug: 'sneakers-urbaines-blanches', name: 'Sneakers Urbaines Blanches', brand: 'Tokyo Street', vendorId: 'b4',
    category: 'chaussures', gender: 'unisexe', style: 'Streetwear', price: 79.90, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/27204251/pexels-photo-27204251.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Sneakers blanches'),
      img('https://images.pexels.com/photos/27516985/pexels-photo-27516985.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Sneakers moutarde'),
      img('https://images.pexels.com/photos/27298315/pexels-photo-27298315.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Sneaker détail'),
    ],
    rating: 4.7, reviewCount: 412, sizes: shoeSizes,
    colors: [{ name: 'Blanc', hex: '#f5f5f0' }, { name: 'Noir', hex: '#1a1a1a' }],
    materials: ['Cuir véritable', 'Semelle caoutchouc', 'Doublure textile'], description: 'Sneakers minimalistes en cuir véritable. Design épuré, confort exceptionnel grâce à la semelle rembourrée. Un indispensable du dressing streetwear.',
    shippingInfo: 'Livraison standard 3-5 jours, gratuite dès 50€', originCountry: 'Japon', isNew: true, isBestSeller: true, stock: 78,
  },
  {
    id: 'p4', slug: 'sac-cuir-structured', name: 'Sac à Main Cuir Structuré', brand: 'Maison Élégance', vendorId: 'b5',
    category: 'sacs', gender: 'femme', style: 'Chic', price: 89.00, oldPrice: 120.00, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/19869754/pexels-photo-19869754.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Sac rouge'),
      img('https://images.pexels.com/photos/27046146/pexels-photo-27046146.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Sac luxe'),
      img('https://images.pexels.com/photos/27204288/pexels-photo-27204288.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Sac cuir marron'),
    ],
    rating: 4.8, reviewCount: 156, sizes: [{ label: 'Unique', inStock: true }],
    colors: [{ name: 'Rouge', hex: '#CC0000' }, { name: 'Noir', hex: '#1a1a1a' }, { name: 'Marron', hex: '#8B4513' }],
    materials: ['Cuir de vachette', 'Fermeture dorée', 'Intérieur satiné'], description: 'Sac à main structuré en cuir premium. Format idéal pour tous les essentiels. Bandoulière amovible, fixation dorée. Élégance intemporelle.',
    shippingInfo: 'Livraison standard 3-5 jours', originCountry: 'Italie', isOnSale: true, stock: 34,
  },
  {
    id: 'p5', slug: 'costume-business-gris', name: 'Costume Business Gris', brand: 'Urban Heritage', vendorId: 'b1',
    category: 'professionnel', gender: 'homme', style: 'Business', price: 199.00, oldPrice: 280.00, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/32279088/pexels-photo-32279088.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Costume gris homme'),
      img('https://images.pexels.com/photos/16618419/pexels-photo-16618419.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Businessman costume'),
      img('https://images.pexels.com/photos/11982600/pexels-photo-11982600.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Costume studio'),
    ],
    rating: 4.7, reviewCount: 98, sizes: baseSizes,
    colors: [{ name: 'Gris', hex: '#808080' }, { name: 'Bleu nuit', hex: '#1e3a5f' }, { name: 'Noir', hex: '#1a1a1a' }],
    materials: ['70% Laine', '28% Polyester', '2% Élasthanne', 'Demi-toile'], description: 'Costume deux pièces demi-toile, coupe slim moderne. Veste à deux fentes, pantalon à pinces. Idéal pour entretiens, réunines et cérémonies professionnelles.',
    shippingInfo: 'Livraison standard 5-7 jours, retouches offertes', originCountry: 'Italie', isOnSale: true, stock: 15,
  },
  {
    id: 'p6', slug: 'robe-wax-africaine', name: 'Robe Wax Africaine Moderne', brand: 'Sahel Couture', vendorId: 'b2',
    category: 'traditionnel', gender: 'femme', style: 'Afro', price: 75.00, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/39296295/pexels-photo-39296295.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Mode africaine'),
      img('https://images.pexels.com/photos/39105578/pexels-photo-39105578.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Tenue traditionnelle'),
      img('https://images.pexels.com/photos/39485694/pexels-photo-39485694.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Mode africaine groupe'),
    ],
    rating: 5.0, reviewCount: 67, sizes: baseSizes,
    colors: [{ name: 'Multicolore', hex: '#FF6B35' }, { name: 'Indigo', hex: '#4B0082' }],
    materials: ['100% Coton wax', 'Tissu authentique', 'Fait main'], description: "Robe en tissu wax authentique, coupe moderne qui célèbre l'héritage africain. Motifs vibrants, finitions soignées. Chaque pièce est unique.",
    shippingInfo: 'Livraison internationale 7-14 jours', originCountry: 'Sénégal', isNew: true, stock: 12,
  },
  {
    id: 'p7', slug: 'ensemble-sport-tech', name: 'Ensemble Sport Tech Femme', brand: 'Active Motion', vendorId: 'b6',
    category: 'sport', gender: 'femme', style: 'Sport', price: 59.90, oldPrice: 89.90, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/29242372/pexels-photo-29242372.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Sportswear femme'),
      img('https://images.pexels.com/photos/29259712/pexels-photo-29259712.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Gym femme'),
      img('https://images.pexels.com/photos/28774699/pexels-photo-28774699.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Athletic wear'),
    ],
    rating: 4.5, reviewCount: 289, sizes: baseSizes,
    colors: [{ name: 'Bleu', hex: '#1e3a5f' }, { name: 'Noir', hex: '#1a1a1a' }, { name: 'Rose', hex: '#FF69B4' }],
    materials: ['78% Nylon', '22% Élasthanne', 'Séchage rapide', 'Sans couture'], description: 'Ensemble sport technique: legging haute taille + brassière maintien moyen. Tissu respirant, séchage rapide, compression légère. Pour toutes vos activités.',
    shippingInfo: 'Livraison standard 3-5 jours', originCountry: 'États-Unis', isOnSale: true, stock: 67,
  },
  {
    id: 'p8', slug: 'montre-classique-cuir', name: 'Montre Classique Bracelet Cuir', brand: 'Nordic Form', vendorId: 'b3',
    category: 'bijoux', gender: 'unisexe', style: 'Classique', price: 119.00, oldPrice: 159.00, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/6157408/pexels-photo-6157408.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Montre cuir'),
      img('https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Montre luxe'),
      img('https://images.pexels.com/photos/1136589/pexels-photo-1136589.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Montre or'),
    ],
    rating: 4.8, reviewCount: 134, sizes: [{ label: 'Unique', inStock: true }],
    colors: [{ name: 'Marron', hex: '#8B4513' }, { name: 'Noir', hex: '#1a1a1a' }],
    materials: ['Boîtier acier inox', 'Bracelet cuir véritable', 'Verre saphir'], description: 'Montre épurée au design scandinave. Cadran minimaliste, bracelet en cuir véritable interchangeable. Mouvement à quartz précis. Garantie 2 ans.',
    shippingInfo: 'Livraison standard 3-5 jours, emballage cadeau offert', originCountry: 'Suède', isOnSale: true, stock: 28,
  },
  {
    id: 'p9', slug: 'veste-streetwear-oversized', name: 'Veste Streetwear Oversized', brand: 'Tokyo Street', vendorId: 'b4',
    category: 'streetwear', gender: 'unisexe', style: 'Streetwear', price: 69.90, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/18432086/pexels-photo-18432086.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Streetwear couple'),
      img('https://images.pexels.com/photos/7969811/pexels-photo-7969811.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Streetwear groupe'),
      img('https://images.pexels.com/photos/14330642/pexels-photo-14330642.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Street fashion'),
    ],
    rating: 4.6, reviewCount: 201, sizes: baseSizes,
    colors: [{ name: 'Noir', hex: '#1a1a1a' }, { name: 'Kaki', hex: '#556B2F' }, { name: 'Crème', hex: '#FFFDD0' }],
    materials: ['65% Coton', '35% Polyester', 'Capuche doublée', 'Poches kangourou'], description: 'Veste streetwear oversized, coupe large tendance. Capuche ajustable, poches frontales. Parfaite pour un look urbain décontracté. Inspirée des rues de Tokyo.',
    shippingInfo: 'Livraison standard 3-5 jours', originCountry: 'Japon', isNew: true, stock: 54,
  },
  {
    id: 'p10', slug: 'lunettes-soleil-tendance', name: 'Lunettes de Soleil Tendance', brand: 'Nordic Form', vendorId: 'b3',
    category: 'accessoires', gender: 'unisexe', style: 'Fashion', price: 34.90, oldPrice: 49.90, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/32677231/pexels-photo-32677231.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Lunettes soleil'),
      img('https://images.pexels.com/photos/32677246/pexels-photo-32677246.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Lunettes noir'),
      img('https://images.pexels.com/photos/10237074/pexels-photo-10237074.jpeg?auto=compress&cs=tinysrgb&h=800&w=800', 'Lunettes automne'),
    ],
    rating: 4.4, reviewCount: 178, sizes: [{ label: 'Unique', inStock: true }],
    colors: [{ name: 'Écaille de tortue', hex: '#8B4513' }, { name: 'Noir', hex: '#1a1a1a' }],
    materials: ['Acétate', 'Verre polarisé UV400', 'Charnières flex'], description: 'Lunettes de soleil au design intemporel. Monture en acétate, verres polarisés protection UV400. Étui rigide et chiffon inclus. Style et protection.',
    shippingInfo: 'Livraison standard 3-5 jours', originCountry: 'Italie', isOnSale: true, stock: 89,
  },
  {
    id: 'p11', slug: 'manteau-hiver-laine', name: 'Manteau d\'Hiver en Laine', brand: 'Urban Heritage', vendorId: 'b1',
    category: 'hommes', gender: 'homme', style: 'Classique', price: 149.00, oldPrice: 220.00, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/35753745/pexels-photo-35753745.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Manteau hiver homme'),
      img('https://images.pexels.com/photos/14540784/pexels-photo-14540784.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Manteau marron'),
      img('https://images.pexels.com/photos/35773196/pexels-photo-35773196.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Mode hiver'),
    ],
    rating: 4.7, reviewCount: 112, sizes: baseSizes,
    colors: [{ name: 'Marron', hex: '#8B4513' }, { name: 'Bleu marine', hex: '#000080' }, { name: 'Gris', hex: '#808080' }],
    materials: ['80% Laine', '20% Cachemire', 'Doublure thermique', 'Col montant'], description: 'Manteau en laine cachemire, coupe longue et élégante. Doublure thermique pour un confort optimal. Idéal pour les hivers rigoureux tout en conservant une silhouette soignée.',
    shippingInfo: 'Livraison standard 5-7 jours', originCountry: 'Portugal', isOnSale: true, stock: 19,
  },
  {
    id: 'p12', slug: 'ensemble-enfant-traditionnel', name: 'Enfant Tenue Traditionnelle', brand: 'Sahel Couture', vendorId: 'b2',
    category: 'enfants', gender: 'enfant', style: 'Traditionnel', price: 39.90, currency: 'EUR',
    images: [
      img('https://images.pexels.com/photos/34608858/pexels-photo-34608858.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Enfant mode traditionnelle'),
      img('https://images.pexels.com/photos/30690921/pexels-photo-30690921.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Enfant costume'),
      img('https://images.pexels.com/photos/1620759/pexels-photo-1620759.jpeg?auto=compress&cs=tinysrgb&h=800&w=600', 'Enfants mode'),
    ],
    rating: 4.9, reviewCount: 45, sizes: [
      { label: '2A', inStock: true }, { label: '4A', inStock: true },
      { label: '6A', inStock: true }, { label: '8A', inStock: false },
      { label: '10A', inStock: true }, { label: '12A', inStock: true },
    ],
    colors: [{ name: 'Vert', hex: '#228B22' }, { name: 'Rouge', hex: '#CC0000' }],
    materials: ['100% Coton', 'Tissu wax', 'Confortable'], description: 'Tenue traditionnelle enfant en coton wax. Couleurs vives, coupe confortable. Parfaite pour les célébrations culturelles et les fêtes.',
    shippingInfo: 'Livraison internationale 7-14 jours', originCountry: 'Sénégal', isNew: true, stock: 25,
  },
];

export const reviews: Review[] = [
  { id: 'r1', productId: 'p1', userName: 'Thomas L.', userAvatar: 'https://images.pexels.com/photos/31618286/pexels-photo-31618286.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 5, comment: 'Qualité exceptionnelle, le lin est respirant et la coupe parfaite. Je recommande vivement !', date: '2026-08-15', helpful: 12 },
  { id: 'r2', productId: 'p1', userName: 'Aminata D.', userAvatar: 'https://images.pexels.com/photos/16131505/pexels-photo-16131505.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 4, comment: 'Très belle chemise, tissu de qualité. Taille un peu grand, prenez une taille en dessous.', date: '2026-08-10', helpful: 8 },
  { id: 'r3', productId: 'p2', userName: 'Sophie M.', userAvatar: 'https://images.pexels.com/photos/6220702/pexels-photo-6220702.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 5, comment: 'Robe magnifique, exactement comme sur les photos. Portée pour un mariage, j\'ai eu beaucoup de compliments !', date: '2026-09-01', helpful: 25 },
  { id: 'r4', productId: 'p3', userName: 'Kwame O.', userAvatar: 'https://images.pexels.com/photos/38884834/pexels-photo-38884834.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 5, comment: 'Sneakers confortables et stylées. La qualité du cuir est top pour ce prix.', date: '2026-09-20', helpful: 15 },
  { id: 'r5', productId: 'p5', userName: 'David K.', userAvatar: 'https://images.pexels.com/photos/17960004/pexels-photo-17960004.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', rating: 4, comment: 'Très bon costume, belle coupe. Le tissu est un peu fin mais parfait pour le prix.', date: '2026-08-28', helpful: 6 },
];

export const articles: Article[] = [
  {
    id: 'a1', slug: 'comment-associer-les-couleurs', title: 'Comment associer les couleurs de vos vêtements',
    category: 'Associer les couleurs', excerpt: 'Maîtrisez l\'art des combinaisons chromatiques pour des tenues harmonieuses et élégantes.',
    content: [
      'L\'association des couleurs est une compétence essentielle en mode. Une bonne harmonie chromatique transforme une tenue banale en un look mémorable.',
      'La règle des trois couleurs : ne dépassez pas trois couleurs principales dans une tenue. Une couleur dominante (60%), une secondaire (30%) et une accent (10%).',
      'Les couleurs complémentaires (opposées sur le cercle chromatique) créent un contraste dynamique. Par exemple, le bleu et l\'orange s\'associent parfaitement.',
      'Les couleurs analogues (voisines sur le cercle) offrent une harmonie douce. Le bleu, le vert et le turquoise fonctionnent ensemble naturellement.',
      'Les neutres (noir, blanc, gris, beige) s\'associent avec tout. Utilisez-les comme base pour faire ressortir une couleur vive.',
    ],
    thumbnail: 'https://images.pexels.com/photos/6220702/pexels-photo-6220702.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    author: 'Élise Moreau', authorAvatar: 'https://images.pexels.com/photos/7897299/pexels-photo-7897299.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    readTime: '5 min', views: 12450, likes: 892, type: 'article',
    tags: ['couleurs', 'bases', 'harmonie'],
  },
  {
    id: 'a2', slug: 'choisir-sa-morphologie', title: 'Bien s\'habiller selon sa morphologie',
    category: 'Comprendre sa morphologie', excerpt: 'Identifiez votre morphologie et choisissez les coupes qui vous mettent en valeur.',
    content: [
      'Chaque corps est unique. Connaître sa morphologie permet de choisir des vêtements qui flattent votre silhouette.',
      'Morphologie en V (épaules larges, taille fine) : Privilégiez les pantalons ajustés et les hauts avec col en V pour équilibrer la silhouette.',
      'Morphologie en X (taille marquée, hanches et épaules alignées) : C\'est la morphologie la plus équilibrée. Mettez la taille en valeur avec des ceintures.',
      'Morphologie en A (hanches larges) : Équilibrez le haut avec des hauts structurés et des couleurs claires. Pantalons droits ou évasés.',
      'Morphologie en O (taille marquée, formes généreuses) : Optez pour des coupes fluides, des tissus souples et des encolures dégagées.',
    ],
    thumbnail: 'https://images.pexels.com/photos/7969812/pexels-photo-7969812.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    author: 'Marcus Chen', authorAvatar: 'https://images.pexels.com/photos/16062780/pexels-photo-16062780.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    readTime: '7 min', views: 9820, likes: 678, type: 'guide',
    tags: ['morphologie', 'silhouette', 'conseils'],
  },
  {
    id: 'a3', slug: '5-facons-porter-jean', title: '5 façons de porter un jean',
    category: 'Mode masculine', excerpt: 'Le jean est un incontournable. Découvrez cinq manières de le styliser pour chaque occasion.',
    content: [
      'Le jean est le vêtement le plus polyvalent de votre garde-robe. Voici cinq façons de le porter avec style.',
      'Look casual : Jean slim + t-shirt blanc + sneakers. Simple, efficace, intemporel.',
      'Look chic : Jean droit + chemise blanche rentrée + derbies en cuir. Parfait pour un déjeuner entre amis.',
      'Look business casual : Jean foncé + blazer + chemise + chaussures en cuir. Accepté dans de nombreux bureaux modernes.',
      'Look streetwear : Jean oversized + hoodie + sneakers chunky. Tendance et confortable.',
      'Look soirée : Jean noir + top élégant + escarpins ou bottines. Élégant sans effort.',
    ],
    thumbnail: 'https://images.pexels.com/photos/18533668/pexels-photo-18533668.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    author: 'Sarah Johnson', authorAvatar: 'https://images.pexels.com/photos/7779233/pexels-photo-7779233.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    readTime: '4 min', views: 15600, likes: 1203, type: 'tutoriel',
    tags: ['jean', 'casual', 'styling'],
  },
  {
    id: 'a4', slug: 'tenue-entretien-embauche', title: 'Comment choisir sa tenue pour un entretien d\'embauche',
    category: 'Mode professionnelle', excerpt: 'Faites bonne impression dès les premières secondes avec la tenue parfaite pour un entretien.',
    content: [
      'Le premier regard compte. Votre tenue envoie un message avant même que vous ne parliez.',
      'Renseign-vous sur le dress code de l\'entreprise. Une startup acceptera un smart casual, une banque préférera le costume-cravate.',
      'Pour un environnement formel : costume bien coupé (navy ou gris), chemise blanche ou bleu clair, chaussures en cuir noires.',
      'Pour un environnement décontracté : pantalon chino, chemise ou blouse soyeuse, blazer optionnel, chaussures propres en cuir.',
      'Évitez les couleurs criardes, les accessoires trop voyants et les parfums envahissants. Optez pour la sobriété et la qualité.',
    ],
    thumbnail: 'https://images.pexels.com/photos/7610406/pexels-photo-7610406.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    author: 'David K.', authorAvatar: 'https://images.pexels.com/photos/17960004/pexels-photo-17960004.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    readTime: '6 min', views: 8930, likes: 545, type: 'article',
    tags: ['entretien', 'professionnel', 'business'],
  },
  {
    id: 'a5', slug: 'mode-responsable-guide', title: 'La mode responsable : guide du débutant',
    category: 'Mode responsable', excerpt: 'Comment consommer la mode de manière plus éthique et durable sans sacrifier le style.',
    content: [
      'La mode responsable n\'est pas une tendance, c\'est une nécessité. Voici comment adopter une garde-robe plus durable.',
      'Achetez moins mais mieux. Privilégiez la qualité à la quantité. Un vêtement bien fait dure des années.',
      'Vérifiez les matières : optez pour le coton biologique, le lin, le chanvre, le Tencel. Évitez le polyester quand possible.',
      'Soutenez les marques transparentes sur leur chaîne de production. Les certifications GOTS, OEKO-TEX et Fair Trade sont des gages de qualité éthique.',
      'Entretenez vos vêtements : lavez à basse température, séchez à l\'air libre, répare plutôt que jeter. Un vêtement entretenu dure deux fois plus longtemps.',
    ],
    thumbnail: 'https://images.pexels.com/photos/6069975/pexels-photo-6069975.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    author: 'Nadia Faye', authorAvatar: 'https://images.pexels.com/photos/8396734/pexels-photo-8396734.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    readTime: '8 min', views: 6780, likes: 921, type: 'guide',
    tags: ['éthique', 'durable', 'écologie'],
  },
  {
    id: 'a6', slug: 'accessoires-bien-choisir', title: 'Les accessoires : la touche qui fait la différence',
    category: 'Accessoires', excerpt: 'Montres, ceintures, bijoux : maîtrisez l\'art des accessoires pour sublimer vos tenues.',
    content: [
      'Les accessoires transforment une tenue simple en un look unique. Ils expriment votre personnalité.',
      'La montre : un investissement de style. Choisissez-la selon votre style de vie : classique pour le bureau, sport pour le weekend.',
      'La ceinture doit assortir vos chaussures en cuir. C\'est une règle d\'or du style masculin et féminin.',
      'Les bijoux : moins est plus. Un seul bijou statement vaut mieux que dix petits. Choisissez-le en fonction de votre tenue.',
      'Le sac à main : investissez dans un sac de qualité en cuir véritable. Il vous accompagnera pendant des années.',
    ],
    thumbnail: 'https://images.pexels.com/photos/35994530/pexels-photo-35994530.jpeg?auto=compress&cs=tinysrgb&h=400&w=600',
    author: 'Élise Moreau', authorAvatar: 'https://images.pexels.com/photos/7897299/pexels-photo-7897299.jpeg?auto=compress&cs=tinysrgb&h=100&w=100',
    readTime: '5 min', views: 7230, likes: 487, type: 'infographie',
    tags: ['accessoires', 'montre', 'bijoux'],
  },
];

export const looks: Look[] = [
  { id: 'l1', title: 'Streetwear Urbain Mixte', image: 'https://images.pexels.com/photos/18432086/pexels-photo-18432086.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Streetwear', gender: 'unisexe', style: 'Streetwear', productIds: ['p9', 'p3', 'p10'], likes: 1245, description: 'Look streetwear complet avec veste oversized, sneakers et lunettes.' },
  { id: 'l2', title: 'Élégance Soirée Femme', image: 'https://images.pexels.com/photos/14801160/pexels-photo-14801160.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Cérémonie', gender: 'femme', style: 'Élégant', productIds: ['p2', 'p4', 'p8'], likes: 2340, description: 'Tenue de soirée élégante avec robe longue, sac structuré et montre.' },
  { id: 'l3', title: 'Business Casual Homme', image: 'https://images.pexels.com/photos/31618286/pexels-photo-31618286.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Business', gender: 'homme', style: 'Business', productIds: ['p5', 'p8', 'p10'], likes: 890, description: 'Look professionnel moderne : costume, montre classique et lunettes.' },
  { id: 'l4', title: 'Casual Été Homme', image: 'https://images.pexels.com/photos/775771/pexels-photo-775771.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Casual', gender: 'homme', style: 'Casual', productIds: ['p1', 'p3'], likes: 567, description: 'Tenue décontractée estivale avec chemise en lin et sneakers.' },
  { id: 'l5', title: 'Afro Contemporain', image: 'https://images.pexels.com/photos/39296295/pexels-photo-39296295.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Traditionnel', gender: 'femme', style: 'Afro', productIds: ['p6', 'p4'], likes: 1890, description: 'Look afro moderne avec robe wax et sac en cuir.' },
  { id: 'l6', title: 'Sport Tech Femme', image: 'https://images.pexels.com/photos/29242372/pexels-photo-29242372.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Sport', gender: 'femme', style: 'Sport', productIds: ['p7', 'p3'], likes: 734, description: 'Ensemble sport technique avec sneakers pour le fitness.' },
  { id: 'l7', title: 'Hiver Élégant', image: 'https://images.pexels.com/photos/35753745/pexels-photo-35753745.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Hiver', gender: 'homme', style: 'Classique', productIds: ['p11', 'p8', 'p10'], likes: 1023, description: 'Manteau en laine, montre et lunettes pour un hiver élégant.' },
  { id: 'l8', title: 'Chic Minimaliste Femme', image: 'https://images.pexels.com/photos/20483777/pexels-photo-20483777.jpeg?auto=compress&cs=tinysrgb&h=600&w=450', category: 'Chic', gender: 'femme', style: 'Minimaliste', productIds: ['p4', 'p8', 'p10'], likes: 1567, description: 'Look minimaliste chic avec sac, montre et lunettes.' },
];

export const posts: Post[] = [
  { id: 'post1', userName: 'Aïcha B.', userAvatar: 'https://images.pexels.com/photos/16131505/pexels-photo-16131505.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', userCountry: 'Sénégal', image: 'https://images.pexels.com/photos/39296295/pexels-photo-39296295.jpeg?auto=compress&cs=tinysrgb&h=600&w=500', caption: 'Nouveau look avec ma robe wax de Sahel Couture ! Quelle couleur préférez-vous ?', hashtags: ['#wax', '#afrofashion', '#sahelcouture'], likes: 234, shares: 12, saved: false, createdAt: '2026-09-25', productIds: ['p6'], comments: [
    { id: 'c1', userName: 'Marie L.', userAvatar: 'https://images.pexels.com/photos/7897299/pexels-photo-7897299.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', text: 'Magnifique ! Le rouge est parfait sur toi.', date: '2026-09-25' },
    { id: 'c2', userName: 'Kofi A.', userAvatar: 'https://images.pexels.com/photos/38884834/pexels-photo-38884834.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', text: 'Style au top ! Sahel Couture fait du super boulot.', date: '2026-09-26' },
  ]},
  { id: 'post2', userName: 'James W.', userAvatar: 'https://images.pexels.com/photos/38884834/pexels-photo-38884834.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', userCountry: 'Royaume-Uni', image: 'https://images.pexels.com/photos/18432086/pexels-photo-18432086.jpeg?auto=compress&cs=tinysrgb&h=600&w=500', caption: 'Streetwear vibes today in London. Jacket from Tokyo Street is fire!', hashtags: ['#streetwear', '#london', '#tokyostreet'], likes: 567, shares: 23, saved: false, createdAt: '2026-09-24', productIds: ['p9'], comments: [
    { id: 'c3', userName: 'Yuki T.', userAvatar: 'https://images.pexels.com/photos/16062780/pexels-photo-16062780.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', text: 'That oversized fit is perfect!', date: '2026-09-24' },
  ]},
  { id: 'post3', userName: 'Sofia R.', userAvatar: 'https://images.pexels.com/photos/7897130/pexels-photo-7897130.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', userCountry: 'Espagne', image: 'https://images.pexels.com/photos/14801160/pexels-photo-14801160.jpeg?auto=compress&cs=tinysrgb&h=600&w=500', caption: 'Soirée gala avec ma robe Maison Élégance. Je me sens incroyable !', hashtags: ['#gala', '#elegance', '#maisonélégance'], likes: 890, shares: 45, saved: false, createdAt: '2026-09-23', productIds: ['p2'], comments: [
    { id: 'c4', userName: 'Thomas L.', userAvatar: 'https://images.pexels.com/photos/31618286/pexels-photo-31618286.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', text: 'Absolutely stunning!', date: '2026-09-23' },
    { id: 'c5', userName: 'Nadia F.', userAvatar: 'https://images.pexels.com/photos/8396734/pexels-photo-8396734.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', text: 'Cette robe est sublime sur toi !', date: '2026-09-24' },
  ]},
  { id: 'post4', userName: 'Chen W.', userAvatar: 'https://images.pexels.com/photos/16062780/pexels-photo-16062780.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', userCountry: 'Chine', image: 'https://images.pexels.com/photos/14330642/pexels-photo-14330642.jpeg?auto=compress&cs=tinysrgb&h=600&w=500', caption: 'Casual day out. Sometimes simple is better.', hashtags: ['#casual', '#minimal', '#ootd'], likes: 345, shares: 8, saved: false, createdAt: '2026-09-22', comments: []},
  { id: 'post5', userName: 'Fatou N.', userAvatar: 'https://images.pexels.com/photos/8396734/pexels-photo-8396734.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', userCountry: 'Mali', image: 'https://images.pexels.com/photos/39105578/pexels-photo-39105578.jpeg?auto=compress&cs=tinysrgb&h=600&w=500', caption: 'Célébration culturelle aujourd\'hui. Fière de mes racines !', hashtags: ['#culture', '#africanfashion', '#heritage'], likes: 1234, shares: 67, saved: false, createdAt: '2026-09-21', productIds: ['p6'], comments: [
    { id: 'c6', userName: 'Aïcha B.', userAvatar: 'https://images.pexels.com/photos/16131505/pexels-photo-16131505.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', text: 'Représente fièrement!', date: '2026-09-21' },
  ]},
  { id: 'post6', userName: 'Maria S.', userAvatar: 'https://images.pexels.com/photos/29995743/pexels-photo-29995743.jpeg?auto=compress&cs=tinysrgb&h=100&w=100', userCountry: 'Brésil', image: 'https://images.pexels.com/photos/7610406/pexels-photo-7610406.jpeg?auto=compress&cs=tinysrgb&h=600&w=500', caption: 'Business casual pour le bureau. Confiance et élégance.', hashtags: ['#business', '#workwear', '#professional'], likes: 456, shares: 15, saved: false, createdAt: '2026-09-20', productIds: ['p5'], comments: []},
];

export const creators: Creator[] = [
  { id: 'cr1', name: 'Aïcha Beauté', avatar: 'https://images.pexels.com/photos/16131505/pexels-photo-16131505.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', bio: 'Styliste et créatrice de contenu mode afro-contemporaine. J\'aime mélanger tradition et modernité.', specialties: ['Afro', 'Traditionnel', 'Chic'], country: 'Sénégal', followers: 125000, following: 234, posts: 456, productIds: ['p6'], isFollowing: false },
  { id: 'cr2', name: 'James Style', avatar: 'https://images.pexels.com/photos/38884834/pexels-photo-38884834.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', bio: 'Streetwear enthusiast from London. I document the best urban fashion across Europe.', specialties: ['Streetwear', 'Casual', 'Y2K'], country: 'Royaume-Uni', followers: 89000, following: 567, posts: 289, productIds: ['p9', 'p3'], isFollowing: false },
  { id: 'cr3', name: 'Sofia Élégance', avatar: 'https://images.pexels.com/photos/7897130/pexels-photo-7897130.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', bio: 'Fashion editor and stylist. Passionate about timeless elegance and modern femininity.', specialties: ['Élégant', 'Chic', 'Minimaliste'], country: 'Espagne', followers: 234000, following: 189, posts: 678, productIds: ['p2', 'p4'], isFollowing: true },
  { id: 'cr4', name: 'Chen Wei', avatar: 'https://images.pexels.com/photos/16062780/pexels-photo-16062780.jpeg?auto=compress&cs=tinysrgb&h=200&w=200', bio: 'Tokyo-based fashion photographer. Minimalist aesthetic with a street edge.', specialties: ['Minimaliste', 'Streetwear', 'Fashion'], country: 'Chine', followers: 67000, following: 423, posts: 345, productIds: ['p9'], isFollowing: false },
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'promotion', title: 'Vente flash -30%', message: 'Profitez de -30% sur une sélection de chemises en lin, uniquement aujourd\'hui !', date: '2026-09-30', read: false, icon: 'Zap' },
  { id: 'n2', type: 'order', title: 'Commande expédiée', message: 'Votre commande #SW-2026-00124 a été expédiée. Suivez-la en temps réel.', date: '2026-09-29', read: false, icon: 'Package' },
  { id: 'n3', type: 'social', title: 'Nouvel abonné', message: 'Sofia Élégance commence à vous suivre.', date: '2026-09-28', read: true, icon: 'UserPlus' },
  { id: 'n4', type: 'recommendation', title: 'Retour en stock', message: 'La robe de soirée élégante que vous avez ajoutée aux favoris est de nouveau disponible.', date: '2026-09-27', read: true, icon: 'Heart' },
  { id: 'n5', type: 'promotion', title: 'Baisse de prix', message: 'Le costume business gris a baissé de 20€ !', date: '2026-09-26', read: true, icon: 'Tag' },
];

export const articleCategories = [
  'Comment bien s\'habiller',
  'Associer les couleurs',
  'Choisir sa taille',
  'Comprendre sa morphologie',
  'Choisir ses chaussures',
  'Accessoires',
  'Mode masculine',
  'Mode féminine',
  'Mode professionnelle',
  'Mode traditionnelle',
  'Entretien des vêtements',
  'Mode responsable',
];

export const styleQuizQuestions = [
  {
    id: 'q1', question: 'Quels vêtements portez-vous le plus souvent ?', options: [
      { value: 'homme', label: 'Vêtements homme', styles: [] },
      { value: 'femme', label: 'Vêtements femme', styles: [] },
      { value: 'mixte', label: 'Vêtements mixtes / unisexe', styles: [] },
    ],
  },
  {
    id: 'q2', question: 'Quelle est votre tranche d\'âge ?', options: [
      { value: '18-25', label: '18 - 25 ans', styles: ['Y2K', 'Streetwear'] },
      { value: '26-35', label: '26 - 35 ans', styles: ['Fashion', 'Streetwear'] },
      { value: '36-45', label: '36 - 45 ans', styles: ['Chic', 'Classique'] },
      { value: '46+', label: '46 ans et plus', styles: ['Classique', 'Élégant'] },
    ],
  },
  {
    id: 'q3', question: 'Quel style vous attire le plus ?', options: [
      { value: 'Casual', label: 'Décontracté et confortable', styles: ['Casual', 'Minimaliste'] },
      { value: 'Streetwear', label: 'Urbain et audacieux', styles: ['Streetwear', 'Y2K'] },
      { value: 'Chic', label: 'Élégant et raffiné', styles: ['Chic', 'Élégant'] },
      { value: 'Business', label: 'Professionnel et soigné', styles: ['Business', 'Classique'] },
      { value: 'Sport', label: 'Sportif et actif', styles: ['Sport'] },
      { value: 'Vintage', label: 'Rétro et original', styles: ['Vintage', 'Afro'] },
    ],
  },
  {
    id: 'q4', question: 'Quelles couleurs préférez-vous ?', options: [
      { value: 'Noir/Blanc', label: 'Noir, blanc, gris', styles: ['Minimaliste', 'Classique'] },
      { value: 'Bleu', label: 'Bleu, turquoise', styles: ['Business', 'Casual'] },
      { value: 'Chaud', label: 'Rouge, orange, jaune', styles: ['Afro', 'Fashion'] },
      { value: 'Terre', label: 'Beige, marron, kaki', styles: ['Vintage', 'Traditionnel'] },
      { value: 'Pastel', label: 'Rose, lavande, menthe', styles: ['Y2K', 'Chic'] },
    ],
  },
  {
    id: 'q5', question: 'Quelle est votre morphologie ?', options: [
      { value: 'V', label: 'Épaules larges, taille fine', styles: ['Casual', 'Business'] },
      { value: 'X', label: 'Taille marquée, équilibré', styles: ['Chic', 'Élégant'] },
      { value: 'A', label: 'Hanches plus larges', styles: ['Casual', 'Minimaliste'] },
      { value: 'O', label: 'Formes généreuses', styles: ['Élégant', 'Fashion'] },
    ],
  },
  {
    id: 'q6', question: 'Pour quelle occasion vous habillez-vous le plus ?', options: [
      { value: 'quotidien', label: 'Quotidien / travail', styles: ['Casual', 'Business'] },
      { value: 'soiree', label: 'Soirées et sorties', styles: ['Chic', 'Élégant'] },
      { value: 'sport', label: 'Sport et activités', styles: ['Sport'] },
      { value: 'ceremonie', label: 'Cérémonies et événements', styles: ['Élégant', 'Traditionnel'] },
    ],
  },
  {
    id: 'q7', question: 'Quel est votre budget moyen pour un vêtement ?', options: [
      { value: 'eco', label: 'Moins de 30€', styles: ['Casual', 'Streetwear'] },
      { value: 'mid', label: '30€ - 80€', styles: ['Fashion', 'Chic'] },
      { value: 'premium', label: '80€ - 200€', styles: ['Élégant', 'Business'] },
      { value: 'luxe', label: 'Plus de 200€', styles: ['Élégant', 'Classique'] },
    ],
  },
  {
    id: 'q8', question: 'Quel climat habitez-vous ?', options: [
      { value: 'tropical', label: 'Tropical / chaud toute l\'année', styles: ['Casual', 'Afro'] },
      { value: 'tempere', label: 'Tempéré / 4 saisons', styles: ['Classique', 'Business'] },
      { value: 'froid', label: 'Froid / hivers longs', styles: ['Classique', 'Minimaliste'] },
      { value: 'desert', label: 'Désertique / sec', styles: ['Casual', 'Traditionnel'] },
    ],
  },
];
