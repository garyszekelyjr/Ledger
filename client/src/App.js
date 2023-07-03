import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppBar, Stack, Toolbar, Button, Typography, Dialog, DialogActions, DialogTitle, Divider, DialogContent, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import { useReducer } from 'react';

import Home from './Home';

export default function App() {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        dialog: null
    });

    return (
        <ThemeProvider theme={createTheme({
            palette: {
                primary: { main: '#3fc380' },
                secondary: { main: '#fff' },
                mode: localStorage.getItem('mode') || 'dark'
            }
        })}>
            <CssBaseline>
                <AppBar position='static' enableColorOnDark>
                    <Toolbar>
                        <Stack direction='row' spacing={2} flex={1}>
                            <Typography variant='h6' fontWeight='bold'>Ledger</Typography>
                            <Button href='/' color='inherit' variant='outlined' startIcon={<HomeIcon />}>Home</Button>
                            <Button href='/analytics' color='inherit' variant='outlined' startIcon={<AnalyticsIcon />}>Analytics</Button>
                        </Stack>
                        <Button onClick={() => { dispatch({ dialog: 'settings' }); }} color='inherit' variant='outlined' startIcon={<SettingsIcon />}>Settings</Button>
                        <Dialog open={state['dialog'] === 'settings'} onClose={() => { dispatch({ dialog: null }); }} fullWidth>
                            <DialogTitle>Settings</DialogTitle>
                            <Divider />
                            <DialogContent>
                                <TextField label='Ledger Link' fullWidth />
                            </DialogContent>
                        </Dialog>
                    </Toolbar>
                </AppBar>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home state={state} dispatch={dispatch} />} />
                    </Routes>
                </BrowserRouter>
            </CssBaseline>
        </ThemeProvider>
    );
}
