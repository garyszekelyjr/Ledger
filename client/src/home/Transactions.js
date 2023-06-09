import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Transactions({ state, dispatch, hidden }) {
    return (
        <Box sx={{ display: hidden ? 'none' : 'flex', flexDirection: 'column', flex: 1, padding: '15px' }}>
            <DataGrid rows={state['transactions']} columns={[{
                field: 'id',
                headerName: 'ID'
            }, {
                field: 'institution',
                headerName: 'Institution Name',
                flex: 1,
                valueGetter: (params) => state['institutions'].find((institution) => institution['id'] === state['accounts'].find((account) => account['id'] === params.row.account_id)?.['institution_id'])?.['name']
            }, {
                field: 'account',
                headerName: 'Account Type',
                flex: 1,
                valueGetter: (params) => state['accounts'].find((account) => account['id'] === params.row.account_id)?.['type']
            }, {
                field: 'category',
                headerName: 'Category Name',
                flex: 1,
                valueGetter: (params) => state['categories'].find((category) => category['id'] === params.row.category_id)?.['name']
            }, {
                field: 'description',
                headerName: 'Description',
                flex: 1
            }, {
                field: 'amount',
                headerName: 'Amount',
                flex: 1
            }, {
                field: 'date',
                headerName: 'Date',
                flex: 1
            }]} autoHeight />
        </Box>
    );
}