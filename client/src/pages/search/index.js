import { useState, useEffect, setState } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import {
    Grid,
    Typography,
    Fab
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const {query} = useParams();
    let d_query = decodeURI(query)
    let low_query = d_query.toLowerCase()
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
            await fetch(
                "http://127.0.0.1:5000/api/issue/get_all"
            )
            ).json();

            // set state when the data received
            setIsLoading(false)
            setData(data);
        };

        dataFetch();
    }, []);

    if(isLoading) return 'loading...';

    let new_data = []
    for (const [key, value] of Object.entries(data.active)) {
        if(value.title.toLowerCase().includes(low_query)) {
            new_data.push(value)
        }else if (value.title.toLowerCase().includes(low_query)) {
            new_data.push(value)
        }
    }
    for (const [key, value] of Object.entries(data.archived)) {
        if(value.title.toLowerCase().includes(low_query)) {
            new_data.push(value)
        }else if (value.title.toLowerCase().includes(low_query)) {
            new_data.push(value)
        }
    }

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* Active Issues */}
            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Search results for term "{d_query}"...</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable data={new_data} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
