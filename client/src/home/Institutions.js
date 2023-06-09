import { useEffect, useReducer } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Institutions({ hidden }) {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        institutions: [],
        add: {
            open: false,
            institutionID: undefined,
            type: undefined,
            accountNumber: undefined
        }
    });

    useEffect(() => {

    }, []);

    return (
        <Box flex={1} hidden={hidden}>
            <Box display='flex' flexDirection='column' padding='15px'>
                <Button onClick={() => { dispatch({ add: { ...state['add'], open: true } }); }}>Add</Button>
                <Dialog open={state['add']['open']} onClose={() => { dispatch({ add: { ...state['add'], open: false } }); }}>
                    <DialogTitle>Add Institution</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TextField onChange={(e) => { dispatch({ add: { ...state['add'], name: e.target.value } }); }} value={state['add']['name']} label='Name' required fullWidth />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={() => {
                            window.eel?.create('institution', { name: state['add']['name'] })((institutions) => {
                                dispatch({
                                    institutions: institutions,
                                    add: { open: false, name: undefined }
                                });
                            });
                        }}>Add</Button>
                    </DialogActions>
                </Dialog>
                <DataGrid rows={state['institutions']} columns={[{
                    field: 'id',
                    headerName: 'ID'
                }, {
                    field: 'name',
                    headerName: 'Name',
                    flex: 1
                },
                {
                    field: 'Delete',
                    headerName: '',
                    sortable: false,
                    filterable: false,
                    renderCell: (params) => <Button onClick={() => { window.eel?.delete('institution', params.id)((institutions) => { dispatch({ institutions: institutions }); }); }} fullWidth>Delete</Button>
                }]} autoHeight />
            </Box>
        </Box>
    );
}