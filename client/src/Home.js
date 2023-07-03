import { Stack, Button, Dialog, DialogTitle, DialogContent, Divider, Select, FormControl, MenuItem, InputLabel, DialogActions } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function Home({ state, dispatch }) {
    return (
        <Stack spacing={2} height='100%' padding='15px'>
            <Button onClick={() => { dispatch({ dialog: 'upload' }); }} variant='outlined'>Upload</Button>
            <Divider />
            <Dialog open={state['dialog'] === 'upload'} onClose={() => { dispatch({ dialog: null }); }} fullWidth>
                <DialogTitle>Upload</DialogTitle>
                <Divider />
                <DialogContent>
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel>Institution</InputLabel>
                            <Select label="Institution" value='' onChange={() => { }}>

                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel>Account</InputLabel>
                            <Select label="Account" value='' onChange={() => { }}>

                            </Select>
                        </FormControl>
                    </Stack>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button variant='contained' fullWidth>Upload</Button>
                </DialogActions>
            </Dialog>
            <Stack spacing={2} direction='row'>
                <FormControl fullWidth>
                    <InputLabel>Institution</InputLabel>
                    <Select label="Institution" value='' onChange={() => { }}>

                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Account</InputLabel>
                    <Select label="Account" value='' onChange={() => { }}>

                    </Select>
                </FormControl>
            </Stack>
            <Divider />
            <DataGrid rows={[]} columns={[]} />
        </Stack>
    );
}