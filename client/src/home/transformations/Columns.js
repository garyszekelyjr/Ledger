import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Divider, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Columns({ state, dispatch, hidden }) {
    return (
        <Box sx={{ display: hidden ? 'none' : 'flex', flexDirection: 'column', flex: 1, padding: '15px' }}>
            <Button onClick={() => {
                dispatch({
                    home: {
                        ...state['home'],
                        transformations: {
                            ...state['home']['transformations'],
                            columns: {
                                ...state['home']['transformations']['columns'],
                                add: {
                                    ...state['home']['transformations']['columns']['add'],
                                    open: true
                                }
                            }
                        }
                    }
                });
            }}>Add</Button>
            <Dialog open={state['home']['transformations']['columns']['add']['open']} onClose={() => {
                dispatch({
                    home: {
                        ...state['home'],
                        transformations: {
                            ...state['home']['transformations'],
                            columns: {
                                ...state['home']['transformations']['columns'],
                                add: {
                                    ...state['home']['transformations']['columns']['add'],
                                    open: false
                                }
                            }
                        }
                    }
                });
            }}>
                <DialogTitle>Add Column Transformation</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <InputLabel>Institution</InputLabel>
                            <Select onChange={(e) => {
                                dispatch({
                                    home: {
                                        ...state['home'],
                                        transformations: {
                                            ...state['home']['transformations'],
                                            columns: {
                                                ...state['home']['transformations']['columns'],
                                                add: {
                                                    ...state['home']['transformations']['columns']['add'],
                                                    institutionID: e.target.value
                                                }
                                            }
                                        }
                                    }
                                });
                            }} value={state['home']['transformations']['columns']['add']['institutionID']} label='Institution' required>{state['institutions'].map((institution) => (
                                <MenuItem value={institution['id']}>{institution['name']}</MenuItem>
                            ))}</Select>
                        </FormControl>
                        <TextField onChange={(e) => {
                            dispatch({
                                home: {
                                    ...state['home'],
                                    transformations: {
                                        ...state['home']['transformations'],
                                        columns: {
                                            ...state['home']['transformations']['columns'],
                                            add: {
                                                ...state['home']['transformations']['columns']['add'],
                                                rawColumn: e.target.value
                                            }
                                        }
                                    }
                                }
                            });
                        }} value={state['home']['transformations']['columns']['add']['rawColumn']} label='Raw Column' required fullWidth />
                        <FormControl>
                            <InputLabel>Clean Column</InputLabel>
                            <Select onChange={(e) => {
                                dispatch({
                                    home: {
                                        ...state['home'],
                                        transformations: {
                                            ...state['home']['transformations'],
                                            columns: {
                                                ...state['home']['transformations']['columns'],
                                                add: {
                                                    ...state['home']['transformations']['columns']['add'],
                                                    cleanColumn: e.target.value
                                                }
                                            }
                                        }
                                    }
                                });
                            }} value={state['home']['transformations']['columns']['add']['cleanColumn']} label='Clean Column' required>
                                <MenuItem value='amount'>Amount</MenuItem>
                                <MenuItem value='date'>Date</MenuItem>
                                <MenuItem value='description'>Description</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={() => {
                        window.eel?.create('columnTransformation', {
                            institutionID: state['home']['transformations']['columns']['add']['institutionID'],
                            rawColumn: state['home']['transformations']['columns']['add']['rawColumn'],
                            cleanColumn: state['home']['transformations']['columns']['add']['cleanColumn']
                        })((columnTransformations) => {
                            dispatch({
                                columnTransformations: columnTransformations,
                                home: {
                                    ...state['home'],
                                    transformations: {
                                        ...state['home']['transformations'],
                                        columns: {
                                            ...state['home']['transformations']['columns'],
                                            add: {
                                                open: false,
                                                institutionID: undefined,
                                                rawColumn: undefined,
                                                cleanColumn: undefined
                                            }
                                        }
                                    }
                                }
                            });
                        });
                    }}>Add</Button>
                </DialogActions>
            </Dialog>
            <DataGrid rows={state['columnTransformations']} columns={[{
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
                headerName: 'Raw Column',
                flex: 1
            },
            {
                field: 'clean',
                headerName: 'Clean Column',
                flex: 1
            },
            {
                field: 'Delete',
                headerName: '',
                sortable: false,
                filterable: false,
                renderCell: (params) => <Button onClick={() => { window.eel?.delete('columnTransformation', params.id)((columnTransformations) => { dispatch({ columnTransformations: columnTransformations }); }); }} fullWidth>Delete</Button>
            }]} autoHeight />
        </Box>
    );
}