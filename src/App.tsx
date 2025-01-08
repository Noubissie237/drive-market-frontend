// App.tsx
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

function App() {
  return (
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;