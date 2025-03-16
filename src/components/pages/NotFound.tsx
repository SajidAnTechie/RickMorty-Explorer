import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import * as routes from '../../constants/routes';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box flex="1" p={8} ml="64" position={'absolute'} width={'100%'} height={'100vh'}>
            <Flex
                height="100vh"
                alignItems="center"
                justifyContent="center"
                bg="gray.50"
                flexDirection="column"
                width={'90%'}
                maxHeight={'100%'}
            >
                <Box textAlign="center">
                    <Heading
                        fontSize="6xl"
                        fontWeight="bold"
                        color="gray.800"
                    >
                        404
                    </Heading>
                    <Text fontSize="xl" color="gray.600" mt={4}>
                        Oops! The page you're looking for doesn't exist.
                    </Text>
                    <Button
                        colorScheme="blue"
                        mt={8}
                        size="lg"
                        onClick={() => navigate(routes.CHARACTERS)}
                    >
                        Go to Home
                    </Button>
                </Box>
            </Flex>
        </Box>
    );
};


export default NotFound;