import type { MenuItem, Offer, GalleryImage, User, Order, PromoCode, SiteSettings, AboutPageSettings, ContactPageSettings } from '../types';
import { translations } from './translations';

export const initialSiteSettings: SiteSettings = {
    logoUrl: 'https://i.imgur.com/v82a0R3.png',
    heroImageUrl: 'https://images.unsplash.com/photo-1533035336122-4327d345c500?q=80&w=1920&auto=format&fit=crop',
    heroTagline: {
        ar: 'أسترين',
        en: 'ARABIC. WESTERN. FUSION'
    },
    heroSubtitle: {
        ar: translations.ar.heroSubtitle as string,
        en: translations.en.heroSubtitle as string,
    },
    aboutSnippet: {
        ar: translations.ar.ourStorySnippet as string,
        en: translations.en.ourStorySnippet as string,
    },
    aboutImageUrl: 'https://picsum.photos/seed/chef/600/400',
    footerDescription: {
        ar: translations.ar.footerDescription as string,
        en: translations.en.footerDescription as string,
    }
};

export const initialAboutSettings: AboutPageSettings = {
    mainImageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1287",
    ourStory: {
        ar: "ولد مطعم أسترين من شغف بالتميز في الطهي، وهو أكثر من مجرد مطعم؛ إنه احتفال بالاندماج الثقافي على طبق. بدأنا بفكرة بسيطة: خلق مساحة حيث يمكن للنكهات العربية التقليدية أن تتراقص مع التقنيات الغربية المعاصرة.",
        en: "Born from a passion for culinary excellence, Astren is more than just a restaurant; it's a celebration of cultural fusion on a plate. We started with a simple idea: to create a space where traditional Arabic flavors could dance with contemporary Western techniques."
    },
    ourPhilosophy: {
        ar: "نحن نؤمن بأن الطعام هو لغة عالمية. فلسفتنا هي استخدام المكونات الطازجة والمحلية لابتكار أطباق لا تقتصر على المذاق الرائع فحسب، بل تروي قصة أيضاً.",
        en: "We believe that food is a universal language. Our philosophy is to use the freshest, locally-sourced ingredients to create dishes that not only taste great but also tell a story."
    },
    ourTeam: {
        ar: "فريقنا من الطهاة والموظفين هم قلب أسترين. بشغفهم وخبرتهم، يعملون بلا كلل لضمان أن كل وجبة هي تجربة لا تُنسى لضيوفنا.",
        en: "Our team of chefs and staff are the heart of Astren. With their passion and expertise, they work tirelessly to ensure every meal is a memorable experience for our guests."
    }
};

export const initialContactSettings: ContactPageSettings = {
    address: {
        ar: "١٢٣ شارع الطعام، الرياض، المملكة العربية السعودية",
        en: "123 Food Street, Riyadh, Saudi Arabia"
    },
    phone: "+966 11 123 4567",
    email: "contact@astren.com",
    mapImageUrl: "https://www.e-architect.com/wp-content/uploads/2021/07/riyadh-city-saudi-arabia-g240721-1.jpg",
    socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#"
    }
};

