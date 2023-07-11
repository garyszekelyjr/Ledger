import { Stack, Button, Dialog, DialogTitle, Divider, DialogContent, TextField, IconButton, FormControlLabel, Switch } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

export default function Settings({ state, dispatch }) {
    return (
        <>
            <Button onClick={() => { dispatch({ dialog: 'settings' }); }} color='inherit' variant='outlined' startIcon={<SettingsIcon />}>Settings</Button>
            <Dialog open={state['dialog'] === 'settings'} onClose={() => { dispatch({ dialog: null }); }} fullWidth>
                <DialogTitle display='flex' justifyContent='space-between'>
                    Settings
                    <IconButton onClick={() => { dispatch({ dialog: null }); }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField label='Ledger Link' fullWidth />
                        <Divider />
                        <FormControlLabel label='Dark Mode' labelPlacement='start' control={<Switch checked={state['mode'] === 'dark'} onChange={(e) => {
                            localStorage.setItem('mode', e.target.checked ? 'dark' : 'light');
                            dispatch({ mode: e.target.checked ? 'dark' : 'light' });
                        }} />} />
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}