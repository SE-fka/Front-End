import React, {useEffect, useState} from 'react'
import { Grid, TextField, Button, useTheme, Box, Card } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useNavigate} from "react-router-dom";
import AuthHeader from '../../API/AuthHeader';
import axios from 'axios';
import { TelegramDataTable } from "./SearchDataTable";
import API from '../../API/TelegramApi';

const channel_url = API.getChannelPost();
const group_url = API.getGroupPost();

const TweetSearchResult = () => {
  let naigate = useNavigate ();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', border:'null', backgroundColor: colors.blueAccent[400]}
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '1%', justifyContent: 'center'}
  const imagestyle={height: '20px',width: '20px', opacity: .8}

  const [input, setInput] = useState("");
  const [tgChannelData, setTgChannelData] = useState(null);
  const [tgGroupData, setTgGroupData] = useState(null);


  const query = new URLSearchParams(window.location.search);
  const result = query.get('q')

  useEffect(() => {
    getData();
    // eslint-disable-next-line
}, []);

const getData = () => {
    axios
      .get(channel_url + `channel/search/?q=${result}` , { headers: AuthHeader() })
      .then((res) => {
        const flattenedData = res.data.flatMap((data) => data.data);
        setTgChannelData(flattenedData);
       
      });
    axios
      .get(group_url + `group/search/?q=${result}`, { headers: AuthHeader() })
      .then((res) => {
        const flattenedData = res.data.flatMap((data) => data.data);
        setTgGroupData(flattenedData);
    
      });
  };

  const getPosts = (event) => {
    event.preventDefault();
    axios
      .get(channel_url + `channel/search/?q=${input}` , { headers: AuthHeader() })
      .then((res) => {
        const flattenedData = res.data.flatMap((data) => data.data);
        setTgChannelData(flattenedData);
        naigate(`/telegram/search/result?q=${input}`)
      });
    axios
      .get(group_url + `group/search/?q=${input}`, { headers: AuthHeader() })
      .then((res) => {
        const flattenedData = res.data.flatMap((data) => data.data);
        setTgGroupData(flattenedData);
        naigate(`/telegram/search/result?q=${input}`)
      });
      
      setInput('');
  };


  return (
    <Box m="2%" pt={16}>
    <Grid align='center'>
    <form onSubmit={getPosts}>
    <TextField label="Enter keyword" style = {{width: '40%'}} required
      value={input} onChange={(e) => setInput(e.target.value)}/>
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
    </form>
    </Grid>
    <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-10">  
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/telegram.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Channel Posts</h4>
   </Card>
   {tgChannelData && (
        <>
         <TelegramDataTable data={tgChannelData} />{" "}
        </>
      )}
  </div>
  </div>

 <div className="row" style={divstyle}>
  <div className="col-sm-10">  
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/telegram_group.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Group Posts</h4>
   </Card>
   {tgGroupData && (
        <>
          <TelegramDataTable data={tgGroupData} />{" "}
        </>
      )}
  </div>
  </div>
  <br />
  <br />
 </Box>
  )
}

export default TweetSearchResult;