export const initialMenuItems: MenuItem[] = [
    // Appetizers from image
    { 
        id: 'appetizer-cheesy-mushroom', 
        category: 'appetizers', 
        name: { ar: 'فطر بالجبن', en: 'Cheesy Mushroom' }, 
        description: { ar: 'الفطر الطازج المحشو بجبنة المورزيلا واللحم المقدد مع صلصة كريمية غنية بالنكهات', en: 'Fresh mushrooms stuffed with mozzarella cheese and bacon with a creamy sauce rich in flavors' }, 
        price: 6.9, 
        image: 'https://i.ibb.co/nMmLMTDp/Cheesy-Mushroom.jpg' 
    },
    { 
        id: 'appetizer-musakhan-roll', 
        category: 'appetizers', 
        name: { ar: 'مسخن رول', en: 'Musakhan Roll' }, 
        description: { ar: 'المسخن التقليدي بلفائف السبرينغ رول ولمسة عصرية غنية بالنكهات', en: 'Traditional Musakhan with spring rolls and a modern twist, rich in flavors.' }, 
        price: 3.99, 
        image: 'https://picsum.photos/seed/musakhanroll/400/300' 
    },
    { 
        id: 'appetizer-crab-bites', 
        category: 'appetizers', 
        name: { ar: 'كرات السلطعون', en: 'Crab Bites' }, 
        description: { ar: 'كرات السلطعون والخضار الطازجة المقلية', en: 'Fried crab and fresh vegetables mix' }, 
        price: 5.9, 
        image: 'https://picsum.photos/seed/crabbites/400/300' 
    },
    
    // Soups from image (Updated)
    {
        id: 'soup-harira',
        category: 'soups',
        name: { ar: 'شوربة الحرشة', en: 'Harcha Soup' },
        description: { ar: 'الحساء المغربي التقليدي بالتوابل الدافئة (خال من الغلوتين)', en: 'Traditional Moroccan Soup with Warming Spices (Gluten Free)' },
        price: 4.8,
        image: 'https://i.ibb.co/wNR54Vq5/Harira-Soup.jpg'
    },
    {
        id: 'soup-broccoli',
        category: 'soups',
        name: { ar: 'شوربة البروكلي', en: 'Broccoli Soup' },
        description: { ar: 'حساء البروكلي مع الكريمة (خال من الغلوتين)', en: 'Broccoli Soup with Cream (Gluten Free)' },
        price: 3.89,
        image: 'https://images.unsplash.com/photo-1552526881-727260023428?q=80&w=800'
    },
    {
        id: 'soup-borscht',
        category: 'soups',
        name: { ar: 'شوربة البورش', en: 'Borscht Soup' },
        description: { ar: 'حساء البورش الروسي التقليدي (خال من الغلوتين)', en: 'Traditional Russian Soup (Gluten Free)' },
        price: 4.8,
        image: 'https://i.ibb.co/Nndtm7Vh/Borscht-Soup.jpg'
    },

    // Salads from image
    {
        id: 'salad-grilled-caesar',
        category: 'salads',
        name: { ar: 'سلطة السيزر المشوية', en: 'Grilled Caesar Salad' },
        description: { ar: 'سلطة السيزر التقليدية مشوية بلمسة خاصة', en: 'Traditional Caesar salad grilled with a special twist' },
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800'
    },
    {
        id: 'salad-beetroot-apple',
        category: 'salads',
        name: { ar: 'سلطة الشمندر والتفاح', en: 'Beetroot and Apple Salad' },
        description: { ar: 'سلطة تجمع نكهة الشمندر الذيذ والتفاح والحمضيات مع الفواكة المجففة', en: 'A salad that combines the delicious flavor of beets, apples, and citrus fruits with dried fruits' },
        price: 4.9,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800'
    },
    {
        id: 'salad-quinoa-garden',
        category: 'salads',
        name: { ar: 'سلطة كينوا جاردن', en: 'Quinoa Garden Salad' },
        description: { ar: 'الكينوا الملونة مع العديد من الخضار والورقيات الطازجة وجبنة الفيتا مع صلصة vinaigrette', en: 'Colorful quinoa with lots of fresh vegetables and leaves, feta cheese with vinaigrette sauce' },
        price: 5.5,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800'
    },

    // Main Courses from image (non-combo)
    {
        id: 'main-beef-scallops',
        category: 'mains',
        name: { ar: 'بيف سكالوب', en: 'Beef Scallops' },
        description: { ar: 'لحم تندرلوين المقلي بالطريقة الإيطالية يقدم مع سباغيتي بومودورو والأراغولا', en: 'Italian-style pan-fried beef tenderloin served with spaghetti pomodoro and aragula' },
        price: 9.9,
        image: 'https://images.unsplash.com/photo-1625944131295-0950315c1825?q=80&w=800'
    },
    {
        id: 'main-mosaic-chicken',
        category: 'mains',
        name: { ar: 'دجاج موزاييك', en: 'Mosaic Chicken' },
        description: { ar: 'صدر الدجاج المتبل المشوي مع البطاطا المهروسة والخضار المسلوقة', en: 'Grilled marinated chicken breast with mashed potatoes and boiled vegetables' },
        price: 6.9,
        image: 'https://i.ibb.co/bfVZ7pD/Mosaic-Chicken.jpg'
    },
    {
        id: 'main-fried-hamour',
        category: 'mains',
        name: { ar: 'صيادية سمك هامور المقلي', en: 'Fried Hamour Fish' },
        description: { ar: 'فيليه سمك الهامور المقلي مع أرز الصيادية التقليدي بلمسة عصرية', en: 'Fried Hammour fillet with traditional Sayadeya rice with a modern twist' },
        price: 7.9,
        image: 'https://i.ibb.co/LDGRxnYN/Fried-Grilled-Hamour-Fish.jpg'
    },

    // Main Courses - Combo Deals from image
    // Subcategory: Signature Astren
    {
        id: 'combo-golden-fusion',
        category: 'combo',
        subcategory: { ar: 'أطباق أسترين الخاصة', en: 'Signature Astren' },
        name: { ar: 'الدمج الذهبي', en: 'Golden Fusion' },
        description: { ar: 'عصير ماتشا وأفوكادو + شوربة البروكلي + بيف سكالوبيني', en: 'Matcha & Avocado Juice + Broccoli Soup + Beef Scallopini' },
        price: 13.99,
        originalPrice: 18.89,
        image: 'https://images.unsplash.com/photo-1598944983375-680c8504005b?q=80&w=800'
    },
    {
        id: 'combo-luxury-bites',
        category: 'combo',
        subcategory: { ar: 'أطباق أسترين الخاصة', en: 'Signature Astren' },
        name: { ar: 'لقيمات الفخامة', en: 'Luxury Bites' },
        description: { ar: 'عصير الشمندر والبرتقال + فطر بالجبنة + لقيمات السلطعون', en: 'Beetroot & Orange Juice + Cheese Mushroom + Crab Bites' },
        price: 14.49,
        originalPrice: 15.7,
        image: 'https://images.unsplash.com/photo-1529312266912-b7a666851532?q=80&w=800'
    },
    {
        id: 'combo-sea-harmony',
        category: 'combo',
        subcategory: { ar: 'أطباق أسترين الخاصة', en: 'Signature Astren' },
        name: { ar: 'تناغم البحر', en: 'Sea Harmony' },
        description: { ar: 'صيادية الهامور (المشوي او المقلي) مع سلطة الكينوا و عصير الليمون و الكيوي و الشيا', en: 'Grilled or fried grouper fish with quinoa salad, lemon juice, kiwi and chia' },
        price: 13.99,
        originalPrice: 16.89,
        image: 'https://images.unsplash.com/photo-1598515213692-5f284528df54?q=80&w=800'
    },
    // Subcategory: High Protein
    {
        id: 'combo-power-meal',
        category: 'combo',
        subcategory: { ar: 'عالي البروتين', en: 'High Protein' },
        name: { ar: 'وجبة القوة', en: 'Power Meal' },
        description: { ar: 'دجاج موزايك و شوربة الحريرة مع عصيرالأفوكادو و الماتشا', en: 'Mosaic Chicken and Harira Soup with Avocado and Matcha Smoothie' },
        price: 12.99,
        originalPrice: 15.29,
        image: 'https://i.ibb.co/bfVZ7pD/Mosaic-Chicken.jpg'
    },
    {
        id: 'combo-muscle-fuel',
        category: 'combo',
        subcategory: { ar: 'عالي البروتين', en: 'High Protein' },
        name: { ar: 'بوكس الطاقة العضلية', en: 'Muscle Fuel Box' },
        description: { ar: 'دجاج موزايك و سلطة الكينوا مع عصير ماتشا وأفوكادو', en: 'Mosaic Chicken and Quinoa Salad with Matcha Avocado Smoothie' },
        price: 12.99,
        originalPrice: 15.89,
        image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?q=80&w=800'
    },
    {
        id: 'combo-athlete-box',
        category: 'combo',
        subcategory: { ar: 'عالي البروتين', en: 'High Protein' },
        name: { ar: 'بوكس أسترن الرياضي', en: 'Astren Athlete Box' },
        description: { ar: 'عصير الشمندر والبرتقال + دجاج موزايك + سلطة السيزر المشوية', en: 'Beetroot & Orange Juice + Mosaic Chicken + Grilled Caesar Salad' },
        price: 12.6,
        originalPrice: 15.89,
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800'
    },
    // Subcategory: Healthy & Light
    {
        id: 'combo-green-balance',
        category: 'combo',
        subcategory: { ar: 'صحي وخفيف', en: 'Healthy & Light' },
        name: { ar: 'بوكس التوازن الأخضر', en: 'Green Balance Box' },
        description: { ar: 'سلطة الكينوا + عصير ماتشا وأفوكادو', en: 'Quinoa Salad + Matcha & Avocado Juice' },
        price: 6.99,
        originalPrice: 8.99,
        image: 'https://i.ibb.co/fTXdFhg/1-1.png'
    },
    {
        id: 'combo-red-vitality',
        category: 'combo',
        subcategory: { ar: 'صحي وخفيف', en: 'Healthy & Light' },
        name: { ar: 'بوكس الحيوية الحمراء', en: 'Red Vitality Box' },
        description: { ar: 'عصير الشمندر والبرتقال والتفاح + سلطة الشمندر الطازجة', en: 'Beetroot, Orange & Apple Juice + Fresh Beet Root Salad' },
        price: 6.75,
        originalPrice: 7.8,
        image: 'https://images.unsplash.com/photo-1525380584508-25e1c31dee8a?q=80&w=800'
    },
    {
        id: 'combo-fresh-focus',
        category: 'combo',
        subcategory: { ar: 'صحي وخفيف', en: 'Healthy & Light' },
        name: { ar: 'بوكس الانتعاش والتركيز', en: 'Fresh Focus Box' },
        description: { ar: 'سلطة السيزر المشوية + عصير الليمون و الكيوي و حبوب الشيا', en: 'Grilled Caesar Salad + Refreshing Lemon , Kiwi & Shia Juice' },
        price: 6.99,
        originalPrice: 8.99,
        image: 'https://images.unsplash.com/photo-1505253716362-af58498a8e79?q=80&w=800'
    },

    // Kids Meals from image
    {
        id: 'kids-chicken-sliders',
        category: 'kids',
        name: { ar: 'برجر صدر الدجاج المشوي (مخصص للأطفال)', en: 'Chicken Sliders (Made for Kids)' },
        description: { ar: 'صدر دجاج صحي مشوي داخل خبز البطاطس، مع بطاطس مقلية لذيذة وهدية للأطفال خالي من الزيوات المهدرجة و الملونات الصناعيه و مطريات اللحوم', en: 'Healthy grilled chicken breast served inside potato bread, with delicious French fries and a free gift for children,( free from hydrogenated oils, artificial colors, and meat tenderizers)' },
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1603614569483-21c82c03c273?q=80&w=800'
    },
    {
        id: 'gift_kids_tenders', // Using existing ID to preserve deal functionality
        category: 'kids',
        name: { ar: 'تندر الدجاج (وجبة مخصصة للأطفال)', en: 'Chicken Tenders (made for kids)' },
        description: { ar: '(قطع الدجاج المقرمش تقدم مع بطاطس مقلية لذيذة وهدية للأطفال( خالي من الزيوت المهدرجة و الملونات الصناعيه و مطريات اللحوم', en: 'Chicken Tenders served with French fries and a free gift for children, free from hydrogenated oils, artificial colors, and meat tenderizers' },
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800'
    },

    // Drinks from image
    { id: 'drink-water', category: 'drinks', name: { ar: 'مياه معدنية', en: 'Mineral Water' }, description: { ar: 'مياه معدنية نقية', en: 'Pure mineral water' }, price: 0.5, image: 'https://images.unsplash.com/photo-1553564923-a4e1a4121d5b?q=80&w=800' },
    { id: 'drink-matrix-orange', category: 'drinks', name: { ar: 'ماتريكس برتقال', en: 'Matrix Orange' }, description: { ar: 'مشروب غازي بنكهة البرتقال', en: 'Orange flavored soft drink' }, price: 0.5, image: 'https://jebnalak.com/cdn/shop/files/blackfridayoffers-2024-02-24T171043.285_800x.png?v=1708783860' },
    { id: 'drink-matrix-up-diet', category: 'drinks', name: { ar: 'ماتريكس اب دايت', en: 'Matrix Up Diet' }, description: { ar: 'مشروب غازي دايت بنكهة الليمون', en: 'Diet lemon-lime soft drink' }, price: 0.5, image: 'https://jebnalak.com/cdn/shop/files/blackfridayoffers-2024-02-24T170428.301_800x.png?v=1708783473' },
    { id: 'drink-matrix-up', category: 'drinks', name: { ar: 'ماتريكس اب', en: 'Matrix Up' }, description: { ar: 'مشروب غازي بنكهة الليمون', en: 'Lemon-lime soft drink' }, price: 0.5, image: 'https://getspiritz.com/uploads/thumbs/13/139ddbe11e9cfafde8116d15efecefa9.png' },
    { id: 'drink-matrix-cola-diet', category: 'drinks', name: { ar: 'ماتريكس كولا دايت', en: 'Matrix Cola Diet' }, description: { ar: 'مشروب كولا دايت', en: 'Diet cola soft drink' }, price: 0.5, image: 'https://jebnalak.com/cdn/shop/files/blackfridayoffers-2024-02-24T165443.303_800x.png?v=1708782888' },
    { id: 'drink-matrix-cola', category: 'drinks', name: { ar: 'ماتريكس كولا', en: 'Matrix Cola' }, description: { ar: 'مشروب كولا كلاسيكي', en: 'Classic cola soft drink' }, price: 0.5, image: 'https://dnc-factory.com/wp-content/uploads/2025/04/Matrix-Cola-Carbonated-Drink-1.jpg' },
    { id: 'drink-matcha-avocado', category: 'drinks', name: { ar: 'ماتشا وافوكادو', en: 'Matcha and Avocado' }, description: { ar: 'جرعة من الهدوء والطاقة تجمع بين نكهة وكريمية الافوكادو', en: 'A dose of calm and energy combined with the flavor and creaminess of avocado' }, price: 1.5, image: 'https://i.ibb.co/ymTYM5v1/Matcha-and-Avocado.jpg' },
    { id: 'drink-lkp-juice', category: 'drinks', name: { ar: 'LKP عصير طبيعي', en: 'LKP Fresh Juice' }, description: { ar: 'عصير طبيعي يجمع بين انتعاش الليمون ونكهة الاناناس والكيوي مع حبوب الشيا الصحية (بدون سككر مضاف)', en: 'Natural juice that combines the freshness of lemon, the flavor of pineapple and kiwi with healthy chia seeds (Sugar free)' }, price: 1.5, image: 'https://i.ibb.co/DchCDF8/LKP-Fresh-Juice.jpg' },
    { id: 'drink-bog-juice', category: 'drinks', name: { ar: 'BOG عصير طبيعي', en: 'BOG Fresh Juice' }, description: { ar: 'عصير الشمندر والبرتقال والتفاح الاخضر الطازج بدون سكر مضاف', en: 'Fresh beetroot, orange and green apple juice with no added sugar' }, price: 1.5, image: 'https://i.ibb.co/vvm4Qbvs/BOG-Fresh-Juice.jpg' },
];

