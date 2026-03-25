import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './features/auth/stores/useAuthStore';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { HomePage } from './pages/HomePage';
import { MessagesPage } from './pages/MessagesPage';

// A simple wrapper map to protect routes that require login
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    // Not logged in! Send them to the login page.
    return <Navigate to="/login" />;
  }
  
  return children;
};

// A simple wrapper to send logged-in users away from auth pages
const AuthRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (isAuthenticated) {
    // Already logged in! Send them to the home page.
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Authentication Pages */}
        <Route 
          path="/login" 
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          } 
        />
        <Route 
          path="/verify-email" 
          element={
            <AuthRoute>
              <VerifyEmailPage />
            </AuthRoute>
          } 
        />
        
        {/* Protected Application Pages */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/messages" 
          element={
            <ProtectedRoute>
              <MessagesPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route to redirect unknown pages to Home or Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
