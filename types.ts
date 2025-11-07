// Fix: Defined TranslatableString directly to remove circular dependency.
export type TranslatableString = {
  en: string;
  ar: string;
};

export interface MenuItem {
  id: string;
  category: 'appetizers' | 'mains' | 'drinks' | 'kids' | 'soups' | 'salads' | 'combo';
  name: TranslatableString;
  description: TranslatableString;
  price: number;
  originalPrice?: number;
  subcategory?: TranslatableString;
  image: string;
}

export interface Offer {
  id: string;
  title: TranslatableString;
  description: TranslatableString;
  image: string;
  // Optional fields for time-based daily deals
  activeDays?: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  timeRange?: { start: number; end: number }; // 24-hour format, e.g., { start: 13, end: 17 } for 1 PM to 5 PM
  availabilityText?: TranslatableString;
  // Rules for interactive deals
  rules?: {
    mainCourseCount: number;
    giftOptions: string[]; // Array of MenuItem IDs
  }
}

export interface GalleryImage {
  id: string; // Changed to string for Firestore compatibility
  src: string;
  alt: TranslatableString;
}

export interface User {
  // FIX: Renamed 'uid' to 'id' for consistency across data models.
  // This 'id' corresponds to the Firebase Auth UID and is used as the document ID in Firestore.
  id: string;
  phone: string;
  role: 'user' | 'admin';
  loyaltyBalance: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
  cartItemId: string; // Unique ID for this cart entry, e.g., "item-id-price"
}

export interface PromoCode {
  id: string;
  code: string;
  discount: number; // Percentage
  isActive: boolean;
}

export type OrderStatus = 'Received' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface LoyaltyLogEntry {
    id: string;
    orderId: string;
    userPhone: string;
    pointsAwarded: number;
    date: string;
}

export interface Order {
    id: string;
    userPhone: string;
    items: { name: TranslatableString; quantity: number; price: number }[];
    subtotal: number;
    discount?: number;
    promoCode?: string;
    loyaltyPointsUsed?: number;
    vat: number;
    total: number;
    status: OrderStatus;
    date: string;
    deliveryAddress: string;
    contactPhone: string;
    deliveryTime: string;
}

export interface SiteSettings {
    logoUrl: string;
    heroImageUrl: string;
    heroTagline: TranslatableString;
    heroSubtitle: TranslatableString;
    aboutSnippet: TranslatableString;
    aboutImageUrl: string;
    footerDescription: TranslatableString;
}

export interface AboutPageSettings {
    mainImageUrl: string;
    ourStory: TranslatableString;
    ourPhilosophy: TranslatableString;
    ourTeam: TranslatableString;
}

export interface ContactPageSettings {
    address: TranslatableString;
    phone: string;
    email: string;
    mapImageUrl: string;
    socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
    };
}