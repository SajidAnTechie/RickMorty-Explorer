import lodash from 'lodash';
import AgGridTable from '../common/AgGridTable';
import { ColDef } from 'ag-grid-community';
import { useState, useCallback } from 'react';
import PaginationControls from '../common/PaginationControls';
import { Box, Input, HStack } from '@chakra-ui/react';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, MIN_DEBOUNCE_TIME } from '../../constants/appConstants';
import { useGetEpisodesQuery } from '../../api/graphql/generated/graphql';

const EpisodesPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [pageSize] = useState<number>(DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);

    const { loading, data } = useGetEpisodesQuery({
        variables: {
            filter: {
                name: searchTerm || undefined,
            },
            page: currentPage
        },
    });

    const totalRecords = data?.episodes?.info?.count ?? 0;
    const totalPagesCount = data?.episodes?.info?.pages ?? 1;

    const columnDefs: ColDef[] = [
        { field: 'sn', headerName: 'SN.', sortable: true },
        { field: 'name', sortable: true, filter: true },
        { field: 'air_date', headerName: 'Air Date', sortable: true },
        { field: 'episode', headerName: 'Episode Code', sortable: true },
        { field: 'characters', headerName: 'Characters Count', sortable: true },
    ];

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const searchDebounceFunction = useCallback(
        lodash.debounce(searchTerm => {
            setSearchTerm(searchTerm);
            setCurrentPage(1)
        }, MIN_DEBOUNCE_TIME),
        []
    );

    return (
        <Box flex="1" p={8} ml="64" maxW='50%'>
            <HStack spacing={4} mb={4} width='250px'>
                <Input
                    placeholder="Search by name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchDebounceFunction(e.target.value)}
                />
            </HStack>

            <div className="ag-theme-alpine" style={{ height: 600 }}>
                <AgGridTable
                    data={data?.episodes?.results?.map((episode, index) => ({
                        sn: (currentPage - 1) * pageSize + index + 1,
                        name: episode?.name ?? '',
                        air_date: episode?.air_date ?? '',
                        episode: episode?.episode ?? '',
                        characters: episode?.characters.length ?? 0,
                    })) ?? []}
                    columns={columnDefs}
                    isLoading={loading}
                />
            </div>

            <PaginationControls
                currentPage={currentPage}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
                totalPagesCount={totalPagesCount}
                totalRecords={totalRecords}
            />
        </Box>
    );
};

export default EpisodesPage;