import React, { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import type { MenuItem, Offer, Order, PromoCode, OrderStatus, User, LoyaltyLogEntry, GalleryImage, AboutPageSettings, ContactPageSettings, SiteSettings } from '../types';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext';
import { initialMenuItems, initialDailyDeals, initialImages, initialSiteSettings, initialAboutSettings, initialContactSettings } from '../lib/data';

interface DataContextType {
  menuItems: MenuItem[];
  dailyDeals: Offer[];
  galleryImages: GalleryImage[];
  orders: Order[];
  promoCodes: PromoCode[];
  users: User[];
  loyaltyLog: LoyaltyLogEntry[];
  siteSettings: SiteSettings;
  aboutSettings: AboutPageSettings;
  contactSettings: ContactPageSettings;
  addOrder: (order: Omit<Order, 'id'>) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  // Menu
  addMenuItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (itemId: string) => Promise<void>;
  // Deals
  addDailyDeal: (deal: Omit<Offer, 'id'>) => Promise<void>;
  updateDailyDeal: (deal: Offer) => Promise<void>;
  deleteDailyDeal: (dealId: string) => Promise<void>;
  // Promo Codes
  addPromoCode: (promo: Omit<PromoCode, 'id'>) => Promise<void>;
  updatePromoCode: (promo: PromoCode) => Promise<void>;
  deletePromoCode: (promoId: string) => Promise<void>;
  // Gallery
  addGalleryImage: (image: Omit<GalleryImage, 'id'>) => Promise<void>;
  updateGalleryImage: (image: GalleryImage) => Promise<void>;
  deleteGalleryImage: (imageId: string) => Promise<void>;
  // Settings
  updateSiteSettings: (settings: SiteSettings) => Promise<void>;
  updateAboutSettings: (settings: AboutPageSettings) => Promise<void>;
  updateContactSettings: (settings: ContactPageSettings) => Promise<void>;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

// Updated hook to be auth-aware and indicate loading state
function useFirestoreCollection<T extends { id: string }>(collectionName: string, isPrivate: boolean = false) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useContext(AuthContext);

    useEffect(() => {
        // If the collection is private, wait for auth to finish and ensure a user is logged in.
        if (isPrivate && (authLoading || !user)) {
            setData([]); // Clear data if user logs out or is not present
            setLoading(false);
            return;
        }

        const q = collection(db, collectionName);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items: T[] = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() } as T);
            });
            setData(items);
            setLoading(false);
        }, (error) => {
            console.error(`Error fetching ${collectionName}: `, error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName, isPrivate, user, authLoading]);
    return { data, loading };
}

// Generic CRUD functions
const addDocument = async (collectionName: string, data: any) => {
    await addDoc(collection(db, collectionName), data);
};
const updateDocument = async (collectionName: string, id: string, data: any) => {
    const docRef = doc(db, collectionName, id);
    await setDoc(docRef, data, { merge: true });
};
const deleteDocument = async (collectionName: string, id: string) => {
    await deleteDoc(doc(db, collectionName, id));
};


