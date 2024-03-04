import { useState, useEffect, setState } from 'react';
import { useNavigate } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";

// material-ui
import {
    Button,
    Grid,
    Typography,
    Fab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
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

    const fabStyle = {
        bottom: 50,
        right: 50,
        position: 'fixed'
    };

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/dashboard/create`; 
        navigate(path);
    }

    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');

    if(isLoading) return 'loading...';

    let sev = 0
    data.active.forEach(function (value, i) {
        if(value.priority === 1) {
            sev++
        }
    });
    const dict = {
        1: "Severe",
        2: "Moderate",
        3: "Normal"
    }

    let csvDataNew = []
    csvDataNew.push(["Issue ID", "Title", "Description", "Timestamp", "Priority", "Tags", "Visibility"])
    data.active.forEach(function (value, i) {
        csvDataNew.push([value.id+1000, value.title, value.info, value.timestamp, dict[value.priority], value.tags, "Active"])
    });
    data.archived.forEach(function (value, i) {
        csvDataNew.push([value.id+1000, value.title, value.info, value.timestamp, dict[value.priority], value.tags, "Archived"])
    });
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* Top Bar */}
            
            
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Grid container>
                    <Typography variant="h5">Dashboard</Typography>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Button variant="contained">
                        <CSVLink
                        data={csvDataNew}
                        filename={"BugWatch-Report.csv"}
                        >
                            Download Report
                        </CSVLink>
                    </Button>
                </Grid>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <AnalyticEcommerce title="Active Issues" count={data.active.length} percentage={59.3} extra="Currently active issues" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <AnalyticEcommerce title="Archived Issues" count={data.archived.length} percentage={70.5} extra="Archived or deleted issues" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <AnalyticEcommerce title="Severe Issues" count={sev} percentage={27.4} isLoss color="warning" extra="Active issues of severe level" />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* Active Issues */}
            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Active Issues</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable data={data.active} />
                </MainCard>
            </Grid>

            {/* Inactive Issues */}
            <Grid item xs={12} md={7} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Archived Issues</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable data={data.archived} />
                </MainCard>
            </Grid>
            
        
            <Fab color="primary" aria-label="add" style={fabStyle} onClick={routeChange}>
                <AddIcon />
            </Fab>
        </Grid>
    );
};

export default DashboardDefault;
