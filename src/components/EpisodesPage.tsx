import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import PaginationControls from './PaginationControls';
import { Box, Input, HStack, Text } from '@chakra-ui/react';
import { GetEpisodesDocument, GetEpisodesQuery, GetEpisodesQueryVariables } from '../graphql/generated/graphql';

const EpisodesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, data } = useQuery<GetEpisodesQuery, GetEpisodesQueryVariables>(
        GetEpisodesDocument,
        {
            variables: {
                filter: {
                    name: searchTerm || undefined,
                },
                page: currentPage
            },
        }
    );

    const totalRecords = data?.episodes?.info?.count ?? 0;
    const totalPagesCount = data?.episodes?.info?.pages ?? 1;

    const columnDefs: ColDef[] = [
        { field: 'id', headerName: 'SN.', sortable: true },
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

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Box flex="1" p={8} ml="64" maxW='50%'>
            <HStack spacing={4} mb={4} width='250px'>
                <Input
                    placeholder="Search by episode name"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1)
                    }}
                />
            </HStack>

            <div className="ag-theme-alpine" style={{ height: 600 }}>
                <AgGridReact
                    rowData={data?.episodes?.results}
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

export default EpisodesPage;