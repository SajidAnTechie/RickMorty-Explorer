import { Button, HStack, Text } from '@chakra-ui/react';
import { PaginationControlsProps } from '../../types/interfaces';

const PaginationControls = ({ handlePageChange, currentPage, totalPagesCount, totalRecords, pageSize }: PaginationControlsProps) => {
    const startEntry = (currentPage - 1) * pageSize + 1;
    const endEntry = Math.min(currentPage * pageSize, totalRecords);
    return (
        <>
            <HStack gap={4} marginBottom={4} marginTop={4}>
                <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handlePageChange(1)}
                    isDisabled={currentPage === 1}
                >
                    First
                </Button>
                <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                >
                    Prev
                </Button>
                <Text mx={2}>
                    Page {currentPage} of {totalPagesCount}
                </Text>
                <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPagesCount}
                >
                    Next
                </Button>
                <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handlePageChange(totalPagesCount)}
                    isDisabled={currentPage === totalPagesCount}
                >
                    Last
                </Button>
            </HStack>

            <Text>
                Showing {startEntry} to {endEntry} of {totalRecords} entries
            </Text>
        </>

    )
}

export default PaginationControls
