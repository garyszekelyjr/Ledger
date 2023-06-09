import { Box, Tabs, Tab } from '@mui/material';

import Columns from './Columns';
import Categories from './Categories';

export default function Transformations({ state, dispatch, hidden }) {
    return (
        <Box sx={{ display: hidden ? 'none' : 'flex', flexDirection: 'column', flex: 1, padding: '15px' }}>
            <Tabs value={state['home']['transformations']['tab']} onChange={(e, tab) => {
                localStorage.setItem('home-transformations-tab', tab);
                dispatch({ home: { ...state['home'], transformations: { ...state['home']['transformations'], tab: tab } } });
            }}>
                <Tab value='columns' label='Columns' />
                <Tab value='categories' label='Categories' />
            </Tabs>
            <Columns state={state} dispatch={dispatch} hidden={state['home']['transformations']['tab'] !== 'columns'} />
            <Categories state={state} dispatch={dispatch} hidden={state['home']['transformations']['tab'] !== 'categories'} />
        </Box>
    );
}