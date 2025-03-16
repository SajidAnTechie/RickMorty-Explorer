import lodash from 'lodash';
import { ColDef } from 'ag-grid-community';
import { useCallback, useState } from 'react';
import AgGridTable from '../common/AgGridTable';
import PaginationControls from '../common/PaginationControls';
import { Box, Input, Select, HStack, Button, } from '@chakra-ui/react';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, MIN_DEBOUNCE_TIME } from '../../constants/appConstants';
import { FilterCharacter, useGetCharactersQuery } from '../../api/graphql/generated/graphql';

const CharactersPage = () => {
    const [filters, setFilters] = useState<FilterCharacter>({});
    const [pageSize] = useState<number>(DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE_NUMBER);

    const { loading, data } = useGetCharactersQuery({
        variables: {
            filter: filters,
            page: currentPage
        },
    });

    const totalRecords = data?.characters?.info?.count ?? 0;
    const totalPagesCount = data?.characters?.info?.pages ?? 1;

    const columnDefs: ColDef[] = [
        { field: 'sn', headerName: 'SN.', sortable: true },
        { field: 'name', sortable: true, filter: true },
        { field: 'status', sortable: true, filter: true },
        { field: 'species', sortable: true, filter: true },
        { field: 'gender', sortable: true, filter: true },
        { field: 'origin_name', headerName: 'Origin', sortable: true },
        { field: 'episode', headerName: 'Episodes Count', sortable: true },
    ];

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const searchDebounceFunction = useCallback(
        lodash.debounce(searchTerm => {
            setFilters((prev) => ({ ...prev, 'name': searchTerm }));
            setCurrentPage(1);
        }, MIN_DEBOUNCE_TIME),
        []
    );

    const handleClearFilter = () => {
        setFilters({});
        setCurrentPage(1);
    };

    return (
        <Box flex="1" p={8} ml="64" maxW='50%'>
            <HStack gap={4} marginBottom={4}>
                <Input
                    placeholder="Search by name"
                    name='name'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => searchDebounceFunction(e.target.value)}
                />
                <Select
                    placeholder="Filter by status"
                    value={filters.status ?? ''}
                    name='status'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange('status', e.target.value)}
                >
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </Select>
                <Select
                    placeholder="Filter by species"
                    value={filters.species ?? ''}
                    name='species'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange('species', e.target.value)}
                >
                    <option value="human">Human</option>
                    <option value="alien">Alien</option>
                </Select>
                <Select
                    placeholder="Filter by gender"
                    value={filters.gender ?? ''}
                    name='gender'
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleFilterChange('gender', e.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </Select>

                <Button
                    size="md"
                    colorScheme="blue"
                    onClick={() => handleClearFilter()}
                    isDisabled={Object.entries(filters).length === 0}
                    width='2xs'
                >
                    Clear
                </Button>
            </HStack>

            <div className="ag-theme-alpine" style={{ height: 600 }}>
                <AgGridTable
                    data={data?.characters?.results?.map((character, index) => ({
                        sn: (currentPage - 1) * pageSize + index + 1,
                        name: character?.name ?? '',
                        status: character?.status ?? '',
                        species: character?.species ?? '',
                        gender: character?.gender ?? '',
                        origin_name: character?.origin?.name ?? '',
                        episode: character?.episode.length ?? 0,
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

export default CharactersPage;