import * as routes from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, VStack, Button, useColorModeValue } from '@chakra-ui/react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate(routes.LOGIN);
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
          variant={isActive(routes.CHARACTERS) ? 'solid' : 'ghost'}
          colorScheme="blue"
          justifyContent="start"
          onClick={() => navigate(routes.CHARACTERS)}
        >
          Characters
        </Button>
        <Button
          variant={isActive(routes.EPISODES) ? 'solid' : 'ghost'}
          colorScheme="blue"
          justifyContent="start"
          onClick={() => navigate(routes.EPISODES)}
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