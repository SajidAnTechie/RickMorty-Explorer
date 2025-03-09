import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import CharactersPage from './components/CharactersPage';
import EpisodesPage from './components/EpisodesPage';

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

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
            <Box minH="100vh">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/characters"
                  element={
                    <ProtectedRoute>
                      <CharactersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/episodes"
                  element={
                    <ProtectedRoute>
                      <EpisodesPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/login" />} />
              </Routes>
            </Box>
          </Router>
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
