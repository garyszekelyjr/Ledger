import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Categories({ state, dispatch, hidden }) {
    return (
        <Box sx={{ display: hidden ? 'none' : 'flex', flexDirection: 'column', flex: 1, padding: '15px' }}>
            <Button onClick={() => {
                dispatch({
                    home: {
                        ...state['home'],
                        categories: {
                            ...state['home']['categories'],
                            add: {
                                ...state['home']['categories']['add'],
                                open: true
                            }
                        }
                    }
                });
            }}>Add</Button>
            <Dialog open={state['home']['categories']['add']['open']} onClose={() => {
                dispatch({
                    home: {
                        ...state['home'],
                        categories: {
                            ...state['home']['categories'],
                            add: {
                                ...state['home']['categories']['add'],
                                open: false,
                            }
                        }
                    }
                });
            }}>
                <DialogTitle>Add Category</DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField onChange={(e) => {
                        dispatch({
                            home: {
                                ...state['home'], categories: {
                                    ...state['home']['categories'],
                                    add: {
                                        ...state['home']['categories']['add'],
                                        name: e.target.value
                                    }
                                }
                            }
                        });
                    }} value={state['home']['categories']['add']['name']} label='Name' required fullWidth />
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={() => {
                        window.eel?.create('category', { name: state['home']['categories']['add']['name'] })((categories) => {
                            dispatch({
                                categories: categories, home: {
                                    ...state['home'],
                                    categories: {
                                        ...state['home']['categories'],
                                        add: {
                                            open: false,
                                            name: undefined
                                        }
                                    }
                                }
                            });
                        });
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
            <DataGrid rows={state['categories']} columns={[{
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
                renderCell: (params) => <Button onClick={() => { window.eel?.delete('category', params.id)((categories) => { dispatch({ categories: categories }); }); }} fullWidth>Delete</Button>
            }]} autoHeight />
        </Box>
    );
}