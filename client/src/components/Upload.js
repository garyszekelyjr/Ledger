import { useState } from 'react';
import { Stack, Button, Dialog, DialogTitle, DialogContent, Divider, Select, FormControl, MenuItem, InputLabel, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Upload({ state, dispatch }) {
    const [institution, setInstitution] = useState();
    const [account, setAccount] = useState();

    return (
        <>
            <Button onClick={() => { dispatch({ dialog: 'upload' }); }} variant='outlined'>Upload</Button>
            <Dialog open={state['dialog'] === 'upload'} onClose={() => { dispatch({ dialog: null }); }} fullWidth>
                <DialogTitle display='flex' justifyContent='space-between'>
                    Upload
                    <IconButton onClick={() => { dispatch({ dialog: null }); }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <form>
                    <DialogContent>
                        <Stack spacing={2}>
                            <FormControl fullWidth>
                                <InputLabel>Institution</InputLabel>
                                <Select label='Institution' value={institution} onChange={(e) => { setInstitution(e.target.value); }}>
                                    {state['institutions'].map((institution) => <MenuItem value={institution}>{institution}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Account</InputLabel>
                                <Select label='Account' value={account} onChange={(e) => { setAccount(e.target.value); }}>
                                    {state['accounts'].map((account) => <MenuItem value={account}>{account}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" component="label">
                                Choose File...
                                <input type="file" hidden />
                            </Button>
                        </Stack>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button variant='contained' fullWidth>Upload</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}