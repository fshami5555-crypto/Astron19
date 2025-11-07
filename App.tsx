import React, { useState, useEffect, useContext } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import Offers from './components/Offers';
import DailyDeals from './components/DailyDeals';
import About from './components/About';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Login from './components/Login';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import CartModal from './components/CartModal';
import { AppContext } from './contexts/AppContext';
import DealModal from './components/DealModal';

// New components for checkout flow
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import UserProtectedRoute from './components/UserProtectedRoute';
import Profile from './components/Profile';
import MenuItemDetail from './components/MenuItemDetail';


// New mobile components and hook
import SplashScreen from './components/SplashScreen';
import MobileHome from './components/MobileHome';
import BottomNav from './components/BottomNav';
import { useMediaQuery } from './hooks/useMediaQuery';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [showSplash, setShowSplash] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            setShowSplash(true);
            const timer = setTimeout(() => setShowSplash(false), 2000); // Splash screen for 2s
            return () => clearTimeout(timer);
        }
    }, [isMobile]);

    if (isMobile && showSplash) {
        return <SplashScreen />;
    }
    
    const mainContentStyle = isMobile ? { paddingBottom: '4rem' } : {};

    return (
        <div className="bg-[#1a1a1a] text-gray-200 min-h-screen flex flex-col">
            {!isMobile && <Header />}
            <main className="flex-grow" style={mainContentStyle}>
                <Routes>
                    <Route path="/" element={isMobile ? <MobileHome /> : <Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/:itemId" element={<MenuItemDetail />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/deals" element={<DailyDeals />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/checkout"
                        element={
                            <UserProtectedRoute>
                                <Checkout />
                            </UserProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <UserProtectedRoute>
                                <Profile />
                            </UserProtectedRoute>
                        }
                    />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            {isMobile ? <BottomNav /> : <Footer />}
            <CartModal />
            <DealModal />
        </div>
    );
};


const App: React.FC = () => {
  const { language } = useContext(AppContext);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
};

export default App;