import { Box, VStack, Button, useColorModeValue, Icon } from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      h="100vh"
      w="64"
      borderRight="1px"
      borderRightColor={borderColor}
      bg={bgColor}
      py={8}
    >
      <VStack spacing={4} align="stretch" px={4}>
        <Button
          variant={isActive('/characters') ? 'solid' : 'ghost'}
          colorScheme="blue"
          justifyContent="start"
          onClick={() => navigate('/characters')}
        >
          Characters
        </Button>
        <Button
          variant={isActive('/episodes') ? 'solid' : 'ghost'}
          colorScheme="blue"
          justifyContent="start"
          onClick={() => navigate('/episodes')}
        >
          Episodes
        </Button>
        <Button
          variant="ghost"
          colorScheme="red"
          justifyContent="start"
          onClick={handleLogout}
          mt="auto"
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;