import { DataGrid } from '@mui/x-data-grid';

export default function Table({ state, dispatch }) {
    return (
        <DataGrid rows={state['transactions']} columns={[
            { field: 'id', headerName: 'ID' },
            { field: 'description', headerName: 'Description', flex: 1 },
            { field: 'amount', headerName: 'Amount' },
            { field: 'date', headerName: 'Date' }
        ]} style={{ flex: 1, minHeight: 0, overflow: 'auto' }} />
    );
}