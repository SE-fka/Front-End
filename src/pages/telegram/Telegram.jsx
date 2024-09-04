import React, {useState} from 'react'
import { Grid, TextField, Button, useTheme, Box, Card } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { tokens } from "../../styles/theme";
import { useNavigate, Link} from "react-router-dom";
import TelegramChannel from "./TelegramChannel";
import TelegramGroup from "./TelegramGroup";

const Telegram = () => {
  let naigate = useNavigate ();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', border:'null', backgroundColor: colors.blueAccent[400]}


  const [query, setQuery] = useState('');
  
  function handleInputChange(event) {
    setQuery(event.target.value);
  }
  function Change() {
    naigate(`/telegram/search/result?q=${query}`)
  }


 return (
    <Box m="2%" pt={16}>
     <Grid align='center'>
     <form onSubmit={Change}>
    <TextField label="Enter keyword" style = {{width: '40%'}} required
    value={query} onChange={handleInputChange}/>
     <Button type='submit' variant="primary" style={btnstyle}> Search</Button>
   </form>
    </Grid>
    <br />
    <Grid align='right'>
    <Card>
      <Link to="/tglinkrequest" style={{ textDecoration: 'none' }}> <h6><b> Telegram Target Request &nbsp;&nbsp;<ArrowCircleRightIcon /> </b></h6>
      </Link>
      </Card>
    </Grid>
       
    <TelegramChannel />
    <TelegramGroup />
    
    <br />
    </Box>
    )
}

export default Telegram