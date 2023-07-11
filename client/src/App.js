import { useReducer } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppBar, Stack, Toolbar, Button, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';

import Home from './pages/Home';
import Analytics from './pages/Analytics';

import Settings from './components/Settings';

export default function App() {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        mode: localStorage.getItem('mode') || 'dark',
        dialog: null,
        institutions: ['USAA', 'PNC'],
        accounts: ['Account 1', 'Account 2'],
        transactions: [
            { id: 1, description: 'Hello', amount: 1, date: 'Hello' }
        ]
    });

    return (
        <ThemeProvider theme={createTheme({
            palette: {
                primary: { main: '#3fc380' },
                secondary: { main: '#fff' },
                mode: state['mode']
            }
        })}>
            <CssBaseline>
                <AppBar position='static' enableColorOnDark>
                    <Toolbar>
                        <Stack direction='row' spacing={2} flex={1}>
                            <Typography variant='h6' fontWeight='bold'>Ledger</Typography>
                            <Button href='/' color='inherit' variant='outlined' startIcon={<HomeIcon />}>Home</Button>
                            <Button href='/#/analytics' color='inherit' variant='outlined' startIcon={<AnalyticsIcon />}>Analytics</Button>
                        </Stack>
                        <Settings state={state} dispatch={dispatch} />
                    </Toolbar>
                </AppBar>
                <HashRouter>
                    <Routes>
                        <Route index element={<Home state={state} dispatch={dispatch} />} />
                        <Route path='analytics' element={<Analytics state={state} dispatch={dispatch} />} />
                    </Routes>
                </HashRouter>
            </CssBaseline>
        </ThemeProvider>
    );
}
