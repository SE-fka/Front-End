import React from 'react'
import { Grid, TextField, Button, useTheme, Box, Card } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { tokens } from "../../styles/theme";
import { useNavigate, Link} from "react-router-dom";
import FacebookProfile from "./FacebookProfile";
import FocebookPage from "./FocebookPage";
import { useState } from 'react';

const Facebook = () => {
  let naigate = useNavigate ();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', backgroundColor: colors.blueAccent[400]}

  const [query, setQuery] = useState('');

  function handleInputChange(event) {
    setQuery(event.target.value);
  }
  function Change() {
    naigate(`/facebook/search/result?q=${query}`)
  }

  return (
    <Box m="2%" pt={16}>
    <Grid align='center'>
    <form onSubmit={Change}> 
    <TextField  label="Enter keyword" style = {{width: '40%'}}
    value={query} onChange={handleInputChange} required/>
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
    </form>
    </Grid>
    <br />
    <Grid align='right'>
    <Card> <h6><Link to="/facebookpost" style={{ textDecoration: 'none' }}> <b> All Facebook Posts &nbsp;&nbsp;<ArrowCircleRightIcon /> </b> </Link>
    &nbsp;&nbsp;&nbsp;
      <Link to="/fblinkrequest" style={{ textDecoration: 'none' }}> <b> Facebook Target Request &nbsp;&nbsp;<ArrowCircleRightIcon /> </b>
      </Link>
      </h6>
      </Card>
    </Grid>
 
    <FacebookProfile />
    <FocebookPage />  
     
    <br />
    </Box>
    )
}

export default Facebook