import { useEffect, useReducer } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Accounts({ hidden }) {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        institutions: [],
        accounts: [],
        add: {
            open: false,
            name: undefined
        }
    });

    return (
        <Box flex={1} hidden={hidden}>
            <Box display='flex' flexDirection='column' padding='15px'>
                <Button onClick={() => { dispatch({ add: { ...state['add'], open: true } }); }}>Add</Button>
                <Dialog open={state['add']['open']} onClose={() => { dispatch({ add: { ...state['add'], open: false } }); }}>
                    <DialogTitle>Add Account</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <Stack spacing={2}>
                            <FormControl>
                                <InputLabel>Institution</InputLabel>
                                <Select onChange={(e) => { dispatch({ add: { ...state['add'], institutionID: e.target.value } }); }} value={state['add']['institutionID']} label='Institution' required>{state['institutions'].map((institution) => (
                                    <MenuItem value={institution['id']}>{institution['name']}</MenuItem>
                                ))}</Select>
                            </FormControl>
                            <TextField onChange={(e) => { dispatch({ add: { ...state['add'], type: e.target.value } }); }} value={state['type']} label='Type' required fullWidth />
                            <TextField onChange={(e) => { dispatch({ add: { ...state['add'], accountNumber: e.target.value } }); }} value={state['add']['accountNumber']} label='Account #' required fullWidth />
                        </Stack>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={() => {
                            window.eel?.create('account', {
                                institutionID: state['add']['institutionID'],
                                type: state['add']['type'],
                                accountNumber: state['add']['accountNumber']
                            })((accounts) => {
                                dispatch({
                                    accounts: accounts,
                                    add: {
                                        open: false,
                                        institutionID: undefined,
                                        type: undefined,
                                        accountNumber: undefined
                                    }
                                });
                            });
                        }}>Add</Button>
                    </DialogActions>
                </Dialog>
                <DataGrid rows={state['accounts']} columns={[{
                    field: 'id',
                    headerName: 'ID'
                }, {
                    field: 'institution',
                    headerName: 'Institution',
                    flex: 1,
                    valueGetter: (params) => state['institutions'].find((institution) => institution['id'] === params.row.institution_id)['name']

                }, {
                    field: 'type',
                    headerName: 'Type',
                    flex: 1
                },
                {
                    field: 'account_number',
                    headerName: 'Account #',
                    flex: 1
                },
                {
                    field: 'Delete',
                    headerName: '',
                    sortable: false,
                    filterable: false,
                    renderCell: (params) => <Button onClick={() => { window.eel?.delete('account', params.id)((accounts) => { dispatch({ accounts: accounts }); }); }} fullWidth>Delete</Button>
                }]} autoHeight />
            </Box>
        </Box>
    );
}