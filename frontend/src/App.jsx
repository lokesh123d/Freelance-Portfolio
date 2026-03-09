import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import CaseStudy from "./pages/CaseStudy";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Services from "./pages/Services";
import { StorageProvider } from "./context/StorageContext";
import { ToastProvider } from "./context/ToastContext";
import { Navigate } from "react-router-dom";

// Scroll to top or hash on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Layout wrapper for public pages
function PublicLayout({ children }) {
  return (
    <>
      <div className="fixed inset-0 z-50 grain-overlay"></div>
      <div className="fixed top-0 left-0 h-1 bg-primary z-[100] w-full"></div>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <StorageProvider>
      <ToastProvider>
        <BrowserRouter>
          <Toast />
          <ScrollToTop />
          <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
          <Route path="/case-study/:id" element={<PublicLayout><CaseStudy /></PublicLayout>} />

          {/* Auth Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Route (Protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      </ToastProvider>
    </StorageProvider>
  );
}