export const initialOffers: Offer[] = [
  {
    id: 'offer1',
    title: { ar: 'عشاء لشخصين', en: 'Dinner for Two' },
    description: { ar: 'استمتع بوجبة عشاء رومانسية لشخصين تشمل طبق رئيسي من اختيارك، طبق مقبلات للمشاركة، وحلويات مميزة بسعر خاص.', en: 'Enjoy a romantic dinner for two including a main course of your choice, a shared appetizer, and special desserts at a special price.' },
    image: 'https://picsum.photos/seed/dinnerdeal/500/350',
    isActive: false,
  },
  {
    id: 'offer2',
    title: { ar: 'غداء عمل', en: 'Business Lunch' },
    description: { ar: 'احصل على قائمة غداء عمل متكاملة من الأحد إلى الخميس، تشمل طبق رئيسي، سلطة، ومشروب غازي بسعر لا يصدق.', en: 'Get a full business lunch menu from Sunday to Thursday, including a main course, salad, and a soft drink at an incredible price.' },
    image: 'https://picsum.photos/seed/businesslunch/500/350',
    isActive: false,
  },
];

export const initialDailyDeals: Offer[] = [
  {
    id: 'deal1',
    title: { ar: "كومبو لشخصين مع هدية", en: "Combo for Two with a Gift" },
    description: { ar: "اختر وجبتين كومبو واحصل على طبق سلطة أو شوربة أو مقبلات مجاناً من اختيارك.", en: "Choose two combo meals and get a free item of your choice (salad, soup, or appetizer)." },
    image: 'https://picsum.photos/seed/weekdaydeal/500/350',
    isActive: false,
    rules: {
      mainCourseCount: 2,
      giftOptions: ['salad-grilled-caesar', 'soup-broccoli', 'appetizer-cheesy-mushroom']
    }
  },
  {
    id: 'deal2',
    title: { ar: "عرض غداء الموظفين", en: "Employee Lunch Offer" },
    description: { ar: "اختر وجبة رئيسية واحدة واحصل على طبق سلطة أو شوربة أو مقبلات مجاناً من اختيارك.", en: "Choose one main course and get a free item of your choice (salad, soup, or appetizer)." },
    image: 'https://picsum.photos/seed/lunchspecial/500/350',
    isActive: false,
    rules: {
      mainCourseCount: 1,
      giftOptions: ['salad-grilled-caesar', 'soup-broccoli', 'appetizer-cheesy-mushroom']
    }
  },
  {
    id: 'deal3',
    title: { ar: "عرض نهاية الأسبوع العائلي", en: "Weekend Family Deal" },
    description: { ar: "اشتري وجبتين رئيسيتين واحصل على وجبة أطفال مجاناً.", en: "Buy two main courses and get a free kids' meal." },
    image: 'https://picsum.photos/seed/weekenddeal/500/350',
    isActive: false,
    rules: {
      mainCourseCount: 2,
      giftOptions: ['gift_kids_tenders']
    }
  }
];

