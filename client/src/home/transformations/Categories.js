import { useReducer, useEffect } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export default function Columns({ hidden }) {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        categories: [],
        institutions: [],
        transformations: []
    });

    useEffect(() => {
        window.eel?.read('category')((categories) => { dispatch({ categories: categories }); });
        window.eel?.read('institution')((institutions) => { dispatch({ institutions: institutions }); });
        window.eel?.read('categoryTransformation')((transformations) => { dispatch({ transformations: transformations }); });
    }, []);

    return (
        <Box sx={{ display: hidden ? 'none' : 'flex', flexDirection: 'column', flex: 1, padding: '15px' }}>
            <Button onClick={() => {
                window.eel?.read('category')((categories) => { dispatch({ categories: categories }); });
                window.eel?.read('institution')((institutions) => { dispatch({ institutions: institutions }); });
                dispatch({ add: true });
            }}>Add</Button>
            <Dialog open={state['add']} onClose={() => { dispatch({ add: false }); }}>
                <DialogTitle>Add Category Transformation</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <InputLabel>Institution</InputLabel>
                            <Select onChange={(e) => { dispatch({ institutionID: e.target.value }); }} value={state['institutionID']} label='Institution' required>{state['institutions'].map((institution) => (
                                <MenuItem value={institution['id']}>{institution['name']}</MenuItem>
                            ))}</Select>
                        </FormControl>
                        <TextField onChange={(e) => { dispatch({ rawCategory: e.target.value }) }} value={state['rawCategory']} label='Raw Category' required fullWidth />
                        <FormControl>
                            <InputLabel>Clean Category</InputLabel>
                            <Select onChange={(e) => { dispatch({ cleanCategoryID: e.target.value }); }} value={state['cleanCategoryID']} label='Clean Category' required>{state['categories'].map((category) => (
                                <MenuItem value={category['id']}>{category['name']}</MenuItem>
                            ))}</Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={() => { dispatch({ add: false }); }}>Cancel</Button>
                    <Button onClick={() => {
                        window.eel?.create('categoryTransformation', { institutionID: state['institutionID'], rawCategory: state['rawCategory'], cleanCategoryID: state['cleanCategoryID'] })((transformations) => { dispatch({ transformations: transformations }); });
                        dispatch({ add: false, name: undefined });
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
            <DataGrid rows={state['transformations']} columns={[{
                field: 'id',
                headerName: 'ID'
            }, {
                field: 'institution',
                headerName: 'Institution',
                flex: 1,
                valueGetter: (params) => state['institutions'].find((institution) => institution['id'] === params.row.institution_id)['name']
            },
            {
                field: 'raw',
                headerName: 'Raw Category',
                flex: 1
            },
            {
                field: 'clean',
                headerName: 'Clean Category',
                flex: 1,
                valueGetter: (params) => state['categories'].find((category) => category['id'] === params.row.category_id)['name']
            },
            {
                field: 'Delete',
                headerName: '',
                sortable: false,
                filterable: false,
                renderCell: (params) => <Button onClick={() => { window.eel?.delete('categoryTransformation', params.id)((transformations) => { dispatch({ transformations: transformations }); }); }} fullWidth>Delete</Button>
            }]} autoHeight />
        </Box>
    );
}