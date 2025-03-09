import { useState } from 'react';
import { Box, Input, HStack, Text } from '@chakra-ui/react';
import { AgGridReact } from '@ag-grid-community/react';
import { ColDef } from '@ag-grid-community/core';
import { useQuery } from '@apollo/client';
import { GetEpisodesDocument, GetEpisodesQuery, GetEpisodesQueryVariables } from '../graphql/generated/graphql';
import Sidebar from './Sidebar';

const EpisodesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { loading, error, data } = useQuery<GetEpisodesQuery, GetEpisodesQueryVariables>(
        GetEpisodesDocument,
        {
            variables: {
                filter: {
                    name: searchTerm || undefined,
                },
            },
        }
    );

    const columnDefs: ColDef[] = [
        { field: 'name', sortable: true, filter: true },
        { field: 'air_date', headerName: 'Air Date', sortable: true },
        { field: 'episode', headerName: 'Episode Code', sortable: true },
        {
            field: 'characters',
            headerName: 'Characters Count',
            sortable: true,
            valueGetter: (params) => params.data.characters.length,
        },
    ];

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Box display="flex">
            <Sidebar />
            <Box flex="1" p={8} ml="64">
                <HStack spacing={4} mb={4}>
                    <Input
                        placeholder="Search by episode name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </HStack>

                <div className="ag-theme-alpine" style={{ height: 600 }}>
                    <AgGridReact
                        rowData={data?.episodes?.results}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationAutoPageSize={true}
                    />
                </div>
            </Box>
        </Box>
    );
};

export default EpisodesPage;