export const initialImages: GalleryImage[] = [
  // Fix: Changed numeric IDs to strings to match the GalleryImage type.
  { id: '1', src: 'https://picsum.photos/seed/food1/500/500', alt: { ar: 'طبق شهي', en: 'Delicious Dish' } },
  { id: '2', src: 'https://picsum.photos/seed/food2/500/500', alt: { ar: 'طبق شهي', en: 'Delicious Dish' } },
  { id: '5', src: 'https://picsum.photos/seed/ambience1/500/500', alt: { ar: 'ديكور المطعم', en: 'Restaurant Ambiance' } },
  { id: '6', src: 'https://picsum.photos/seed/food5/500/500', alt: { ar: 'طبق شهي', en: 'Delicious Dish' } },
];

export const initialUsers: User[] = [
    // FIX: Renamed 'uid' to 'id' to match the User type.
    { id: '1', phone: '0501234567', role: 'user', loyaltyBalance: 0 },
    { id: '2', phone: '0559876543', role: 'user', loyaltyBalance: 0 },
    { id: '3', phone: '0000000000', role: 'admin', loyaltyBalance: 0 },
];

export const initialPromoCodes: PromoCode[] = [
    { id: 'promo1', code: 'SAVE10', discount: 10, isActive: true },
    { id: 'promo2', code: 'ASTREN20', discount: 20, isActive: true },
    { id: 'promo3', code: 'EXPIRED', discount: 15, isActive: false },
];


export const initialOrders: Order[] = [
    { 
        id: 'order1', 
        userPhone: '0501234567',
        items: [
            { name: { ar: 'بيف سكالوب', en: 'Beef Scallops' }, quantity: 1, price: 9.9 },
            { name: { ar: 'ماتريكس كولا', en: 'Matrix Cola' }, quantity: 2, price: 0.5 },
        ],
        subtotal: 10.9,
        discount: 1.09,
        promoCode: 'SAVE10',
        vat: 1.57,
        total: 11.38,
        status: 'Delivered',
        date: '2024-07-20',
        deliveryAddress: "123 Main St, Riyadh",
        contactPhone: "0501234567",
        deliveryTime: "Now",
    },
     { 
        id: 'order2', 
        userPhone: '0559876543',
        items: [
            { name: { ar: 'دجاج موزاييك', en: 'Mosaic Chicken' }, quantity: 2, price: 6.9 },
        ],
        subtotal: 13.8,
        vat: 2.21,
        total: 16.01,
        status: 'Preparing',
        date: '2024-07-21',
        deliveryAddress: "456 Side St, Riyadh",
        contactPhone: "0559876543",
        deliveryTime: "18:30",
    }
];