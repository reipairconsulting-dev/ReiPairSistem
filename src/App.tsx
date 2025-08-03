import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { ServiceOrders } from './pages/ServiceOrders';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A1A3F]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C39C46]"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// App Routes Component
const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<ServiceOrders />} />
        <Route path="/inventory" element={<div className="p-6">Módulo de Estoque em desenvolvimento...</div>} />
        <Route path="/financial" element={<div className="p-6">Módulo Financeiro em desenvolvimento...</div>} />
        <Route path="/invoices" element={<div className="p-6">Módulo de Notas Fiscais em desenvolvimento...</div>} />
        <Route path="/sales" element={<div className="p-6">Módulo de Vendas em desenvolvimento...</div>} />
        <Route path="/crm" element={<div className="p-6">Módulo WhatsApp/CRM em desenvolvimento...</div>} />
        <Route path="/users" element={<div className="p-6">Módulo de Usuários em desenvolvimento...</div>} />
        <Route path="/reports" element={<div className="p-6">Módulo de Relatórios em desenvolvimento...</div>} />
        <Route path="/settings" element={<div className="p-6">Configurações em desenvolvimento...</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0A1A3F',
                color: '#fff',
                border: '1px solid #C39C46',
              },
              success: {
                iconTheme: {
                  primary: '#C39C46',
                  secondary: '#fff',
                },
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;