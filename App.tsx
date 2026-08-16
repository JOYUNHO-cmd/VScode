import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import FloatingContactButtons from './components/FloatingContactButtons';
import SEO from './components/SEO';
// Home stays a static import: it's the only route entry-server.tsx ever
// renders (SSR only ever matches '/'), and React Router doesn't mount the
// element of a non-matching <Route>, so lazy-loading every other page below
// is invisible to that render path but keeps them out of the initial bundle.
import Home from './pages/Home';
import { SiteProvider } from './context/SiteContext';

const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceLanding = lazy(() => import('./pages/ServiceLanding'));
const RegionServiceLanding = lazy(() => import('./pages/RegionServiceLanding'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const RouteFallback = () => (
  <div className="w-full flex-grow flex items-center justify-center py-24">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

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
        <Suspense fallback={<RouteFallback />}>
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
        </Suspense>
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
      {ssrPath ? (
        <MemoryRouter initialEntries={[ssrPath]}>{routes}</MemoryRouter>
      ) : (
        <BrowserRouter>{routes}</BrowserRouter>
      )}
    </SiteProvider>
  );
};

export default App;