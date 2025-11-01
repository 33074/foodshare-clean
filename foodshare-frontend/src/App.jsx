import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BrowseFoodPage from './pages/BrowseFoodPage';
import HowItWorksPage from './pages/HowItWorksPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DonateFoodPage from './pages/DonateFoodPage';
import ImpactPage from './pages/ImpactPage';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; 
import ResetPasswordPage from './pages/ResetPasswordPage'; 
import LoginSuccessPage from './pages/LoginSuccessPage'; // <-- Import new page
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="browse" element={<BrowseFoodPage />} /> 
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} /> 
        <Route path="reset-password" element={<ResetPasswordPage />} /> 
        <Route path="login-success" element={<LoginSuccessPage />} /> {/* <-- Add route */}

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="donate" element={<DonateFoodPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;
