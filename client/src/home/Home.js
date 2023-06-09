import { useReducer } from 'react';
import { Tabs, Tab } from '@mui/material';

import Transactions from './Transactions';
import Categories from './Categories';
import Institutions from './Institutions';
import Accounts from './Accounts';
import Transformations from './transformations/Transformations';

export default function Home() {
    const [state, dispatch] = useReducer((state, updates) => {
        state = { ...state };
        Object.keys(updates).forEach((key) => { state[key] = updates[key]; });
        return state;
    }, {
        tab: localStorage.getItem('home-tab') || 'transactions',
        transactions: [],
        categories: [],
        institutions: [],
        accounts: [],
        columnTransformations: [],
        categoryTransformations: [],
        upload: {
            open: false,
            accountID: undefined
        },
        home: {
            transactions: {},
            categories: {
                add: {
                    open: false,
                    name: undefined
                }
            },
            transformations: {
                tab: localStorage.getItem('home-transformations-tab') || 'columns',
                columns: {
                    add: {
                        open: false,
                        institutionID: undefined,
                        rawColumn: undefined,
                        cleanColumn: undefined
                    }
                },
                categories: {
                    add: {
                        open: false,
                        institutionID: undefined,
                        rawCategory: undefined,
                        cleanCategoryID: undefined
                    }
                }
            }
        },
        analytics: {}
    });

    return (
        <>
            <Tabs value={state['tab']} onChange={(e, tab) => {
                localStorage.setItem('home-tab', tab);
                dispatch({ tab: tab });
            }}>
                <Tab value='transactions' label='Transactions' />
                <Tab value='categories' label='Categories' />
                <Tab value='institutions' label='Institutions' />
                <Tab value='accounts' label='Accounts' />
                <Tab value='transformations' label='Transformations' />
            </Tabs>
            <Transactions hidden={state['tab'] !== 'transactions'} />
            <Categories hidden={state['tab'] !== 'categories'} />
            <Institutions hidden={state['tab'] !== 'institutions'} />
            <Accounts hidden={state['tab'] !== 'accounts'} />
            <Transformations hidden={state['tab'] !== 'transformations'} />
        </>
    );
}