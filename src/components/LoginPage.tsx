import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Heading,
    useToast,
    Container,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(username, password);

        if (success) {
            toast({
                title: 'Login successful',
                status: 'success',
                duration: 2000,
            });
            navigate('/characters');
        } else {
            toast({
                title: 'Login failed',
                description: 'Invalid credentials. Try admin/password',
                status: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <Container maxW="container.sm" py={10}>
            <Box
                p={8}
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
                bg="white"
            >
                <VStack gap={4} align="stretch">
                    <Heading textAlign="center" mb={6}>
                        Login
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                colorScheme="blue"
                                width="full"
                                mt={4}
                            >
                                Sign In
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Container>
    );
};

export default LoginPage;