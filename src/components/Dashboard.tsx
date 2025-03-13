
import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import { Navigate, Route, Routes } from 'react-router-dom';
import CharactersPage from './CharactersPage';
import EpisodesPage from './EpisodesPage';
import NotFound from './NotFound';

const Dashboard = () => {
    return (
        <Box display="flex">
            <Sidebar />
            <Routes>
                <Route
                    path="/characters"
                    element={<CharactersPage />}
                />
                <Route
                    path="/episodes"
                    element={<EpisodesPage />}
                />
                <Route path="/" element={<Navigate to="/characters" />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    )
}

export default Dashboard
