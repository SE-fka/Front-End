import React, { useState } from "react";
import { Grid, TextField, Button, useTheme, Box, MenuItem, Select } from "@mui/material";
import { tokens } from "../../styles/theme";
import { useNavigate, Link} from "react-router-dom";
import AuthService from '../../API/AuthApi';
import { Card , Typography} from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import axios from "axios";
import AuthHeader from "../../API/AuthHeader";
import LoadingSpinner from "../../common/LoadingSpinner";
import FBAPI from '../../API/FacebookApi';
import TWAPI from '../../API/TwitterApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fburl = FBAPI.getPosts();
const twurl = TWAPI.getTweets();

//const fblinkurl = FBAPI.LinkRequest()
const twlinkurl = TWAPI.LinkRequest()

const TargetSearch = () => {
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

    if(value==='facebook') {
      try {
        setIsLoading(true);
        const response = await axios.get(fburl + `live-search?keyword=${input}`, {
          headers: AuthHeader()
        });
      const result = response.data;
      if (result && result.length > 0) {
        setFacebookData(result);
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
      
    if (value==='twitter') {
      try {
      const type = 'name';
      setIsLoading(true);
      const response = await axios.get(twurl + `live-search?type=${type}&name=${input}`, {
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

/* const FacebookAddLink = (username) => {
      var myHeaders = new Headers();
      myHeaders.append('x-access-token', user.accessToken);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("link", username);
      urlencoded.append("type", "link");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      
      fetch(fblinkurl + "user/add", requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result.type === 'success') {
          toast.success(result.message);
        } else if (result.type === 'warning') {
          window.confirm('❎ Link Already exist!')
        } else if (result.type === 'error') {
          toast.error(result.message);
        }
      });           
    } */

 const TwitterAddLink = (username) => {
  var myHeaders = new Headers();
  myHeaders.append('x-access-token', user.accessToken);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("type", "username");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch(twlinkurl + "add", requestOptions)
  .then(response => response.json())
  .then((result) => {
    if (result.type === 'success') {
      toast.success(result.message);
    } else if (result.type === 'warning') {
      window.confirm('❎ Username Already exist!')
    } else if (result.type === 'error') {
      toast.error(result.message);
    }
  });           
    }

 const handleLogout = () => {
      AuthService.logout();
      navigate('/')
    };
    
  
  return (
    <Box m="3%" pt={15}>
    <Grid align='center'>
    <br />
    <p style={{color:colors.greenAccent[400]}}> <b> Target Live Search  </b></p>
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
    <TextField  label="Enter target name" style = {{width: '40%'}} value={input} onChange={(e) => setInput(e.target.value)}  required/>
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
    </form>
    </Grid>
    
  <div className="container-fluid">
  <div className="row" style={divstyle}>
   <div className="col-sm-10"> 
  
  {value==='facebook' ? (
   facebookData.map((data, index) => (
      
   <Card key={index} style={cardstyle}>
    <Box m="1%">
    <img alt="pr" src={data.p_image} style={profilestyle} /> 
    </Box>
    <Box m="1%">
   {/*  <Link  onClick={() => FacebookAddLink(`${data.username}`)}  style={{position: 'absolute', right: '15%', textDecoration: 'none'}}>
              Add to target
    </Link>  */}
    <Typography>
    <p>  {data.title} &nbsp;&nbsp; <a href={data.p_url}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
     View profile
    </a> </p>

   <p>{data.p_data}</p>
   <p> {new Date(data.timestamp).toDateString()} </p>
   <p style={{textAlign:'center'}}> <ThumbUpAltIcon /> &nbsp;&nbsp; {data.like} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <ShareIcon />&nbsp;&nbsp;{data.numberOfShares} </p>
  </Typography>
  
   <p>&nbsp;&nbsp;{data.aboutUser}</p>
 
    </Box>
   </Card>
    ))
    ) : (
      <>
      </>
     )}

{value==='twitter' ? (  
  twitterData.map(data => (
    <>
    {data['Account Info'].map((account, index) => (
    <Card key={index} style={cardstyle}>
    <Box m="1%">
    <img src={account.profile_picture} alt='' style={{ borderRadius: '50%' }}/> 
    </Box>
    <Box m="1%">
    <Link  onClick={() => TwitterAddLink(`${account.username}`)}  style={{position: 'absolute', right: '15%', textDecoration: 'none'}}>
              Add to target
    </Link>
    <Typography>
     {account.name}
    <p>{account.username}</p>
   </Typography>
   <p>{account.description}</p>
 
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
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
     pauseOnHover
     theme="light" />
    <ToastContainer />
    </Box>
    )
}
export default TargetSearch