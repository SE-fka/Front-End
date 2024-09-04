import React, {useEffect, useState} from 'react'
import { Grid, TextField, Button, useTheme, Box, Card } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useNavigate} from "react-router-dom";
import AuthHeader from '../../API/AuthHeader';
import axios from 'axios';
import { TwitterDataTable } from "./SearchDataTable";
import API from '../../API/TwitterApi';

const url = API.getTweets();


const SearchResult = () => {
  let navigate = useNavigate ();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', border:'null', backgroundColor: colors.blueAccent[400]}
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '1%', justifyContent: 'center'}
  const imagestyle={height: '20px',width: '20px', opacity: .8}

  const [input, setInput] = useState("");
  const [twitterData, setTwitterData] = useState(null);

  const query = new URLSearchParams(window.location.search);
  const result = query.get('q')

  useEffect(() => {
    getData();
    // eslint-disable-next-line
}, []);

const getData = () => {
  axios.get(url + `search/?q=${result}`, { headers: AuthHeader() })
    .then((res) => {
      const flattenedData = res.data.flatMap((item) => item.tweets);
      setTwitterData(flattenedData);
    });
};



const getTweets = (event) => {
  event.preventDefault();
  axios.get(url + `search/?q=${input}`, { headers: AuthHeader() })
    .then((res) => {
      const flattenedData = res.data.flatMap((item) => item.tweets);
      setTwitterData(flattenedData);
      navigate(`/twitter/search/result?q=${input}`)
    });
    
  setInput('');
};

  return (
    <Box m="2%" pt={16}>
    <Grid align='center'>
    <form onSubmit={getTweets}>
    <TextField label="Enter keyword" style = {{width: '40%'}} required
      value={input} onChange={(e) => setInput(e.target.value)}/>
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
    </form>
    </Grid>
    <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-10">  
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/twitter.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Twitter Tweets</h4>
   </Card>
    {twitterData ? <TwitterDataTable data={twitterData}  /> : <></>}
  </div>
  </div>
  <br />
  <br />
  </Box>
  )
}

export default SearchResult;