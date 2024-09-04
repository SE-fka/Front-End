import React, {useEffect, useState} from 'react'
import { Grid, TextField, Button, useTheme, Box, Card } from "@mui/material";
import { tokens } from "../../styles/theme";
import { YoTubeDataTable } from "./SearchDataTable";
import LoadingSpinner from "../../common/LoadingSpinner";
import API from '../../API/YouTubeApi';

const url = API.getCommonURL();


const YouTube = () => {
  const user = JSON.parse(localStorage.getItem('token'));
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', border:'null', backgroundColor: colors.blueAccent[400]}
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '3%', justifyContent: 'center'}
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState("");
  const [youtubeURL, setYoutubeURL] = useState([]);
  const [youtubeData, setYouTubeData] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line
}, []);


const searchData = (event) => {
  event.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append('x-access-token', user.accessToken);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };
  try {
   setIsLoading(true);
   fetch(url + `youtube-live-search?link=${input}`, requestOptions)
   .then((res) => res.json())
   .then((data) => {
     if (data && data.length > 0) {
       const flattenedData = data.flatMap((item) => item);
       setYoutubeURL(flattenedData);
       setYouTubeData(flattenedData.flatMap((item) => item.Comments));
       setIsLoading(false);
     } else {
       setIsLoading(false);
       setError("No data found.");
     }
    })
  setInput('');
  }
catch (err) {
  setIsLoading(false);
  setError("Something went wrong. Please try again later.");
 }   
 
};

  return (
    <Box m="2%" pt={16}>
    <Grid align='center'>
    <p style={{color:colors.greenAccent[400]}}> <b> YouTube Live Search  </b></p>
    <form onSubmit={searchData}>
    <TextField label="Enter YouTube URL" style = {{width: '40%'}} required
      value={input} onChange={(e) => setInput(e.target.value)}/>
    <Button type='submit' variant="primary" style={btnstyle}>Live Search</Button>
    </form>
    </Grid>
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    <Card style={cardstyle}>
    <img alt="yt" src={'../../image/youtube.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
    <h4>Viedo URLs</h4>
    </Card>
 </div>
 </div>
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    {error ? (
       <div>
        {error && <><large style={{ color: 'red' }}>{error}</large><br /></>}<br />
       </div>
       ):(
       <>
       {isLoading ? (
        <LoadingSpinner />
        ):(
         <>  </>
        )}
     </>
     )}

   {youtubeURL.map((data)=> (
    <>
   <Card> 
   <h5>&nbsp; <b>Title:</b> {youtubeURL[0]['Video Title']}
     &nbsp;</h5>  
       <h6>&nbsp; <b>URL:</b> &nbsp;
      <a href={youtubeURL[0]['Link']}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      {youtubeURL[0]['Link']}
       </a> 
       &nbsp;</h6>
       <h6>&nbsp; <b>Subscribers:</b> &nbsp;
       {data.Subscribers}
       &nbsp; </h6> 
       <h6>&nbsp; <b>Number of Comments:</b> &nbsp;
       {youtubeURL[0]['Comments Count']}
       &nbsp; </h6> 
       <h6>&nbsp; <b>Number of Likes:</b> &nbsp;
       {data.Likes}
       &nbsp; </h6> 
       <h6>&nbsp; <b>Number of Shares:</b> &nbsp;
       {data.Shares}
       &nbsp; </h6> 
       </Card>
       <hr />
       </>
       ))}
    </div>

    <div className="col-sm-10">  
    {youtubeData ? <YoTubeDataTable data={youtubeData}  /> : <></>}
  </div>
  </div>
  </Box>
  )
}
export default YouTube