export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Public collections (raw data)
    const { data: menuItemsFromDB } = useFirestoreCollection<MenuItem>('menuItems');
    const { data: dailyDealsFromDB } = useFirestoreCollection<Offer>('dailyDeals');
    const { data: galleryImagesFromDB } = useFirestoreCollection<GalleryImage>('galleryImages');

    // State for public data, which falls back to initial data if Firestore is empty
    const menuItems = menuItemsFromDB.length > 0 ? menuItemsFromDB : initialMenuItems;
    const dailyDeals = dailyDealsFromDB.length > 0 ? dailyDealsFromDB : initialDailyDeals;
    const galleryImages = galleryImagesFromDB.length > 0 ? galleryImagesFromDB : initialImages;

    const [parsedMenuItems, setParsedMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const parsed = menuItems.map(item => {
            const price = parseFloat(String(item.price));
            const finalPrice = isNaN(price) ? 0 : price;
            let finalOriginalPrice: number | undefined = undefined;
            if (item.originalPrice !== null && item.originalPrice !== undefined && String(item.originalPrice).trim() !== '') {
                const originalPrice = parseFloat(String(item.originalPrice));
                if (!isNaN(originalPrice)) {
                    finalOriginalPrice = originalPrice;
                }
            }
            return {
                ...item,
                price: finalPrice,
                originalPrice: finalOriginalPrice,
            };
        });
        setParsedMenuItems(parsed);
    }, [menuItems]);
    
    // Private collections - pass `true`
    const { data: orders } = useFirestoreCollection<Order>('orders', true);
    const { data: promoCodes } = useFirestoreCollection<PromoCode>('promoCodes', true);
    const { data: users } = useFirestoreCollection<User>('users', true);
    const { data: loyaltyLog } = useFirestoreCollection<LoyaltyLogEntry>('loyaltyLog', true);
    
    // Settings can be public, with fallback to initial data
    const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
    const [aboutSettings, setAboutSettings] = useState<AboutPageSettings>(initialAboutSettings);
    const [contactSettings, setContactSettings] = useState<ContactPageSettings>(initialContactSettings);

    useEffect(() => {
        const settingsRef = doc(db, 'settings', 'site');
        const unsubscribe = onSnapshot(settingsRef, (doc) => {
            setSiteSettings(doc.exists() ? (doc.data() as SiteSettings) : initialSiteSettings);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const settingsRef = doc(db, 'settings', 'about');
        const unsubscribe = onSnapshot(settingsRef, (doc) => {
            setAboutSettings(doc.exists() ? (doc.data() as AboutPageSettings) : initialAboutSettings);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const settingsRef = doc(db, 'settings', 'contact');
        const unsubscribe = onSnapshot(settingsRef, (doc) => {
             setContactSettings(doc.exists() ? (doc.data() as ContactPageSettings) : initialContactSettings);
        });
        return () => unsubscribe();
    }, []);
    
    const addOrder = async (order: Omit<Order, 'id'>) => {
        await addDocument('orders', order);
        // Deduct loyalty points if used
        if (order.loyaltyPointsUsed && order.loyaltyPointsUsed > 0) {
            const user = users.find(u => u.phone === order.userPhone);
            if (user) {
                const newBalance = user.loyaltyBalance - (order.loyaltyPointsUsed ?? 0);
                await updateDocument('users', user.id, { loyaltyBalance: newBalance });
            }
        }
    };

    const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
        const orderRef = doc(db, "orders", orderId);
        const orderDoc = await getDoc(orderRef);
        const order = orderDoc.data() as Order;

        if (!order) return;

        // Award points only when changing status *to* Delivered
        if (order.status !== 'Delivered' && status === 'Delivered') {
            const pointsAwarded = parseFloat((order.total * 0.02).toFixed(2));
            const user = users.find(u => u.phone === order.userPhone);
            if (user) {
                const newBalance = user.loyaltyBalance + pointsAwarded;
                await updateDocument('users', user.id, { loyaltyBalance: newBalance });

                const logEntry = {
                    orderId: orderId,
                    userPhone: order.userPhone,
                    pointsAwarded,
                    date: new Date().toISOString(),
                };
                await addDocument('loyaltyLog', logEntry);
            }
        }
        await setDoc(orderRef, { status }, { merge: true });
    };

    const value = {
        menuItems: parsedMenuItems, 
        dailyDeals, 
        galleryImages, 
        orders, 
        promoCodes, 
        users, 
        loyaltyLog, 
        siteSettings, 
        aboutSettings, 
        contactSettings,
        addOrder, 
        updateOrderStatus,
        addMenuItem: (item) => addDocument('menuItems', item),
        updateMenuItem: (item) => updateDocument('menuItems', item.id, item),
        deleteMenuItem: (id) => deleteDocument('menuItems', id),
        addDailyDeal: (deal) => addDocument('dailyDeals', deal),
        updateDailyDeal: (deal) => updateDocument('dailyDeals', deal.id, deal),
        deleteDailyDeal: (id) => deleteDocument('dailyDeals', id),
        addPromoCode: (promo) => addDocument('promoCodes', promo),
        updatePromoCode: (promo) => updateDocument('promoCodes', promo.id, promo),
        deletePromoCode: (id) => deleteDocument('promoCodes', id),
        addGalleryImage: (image) => addDocument('galleryImages', image),
        updateGalleryImage: (image) => updateDocument('galleryImages', image.id, image),
        deleteGalleryImage: (id) => deleteDocument('galleryImages', id),
        updateSiteSettings: (settings) => updateDocument('settings', 'site', settings),
        updateAboutSettings: (settings) => updateDocument('settings', 'about', settings),
        updateContactSettings: (settings) => updateDocument('settings', 'contact', settings),
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};