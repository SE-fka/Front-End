import React, { useState } from "react";
import { Grid, TextField, Button, useTheme, Box, MenuItem, Select } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import AuthService from '../../API/AuthApi';
import { Card , Typography} from "@mui/material";
import axios from "axios";
import AuthHeader from "../../API/AuthHeader";
import LoadingSpinner from "../../common/LoadingSpinner";
import FBAPI from '../../API/FacebookApi';
import TWAPI from '../../API/TwitterApi';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
//import CommentIcon from '@mui/icons-material/Comment';
import ReplyIcon from '@mui/icons-material/Reply';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import VisibilityIcon from '@mui/icons-material/Visibility';

const fburl = FBAPI.getCommenURL();
const twurl = TWAPI.getTweets();

const KeywordSearch = () => {
  const user = JSON.parse(localStorage.getItem('token'));
  let navigate = useNavigate ();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', backgroundColor: colors.blueAccent[400]}
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '2%'}
  const profilestyle={height: '40px',width: '40px', borderRadius: '50%' ,opacity: .8} 

  const [input, setInput] = useState("");
  const [value, setValue] = useState('');
  const [facebookData, setFacebookData] = useState([]); 
  const [twitterData, setTwitterData] = useState([]); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


const handleChange = (event) => {
    setValue(event.target.value);
    };


const getData = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append('x-access-token', user.accessToken);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    if(value==='facebook') {
      try {
        setIsLoading(true);
        fetch(fburl + `common/keyword/facebook-live-search?keyword=${input}`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setFacebookData(data);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setError("No data found.");
          }
         })
       } 
      catch (error) {
        if (error.message === 401) {
          handleLogout();
          }
        setIsLoading(false);
        setError(error.message);
      }

    }  
      
    if (value==='twitter') {
      try {
      const type = 'keyword';
      setIsLoading(true);
      const response = await axios.get(twurl + `live-search?type=${type}&keyword=${input}`, {
        headers: AuthHeader()
      });
      const result = response.data;
      if (result && result.length > 0) {
        setTwitterData(result);
        setIsLoading(false); 
      } else {
        setIsLoading(false);
        setError("No data found.");
      }
    } 
    catch (error) {
      if (error.message === 401) {
        handleLogout();
        }
      setIsLoading(false);
      setError(error.message);
    }
  }
}

const handleLogout = () => {
  AuthService.logout();
  navigate('/')
};


  return (
    <Box m="3%" pt={15}>
    <Grid align='center'>
    <br />
    <p style={{color:colors.greenAccent[400]}}> <b> Keyword Live Search  </b></p>
       <form onSubmit={getData}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
              required>
              <MenuItem value={"facebook"}>Facebook</MenuItem>
              <MenuItem value={"twitter"}>Twitter</MenuItem>
            </Select>
    <TextField  label="Enter keyword" style = {{width: '40%'}} value={input} onChange={(e) => setInput(e.target.value)}  required/>
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
    </form>
    </Grid>
    
    <div className="container-fluid">
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 

    {value==='facebook' ? (
    facebookData.map((data) => (
    <Card style={cardstyle}>
    <Box m="1%">
    <img alt="" src={data.p_image} style={profilestyle} /> 
    </Box>
      <Box m="1%">
      { data.title }
    </Box>
    <Box m="1%">
   <Typography>
   <p> {new Date(data.timestamp).toDateString()} </p>
   <p>{data.p_data}</p>
   <a href={data.p_url}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    Click Here View More
    </a>
  
  <p style={{textAlign:'center'}}> <ThumbUpAltIcon /> &nbsp;&nbsp; {data.like} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <ShareIcon />&nbsp;&nbsp;{data.numberOfShares} </p>
  </Typography>
  </Box>
  </Card>
    ))
    ) : (
      <>
      </>
      )}

  {value==='twitter' ? (  
    twitterData.map((data) => (
     <>
    {data.tweets.map(tweet => (
    <Card style={cardstyle}>
      
     <Box m="1%">
      <img alt="pr" src={'../../image/twitter.png'} style={profilestyle} /> 
    </Box>
     <Box m="1%">
    <Typography>
    {tweet.name}
   <p>{tweet.username}</p>
   </Typography>
    </Box>
    <Box m="1%">
    <Typography>
   
   <p>{tweet.tweet}</p>
   <p>{new Date(tweet.date).toDateString()}, {new Date(tweet.date).toLocaleTimeString()}</p>
   <a href={tweet.tweet_link}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
    Click Here View More
    </a>
    <br />
  <p> <ReplyIcon />&nbsp;&nbsp; {tweet.replies_count} &nbsp;&nbsp;Replays   &nbsp;&nbsp;&nbsp; <AutorenewIcon /> &nbsp;&nbsp; {tweet.retweets_count}&nbsp;&nbsp;Retweets 
  &nbsp;&nbsp;&nbsp; <ThumbUpAltIcon /> &nbsp;&nbsp; {tweet.likes_count} &nbsp;&nbsp;Likes  &nbsp;&nbsp;&nbsp; <VisibilityIcon />&nbsp;&nbsp;{tweet.views_count}&nbsp;&nbsp;Views </p>
  </Typography>
   </Box>
    </Card>
     ))}
     </>
    ))
    ) : (
      <>
      </>
     )}

 <Card style={cardstyle}>
    <Box m="2%">
 
    {error ? (
          <div>
           {error && <><large style={{ color: 'red' }}>{error}</large><br /></>}<br />
          </div>
        ):(
          <>
          {isLoading ? (
           <LoadingSpinner />
           ):(
            <>
            
            </>
           )}
        </>
        )}
     </Box>
    </Card>
   </div>
   
   </div>
  </div>
  <br />
    </Box>
    )
}
export default KeywordSearch