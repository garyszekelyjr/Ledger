import { useState } from 'react';
import { Stack, Divider, Select, FormControl, MenuItem, InputLabel, Paper, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import Upload from '../components/Upload';

export default function Home({ state, dispatch }) {
    const [institution, setInstitution] = useState();
    const [account, setAccount] = useState();

    return (
        <Stack spacing={2} display='flex' flex={1} minHeight={0} padding='15px'>
            <Upload state={state} dispatch={dispatch} />
            <Divider />
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
            <Divider />
            <DataGrid rows={state['transactions']} columns={[
                { field: 'id', headerName: 'ID' },
                { field: 'description', headerName: 'Description', flex: 1 },
                { field: 'amount', headerName: 'Amount' },
                { field: 'date', headerName: 'Date' }
            ]} style={{ flex: 1, minHeight: 0, overflow: 'auto' }} />
        </Stack>
    );
}