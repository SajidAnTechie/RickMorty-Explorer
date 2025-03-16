import { Box } from '@chakra-ui/react';
import Sidebar from './layout/Sidebar';
import NotFound from './pages/NotFound';
import * as routes from '../constants/routes';
import EpisodesPage from './pages/EpisodesPage';
import CharactersPage from './pages/CharactersPage';
import { Navigate, Route, Routes } from 'react-router-dom';

const Dashboard = () => {
    return (
        <Box display="flex">
            <Sidebar />
            <Routes>
                <Route
                    path={routes.CHARACTERS}
                    element={<CharactersPage />}
                />
                <Route
                    path={routes.EPISODES}
                    element={<EpisodesPage />}
                />
                <Route path={routes.HOME} element={<Navigate to={routes.CHARACTERS} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Box>
    )
}

export default Dashboard
