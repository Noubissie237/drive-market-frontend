import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';
import VehicleDetailPage from './pages/VehicleDetailPage';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CataloguePage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import AdvancedSearchPage from './pages/AdvanceSearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentPage';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo-client'; // Utiliser le client Apollo unifié
import { CartProvider } from './components/context/CartContext';
import VehiclesAdminPage from './pages/admin/vehicles';
import AboutPage from './pages/AboutPage';
import { AuthProvider } from './components/context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}> {/* Utiliser le client Apollo unifié */}
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Routes avec AuthLayout */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>

              {/* Routes avec MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogue" element={<CatalogPage />} />
                <Route path="/vehicule/:id" element={<VehicleDetailPage />} />
                <Route path="/panier" element={<CartPage />} />
                <Route path="/deep-search" element={<AdvancedSearchPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/admin" element={<VehiclesAdminPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/checkout" element={<PaymentPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;