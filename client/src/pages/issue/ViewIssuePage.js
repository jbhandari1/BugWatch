// material-ui
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Grid, ToggleButtonGroup, ToggleButton, Typography, FormControl, MenuItem, InputLabel, Select } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

import { useParams } from 'react-router-dom';


function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' @ ' + hour + ':' + min + ':' + sec ;
    return time;
}

function priorityToString(priority){
    console.log(priority)
    if(priority === 3) return <Button variant="outlined" align="right" color="secondary">Normal</Button>
    if(priority === 2) return <Button variant="outlined" align="right" color="warning">Moderate</Button>
    if(priority === 1) return <Button variant="outlined" align="right" color="error">Severe</Button>
}

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
    const {id} = useParams();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
            await fetch(
                "http://127.0.0.1:5000/api/issue/get_ind/" + id
            )
            ).json();
            
            // set state when the data received
            console.log(data)
            setIsLoading(false)
            setData(data);
            console.log(data.archived)
            if(data.archived === true){
                setActive('Archived')
            }
            if(data.priority === 3) {
                setPrio("Normal")
            }else if(data.priority === 2) {
                setPrio("Moderate")
            }else if(data.priority === 1) {
                setPrio("Severe")
            }
        };

        dataFetch();
    }, [id]);

    function sendPost(property, newval) {
        fetch("http://127.0.0.1:5000/api/issue/edit", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "issue_id": id,
                "prop": property,
                "new_val": newval
            })
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    const [active, setActive] = React.useState('Active');
    const handleChange = (event, newActive) => {
        setActive(newActive);
        let newval = "False"
        if(newActive === "Archived"){
            newval = "True"
        }
        sendPost("archive", newval)
    };

    const [prio, setPrio] = React.useState('Normal');
    const handlePrioChange = (event) => {
        setPrio(event.target.value);
        if(event.target.value === "Normal"){
            sendPost("priority", 3)
        }else if(event.target.value === "Moderate"){
            sendPost("priority", 2)
        }else if(event.target.value === "Severe"){
            sendPost("priority", 1)
        }
    };

    if(isLoading) return 'loading...';
    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={8} sx={{ mb: -2.25 }}>
                <MainCard title={data.title}>
                    <Typography variant="body1">
                        {data.info}
                    </Typography>
                </MainCard>
            </Grid>
            
            <Grid item xs={4} sx={{ mb: -2.25 }}>
                <MainCard>

                    <MainCard>
                        <Typography align="left">
                            <b>Created At: </b>
                        </Typography>
                        <Typography align="right">
                            {timeConverter(data.timestamp)}
                        </Typography>
                    </MainCard>    
                    <br></br>
                    <MainCard>
                        <Typography align="left">
                            <b>Priority: </b>
                        </Typography>
                        <Grid container justifyContent="flex-end">
                            <FormControl size="large">
                                <InputLabel id="priority">Priority</InputLabel>
                                <Select
                                    labelId="priority"
                                    id="priority"
                                    value={prio}
                                    onChange={handlePrioChange}
                                    label="Priority"
                                    fullWidth
                                >
                                    <MenuItem value={"Normal"}>Normal</MenuItem>
                                    <MenuItem value={"Moderate"}>Moderate</MenuItem>
                                    <MenuItem value={"Severe"}>Severe</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </MainCard>    
                    <br></br>
                    <MainCard>
                        <Typography align="left">
                            <b>Tags: </b>
                        </Typography>
                        <Grid container justifyContent="flex-end">
                            {data.tags.map((name, index) => (
                                <Grid item xs={2.5} sx={{ mb: 0.25 }} align="right">
                                    <Button variant="outlined">{name}</Button>
                                </Grid>
                            ))}
                        </Grid>
                    </MainCard>    
                    <br></br>
                    <MainCard>
                        <Typography align="left">
                            <b>Archived: </b>
                        </Typography>
                        <div align="right">
                            <ToggleButtonGroup
                                color="primary"
                                value={active}
                                orientation="vertical"
                                onChange={handleChange}
                                aria-label="Archived"
                                exclusive
                            >
                            <ToggleButton value="Active">Active</ToggleButton>
                            <ToggleButton value="Archived">Archived</ToggleButton>
                            </ToggleButtonGroup>
                            
                        </div>
                        
                    </MainCard>  
                    <br></br>
                    <MainCard>
                        <Typography align="left">
                            <b>ID: </b>
                        </Typography>
                        <Typography align="right">
                            {data.id+1000}
                        </Typography>
                    </MainCard>      
                </MainCard>
            </Grid>

        </Grid>
    );
}