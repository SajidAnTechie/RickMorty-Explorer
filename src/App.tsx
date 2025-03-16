import client from './api/apollo';
import * as routes from './constants/routes';
import Dashboard from './components/Dashboard';
import { ApolloProvider } from '@apollo/client';
import { AuthContextType } from './types/interfaces';
import LoginPage from './components/pages/LoginPage';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated }: AuthContextType = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to={routes.LOGIN} />;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          <Router>
            <Box minH="100vh" minW='100vw'>
              <Routes>
                <Route path={routes.LOGIN} element={<LoginPage />} />
              </Routes>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Box>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
