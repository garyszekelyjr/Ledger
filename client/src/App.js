import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppBar, Stack, Toolbar, Button, Typography, Dialog, DialogActions, DialogTitle, Divider, DialogContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home';
import UploadIcon from '@mui/icons-material/Upload';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useReducer, useEffect } from 'react';

import Home from './home/Home';

export default function App() {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        institutions: [],
        accounts: [],
        upload: {
            open: false,
            accountID: undefined
        },
    });

    const theme = createTheme({
        palette: {
            primary: { main: '#3fc380' },
            secondary: { main: '#fff' },
            mode: localStorage.getItem('mode') || 'dark'
        }
    });

    useEffect(() => {
        window.eel?.read('institution')((institutions) => { dispatch({ institutions: institutions }); });
        window.eel?.read('account')((accounts) => { dispatch({ accounts: accounts }); });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <AppBar position='static' enableColorOnDark>
                    <Toolbar>
                        <Stack direction='row' spacing={2} flex={1}>
                            <Typography variant='h6' fontWeight='bold'>Ledger</Typography>
                            <Button href='/' color='inherit' variant='outlined' startIcon={<HomeIcon />}>Home</Button>
                            <Button href='/analytics' color='inherit' variant='outlined' startIcon={<AnalyticsIcon />}>Analytics</Button>
                        </Stack>
                        <Button onClick={() => { dispatch({ upload: { ...state['upload'], open: true } }); }} color='secondary' variant='contained' startIcon={<UploadIcon />}>Upload</Button>
                        <Dialog open={state['upload']['open']} onClose={() => { dispatch({ upload: { ...state['upload'], open: false } }); }}>
                            <DialogTitle>Upload</DialogTitle>
                            <Divider />
                            <DialogContent>
                                <Stack spacing={2}>
                                    <FormControl>
                                        <InputLabel>Account</InputLabel>
                                        <Select onChange={(e) => { dispatch({ upload: { ...state['upload'], accountID: e.target.value } }); }} value={state['upload']['accountID']} label='Account' required>
                                            {state['accounts'].map((account) => (
                                                <MenuItem value={account['id']}>{state['institutions'].find((institution) => institution['id'] === account['institution_id'])?.['name']}, {account['type']}, {account['account_number']}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </DialogContent>
                            <Divider />
                            <DialogActions>
                                <Button component='label'>
                                    Upload
                                    <input onChange={(e) => {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            window.eel?.upload(state['upload']['accountID'], Array.from(new Uint8Array(reader.result)))((transactions) => {
                                                dispatch({
                                                    transactions: transactions,
                                                    upload: {
                                                        open: false,
                                                        accountID: undefined
                                                    }
                                                });
                                            });
                                        };
                                        reader.readAsArrayBuffer(e.target.files[0]);
                                    }} hidden type='file' />
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Toolbar>
                </AppBar>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>
    );
}
