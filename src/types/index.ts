export type Gender = 'homme' | 'femme' | 'enfant' | 'unisexe';

export type StyleType =
  | 'Casual' | 'Chic' | 'Streetwear' | 'Classique' | 'Sport'
  | 'Élégant' | 'Minimaliste' | 'Vintage' | 'Traditionnel' | 'Business'
  | 'Y2K' | 'Afro' | 'Fashion';

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  gender?: Gender;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductSize {
  label: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  vendorId: string;
  category: string;
  gender: Gender;
  style: StyleType;
  price: number;
  oldPrice?: number;
  currency: string;
  images: ProductImage[];
  rating: number;
  reviewCount: number;
  sizes: ProductSize[];
  colors: { name: string; hex: string }[];
  materials: string[];
  description: string;
  shippingInfo: string;
  originCountry: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
  stock: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  country: string;
  rating: number;
  productCount: number;
  sales: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string[];
  thumbnail: string;
  author: string;
  authorAvatar: string;
  readTime: string;
  views: number;
  likes: number;
  type: 'article' | 'video' | 'tutoriel' | 'guide' | 'infographie';
  tags: string[];
}

export interface Look {
  id: string;
  title: string;
  image: string;
  category: string;
  gender: Gender;
  style: StyleType;
  productIds: string[];
  likes: number;
  description: string;
}

export interface Post {
  id: string;
  userName: string;
  userAvatar: string;
  userCountry: string;
  image: string;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: Comment[];
  shares: number;
  saved: boolean;
  createdAt: string;
  productIds?: string[];
}

export interface Comment {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  date: string;
}

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  specialties: string[];
  country: string;
  followers: number;
  following: number;
  posts: number;
  productIds: string[];
  isFollowing: boolean;
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface FavoriteItem {
  id: string;
  type: 'product' | 'look' | 'article' | 'creator';
}

export interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'social' | 'recommendation';
  title: string;
  message: string;
  date: string;
  read: boolean;
  icon: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}
