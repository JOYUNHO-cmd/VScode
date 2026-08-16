import React, { useEffect } from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import FloatingContactButtons from './components/FloatingContactButtons';
import SEO from './components/SEO';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceLanding from './pages/ServiceLanding';
import RegionServiceLanding from './pages/RegionServiceLanding';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { SiteProvider } from './context/SiteContext';
import { AuthProvider } from './context/AuthContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
};

// Animated Routes Wrapper for silky smooth page transitions
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-grow flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceLanding />} />
          <Route path="/services/:serviceId/:regionId" element={<RegionServiceLanding />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// Layout wrapper to conditionally hide header/footer on admin
const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isServices = location.pathname === '/services';

  return (
    <>
      <SEO />
      {!isAdmin && <Navbar />}
      <main className="flex-grow min-h-screen flex flex-col">
        {children}
      </main>
      {!isAdmin && !isServices && <Footer />}
      {!isAdmin && <FloatingContactButtons />}
      {!isAdmin && <MobileStickyBar />}
    </>
  );
};

// ssrPath is set only when this component is rendered server-side by
// scripts/prerender.mjs, which has no `window` to drive a BrowserRouter.
interface AppProps {
  ssrPath?: string;
}

const App: React.FC<AppProps> = ({ ssrPath }) => {
  const routes = (
    <>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </>
  );

  return (
    <SiteProvider>
      <AuthProvider>
        {ssrPath ? (
          <MemoryRouter initialEntries={[ssrPath]}>{routes}</MemoryRouter>
        ) : (
          <BrowserRouter>{routes}</BrowserRouter>
        )}
      </AuthProvider>
    </SiteProvider>
  );
};

export default App;