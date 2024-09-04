import React, {useEffect, useState} from 'react'
import { Grid, TextField, Button, useTheme, Box, Card } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useNavigate} from "react-router-dom";
import AuthHeader from '../../API/AuthHeader';
import axios from 'axios';
import { FacebookDataTable } from "./SearchDataTable"; 
import { FacebookPageDataTable } from "./SearchPageDataTable";
import API from '../../API/FacebookApi';

const url = API.getPosts();


const SearchResult = () => {
  let navigate = useNavigate ();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', border:'null', backgroundColor: colors.blueAccent[400]}
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '1%', justifyContent: 'center'}
  const imagestyle={height: '20px',width: '20px', opacity: .8}

  const [input, setInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [pageData, setPageData] = useState(null);
  const query = new URLSearchParams(window.location.search);
  const result = query.get('q')

  useEffect(() => {
    getSearchData();
    // eslint-disable-next-line
}, []);

const getSearchData = () => {
  const user='user';
  const page='page';
  axios.get(url + `search/?q=${result}&from=${user}`, { headers: AuthHeader() })
    .then((res) => {
      const flattenedData = res.data.flatMap((item) => item);
      setUserData(flattenedData);
    });
    axios.get(url + `search/?q=${result}&from=${page}`, { headers: AuthHeader() })
    .then((res) => {
      const flattenedData = res.data.flatMap((item) => item);
      setPageData(flattenedData);
    });
};

const getUserPost = (event) => {
  event.preventDefault();
  const user='user';
  const page='page';
  axios.get(url + `search/?q=${input}&from=${user}`, { headers: AuthHeader() })
    .then((res) => {
      const flattenedData = res.data.flatMap((item) => item);
      setUserData(flattenedData);
      navigate(`/facebook/search/result?q=${input}`)
    });

    axios.get(url + `search/?q=${input}&from=${page}`, { headers: AuthHeader() })
    .then((res) => {
      const flattenedData = res.data.flatMap((item) => item);
      setPageData(flattenedData);
      navigate(`/facebook/search/result?q=${input}`)
    });
    
  setInput('');
};

  return (
    <Box m="2%" pt={16}>
    <Grid align='center'>
    <form onSubmit={getUserPost}>
    <TextField label="Enter keyword" style = {{width: '40%'}} required
      value={input} onChange={(e) => setInput(e.target.value)}/>
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
    </form>
    </Grid>
    <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-10">  
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/facebook.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> User Account Posts</h4>
   </Card>
   {userData && (
        <>
         <FacebookDataTable data={userData} />{" "}
        </>
      )}
  </div>
  </div>

  <div className="row" style={divstyle}>
    <div className="col-sm-10">  
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/facebook_group.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Page Posts</h4>
   </Card>
   {pageData && (
        <>
         <FacebookPageDataTable data={pageData} />{" "}
        </>
      )}
  </div>
  </div>
  <br />
  <br />
  </Box>
  )
}

export default SearchResult;