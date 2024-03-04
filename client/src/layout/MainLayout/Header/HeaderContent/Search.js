// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { navigate } from "@reach/router"


// ==============================|| HEADER CONTENT - SEARCH ||============================== //

function sendSearch(searchQuery) {
    console.log("SEARCHING!")
    searchQuery = encodeURI(searchQuery)
    navigate(`/search/${searchQuery}`);
}

const Search = () => (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
        <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
            <OutlinedInput
                size="small"
                id="header-search"
                startAdornment={
                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                        <SearchOutlined />
                    </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                    'aria-label': 'weight'
                }}
                placeholder="Search Issues.."
                onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                        sendSearch(ev.target.value)
                      ev.preventDefault();
                    }
                  }}
            />
        </FormControl>
    </Box>
);

export default Search;
