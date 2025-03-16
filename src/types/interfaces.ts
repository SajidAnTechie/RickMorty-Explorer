import { ColDef } from 'ag-grid-community';

export interface PaginationControlsProps {
    handlePageChange: (page: number) => void;
    currentPage: number;
    totalPagesCount: number;
    totalRecords: number;
    pageSize: number
}

export interface AgGridTableProps {
    data: Record<string, string | number>[];
    columns: ColDef[];
    isLoading: boolean;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}