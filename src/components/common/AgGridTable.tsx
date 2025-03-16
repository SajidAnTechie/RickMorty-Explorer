import { AgGridReact } from 'ag-grid-react';
import { AgGridTableProps } from '../../types/interfaces';

const NoRowsOverlay = () => {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            No data found
        </div>
    );
};

const AgGridTable = ({ data, columns, isLoading }: AgGridTableProps) => {
    return (
        <AgGridReact
            rowData={data}
            columnDefs={columns}
            animateRows={true}
            enableCellTextSelection={true}
            loading={isLoading}
            noRowsOverlayComponent={NoRowsOverlay}
        />
    );
}


export default AgGridTable;