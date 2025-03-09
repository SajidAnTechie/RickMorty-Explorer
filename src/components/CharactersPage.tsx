import { useState } from 'react';
import { Box, Input, Select, HStack, Text } from '@chakra-ui/react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { useQuery } from '@apollo/client';
import { GetCharactersDocument, GetCharactersQuery, GetCharactersQueryVariables } from '../graphql/generated/graphql';
import Sidebar from './Sidebar';

const CharactersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');

    const { loading, error, data } = useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
        GetCharactersDocument,
        {
            variables: {
                filter: {
                    name: searchTerm || undefined,
                    status: statusFilter || undefined,
                    species: speciesFilter || undefined,
                    gender: genderFilter || undefined,
                },
            },
        }
    );

    const columnDefs: ColDef[] = [
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

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Box display="flex">
            <Sidebar />
            <Box flex="1" p={8} ml="64">
                <HStack gap={4} marginBottom={4}>
                    <Input
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Select
                        placeholder="Filter by status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </Select>
                    <Select
                        placeholder="Filter by species"
                        value={speciesFilter}
                        onChange={(e) => setSpeciesFilter(e.target.value)}
                    >
                        <option value="human">Human</option>
                        <option value="alien">Alien</option>
                    </Select>
                    <Select
                        placeholder="Filter by gender"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </Select>
                </HStack>

                <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
                    <AgGridReact
                        rowData={data?.characters?.results}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationAutoPageSize={true}
                        animateRows={true}
                        enableCellTextSelection={true}
                        suppressRowClickSelection={true}
                    />
                </div>
            </Box>
        </Box>
    );
};

export default CharactersPage;