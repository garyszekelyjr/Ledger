import { useState } from 'react';
import { Stack, Select, FormControl, MenuItem, InputLabel } from '@mui/material';

export default function Controls({ state, dispatch }) {
    const [institution, setInstitution] = useState();
    const [account, setAccount] = useState();

    return (
        <form>
            <Stack spacing={2} direction='row'>
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
            </Stack>
        </form>
    );
}