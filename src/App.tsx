import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import Dashboard from './components/Dashboard';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <AuthProvider>
          <Router>
            <Box minH="100vh" minW='100vw'>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
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
