import * as React from 'react';
// material-ui
import { Button, TextField, MenuItem, Grid, FormControl, InputLabel, Typography } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// project import
import MainCard from 'components/MainCard';



// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
    const [tag, setTag] = React.useState('Frontend');
    const [title, setTitle] = React.useState('');
    const [desc, setDesc] = React.useState('');
    const [prio, setPrio] = React.useState('Normal');

    const handleTagChange = (event) => {
        setTag(event.target.value);
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };
    const handlePrioChange = (event) => {
        setPrio(event.target.value);
    };

    const createItem = (e) => {
        e.preventDefault();
        
        if(title.trim().length === 0 || desc.trim().length === 0) {
            alert('Check input fields');
        }
    
        fetch("http://127.0.0.1:5000/api/issue/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "title": title, "info": desc, "priority": prio, "tags": [tag] })
        }).then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        alert('Created new issue');
    }

    return (
        <Grid container rowSpacing={4.5} columnSpacing={8.75}>
            <Grid item xs={8} sx={{ mb: -2.25 }}>
                <MainCard title="Create Issue">
                    <Grid container rowSpacing={4.5} columnSpacing={8.75}>
                        <Grid item xs={12} sx={{ mb: -2.25 }}>
                            <TextField fullWidth id="standard-basic" label="Title" variant="standard" margin="normal" onChange={handleTitleChange} value={title} />
                        </Grid>
                        <Grid item xs={12} sx={{ mb: -0 }}>
                        <TextField
                            placeholder="Issue Description"
                            variant="outlined"
                            fullWidth
                            onChange={handleDescChange}
                            value={desc}
                            multiline
                            rows={5}
                        />
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
            
            <Grid item xs={4} sx={{ mb: -2.25 }}>
                <MainCard>

                    <MainCard>
                        <Typography align="left">
                            <b>Tags: </b>
                        </Typography>
                        <Grid container justifyContent="flex-end">
                            <FormControl size="large">
                                <InputLabel id="tag">Tag</InputLabel>
                                <Select
                                    labelId="tag"
                                    id="tag"
                                    value={tag}
                                    onChange={handleTagChange}
                                    label="Tag"
                                    fullWidth
                                >
                                    <MenuItem value={"Frontend"}>Frontend</MenuItem>
                                    <MenuItem value={"Backend"}>Backend</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
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

                </MainCard>
                
            </Grid>

            <Grid container rowSpacing={0.5} columnSpacing={0.75} justifyContent="flex-end">
                <Button variant="contained" size="large" 
                    onClick={createItem}
                >Create
                </Button>

            </Grid>

        </Grid>
    );
}