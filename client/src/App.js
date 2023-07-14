import { useEffect, useReducer } from 'react';
import { AppBar, Stack, Toolbar, Typography, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Upload from './components/Upload';
import Controls from './components/Controls';
import Table from './components/Table';

export default function App() {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        mode: localStorage.getItem('mode') || 'dark',
        dialog: null,
        institutions: [],
        accounts: [],
        transactions: []
    });

    useEffect(() => {
        
    }, []);

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
                        </Stack>
                        <Upload state={state} dispatch={dispatch} />
                    </Toolbar>
                </AppBar>
                <Stack spacing={2} display='flex' flex={1} minHeight={0} padding='15px'>
                    <Controls state={state} dispatch={dispatch} />
                    <Divider />
                    <Table state={state} dispatch={dispatch} />
                </Stack>
            </CssBaseline>
        </ThemeProvider>
    );
}
