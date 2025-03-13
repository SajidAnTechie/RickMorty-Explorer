import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import PaginationControls from './PaginationControls';
import { Box, Input, Select, HStack, } from '@chakra-ui/react';
import { GetCharactersDocument, GetCharactersQuery, GetCharactersQueryVariables } from '../graphql/generated/graphql';

const CharactersPage = () => {
    const [filters, setFilters] = useState({
        name: '',
        status: '',
        species: '',
        gender: '',
    });
    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, data } = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
        GetCharactersDocument,
        {
            variables: {
                filter: filters,
                page: currentPage
            },
        }
    );

    const totalRecords = data?.characters?.info?.count ?? 0;
    const totalPagesCount = data?.characters?.info?.pages ?? 1;

    const columnDefs: ColDef[] = [
        { field: 'id', headerName: 'SN.', sortable: true },
        { field: 'name', sortable: true, filter: true },
        { field: 'status', sortable: true, filter: true },
        { field: 'species', sortable: true, filter: true },
        { field: 'gender', sortable: true, filter: true },
        { field: 'origin.name', headerName: 'Origin', sortable: true },
        {
            field: 'episode',
            headerName: 'Episodes Count',
            sortable: true,
            valueGetter: (params) => params.data.episode.length,
        },
    ];

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <Box flex="1" p={8} ml="64" maxW='50%'>
            <HStack gap={4} marginBottom={4}>
                <Input
                    placeholder="Search by name"
                    value={filters.name}
                    name='name'
                    onChange={(e) => handleFilterChange('name', e.target.value)}
                />
                <Select
                    placeholder="Filter by status"
                    value={filters.status}
                    name='status'
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </Select>
                <Select
                    placeholder="Filter by species"
                    value={filters.species}
                    name='species'
                    onChange={(e) => handleFilterChange('species', e.target.value)}
                >
                    <option value="human">Human</option>
                    <option value="alien">Alien</option>
                </Select>
                <Select
                    placeholder="Filter by gender"
                    value={filters.gender}
                    name='gender'
                    onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </Select>
            </HStack>

            <div className="ag-theme-alpine" style={{ height: 600 }}>
                <AgGridReact
                    rowData={data?.characters?.results}
                    columnDefs={columnDefs}
                    animateRows={true}
                    enableCellTextSelection={true}
                    loading={loading}
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