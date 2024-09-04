import React, { useState } from "react";
import { Card, TextField, Button, useTheme, Box, MenuItem, Select, Tabs, } from "@mui/material";
import { tokens } from "../styles/theme";
import API from '../API/KeywordToolApi';
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";

const URL = API.getVideoImageSearch();

const VideoImageSearch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '12%', backgroundColor: colors.blueAccent[400]}
  const selectstyle={width: '18%'}
  const textfieldstyle={width: '60%'}  
  const cardstyle={display: 'flex', marginTop: '3%'}  
  const divstyle={display: 'flex', margin: '3%', justifyContent: 'center'}  

  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const [video_keyword, setVideoKeyword] = useState("");
  const [video_from, setVideoFrom] = useState([]); 
  const [videoData, setVideoData] = useState(null);

  const [image_keyword, setImageKeyword] = useState("");
  const [image_from, setImageFrom] = useState(null); 
  const [imageData, setImageData] = useState(null);


  //Searc file from differn document
  const getVideoData = async (e) => {
    setVideoData('')
   e.preventDefault();
   try {
    setIsLoading(true);
    const response = await axios.post(URL, {
      video_keyword,
      video_from,
    });
    if (response.data.video_url.length > 0) {
      setVideoData(response.data.video_url);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError('No data found.');
    }
    setVideoKeyword('');
    setVideoFrom('');
  } catch (err) {
    setIsLoading(false);
    setError('Something went wrong. Please try again later.');
  }
};

//Discovering google drive and finding exposed sensitive documents
const getImageData = async (e) => {
   setImageData('')
   e.preventDefault();
   try {
    setIsLoading1(true);
    const response = await axios.post(URL, {
      image_keyword,
      image_from
    });
    if (response.data.image_url.length > 0) {
      setImageData(response.data.image_url);
      setIsLoading1(false);
    } else {
      setIsLoading1(false);
      setError1('No data found.');
    }
    setImageKeyword('');
    setImageFrom('');
  } catch (err) {
    setIsLoading1(false);
    setError1('Something went wrong. Please try again later.');
  }
};


  return (
    <Box m="2%" pt={16} display="flex" justifyContent="center" alignItems="center">
    <div className="col-sm-10"> 
     <Card>
      <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs style={{backgroundColor: colors.blueAccent[600]}}>
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Finding videos using specific keyword </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getVideoData}>
    <Select class="form-control"
      value={video_from}
      onChange={(e) => setVideoFrom(e.target.value)} style={selectstyle} required>
      <MenuItem selected={"selected"}> -- Select platform --</MenuItem>
      <MenuItem value={"Facebook"}> Facebook</MenuItem>
      <MenuItem value={"Twitter"}> Twitter</MenuItem>
      <MenuItem value={"Linkedin"}> Linkedin</MenuItem>
      <MenuItem value={"Google"}> Google</MenuItem>
      <MenuItem value={"Youtube"}> Youtube</MenuItem>
      <MenuItem value={"Tiktok"}> Tiktok</MenuItem>
      <MenuItem value={"Instagram"}> Instagram</MenuItem>
      <MenuItem value={"all"}> All</MenuItem>
    </Select>
    &nbsp;&nbsp; 
    <TextField
      label="Enter keyword"
      style={textfieldstyle}
      value={video_keyword}
      onChange={(e) => setVideoKeyword(e.target.value)}
      required
    />
   &nbsp;&nbsp; 
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
  </form>
<Card style={cardstyle}>
 <div style={divstyle}>
  <>
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
  </>
  {videoData && videoData.length > 0 && (
  <div>
    {videoData.map((item, index) => (
      <a href={item} target="_blank" rel="noopener noreferrer" key={index}>
        <h4>Click Here to View {item}</h4>
      </a>
    ))}
  </div>
)}
</div> 
</Card>

{/* For post from text */}
<hr />
<Card>
      <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs style={{backgroundColor: "#007BFF"}}>
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Finding images using specific keyword </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getImageData}>
    <Select class="form-control"
      value={image_from}
      onChange={(e) => setImageFrom(e.target.value)} style={selectstyle} required>
      <MenuItem selected={"selected"}> -- Select platform --</MenuItem>
      <MenuItem value={"Facebook"}> Facebook</MenuItem>
      <MenuItem value={"Twitter"}> Twitter</MenuItem>
      <MenuItem value={"Linkedin"}> Linkedin</MenuItem>
      <MenuItem value={"Instagram"}> Instagram</MenuItem>
      <MenuItem value={"all"}> All</MenuItem>
    </Select>
    &nbsp;&nbsp; 
    <TextField
      label="Enter file name"
      style={textfieldstyle}
      value={image_keyword}
      onChange={(e) => setImageKeyword(e.target.value)}
      required
    />
   &nbsp;&nbsp; 
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
  </form>
<Card style={cardstyle}>
 <div style={divstyle}>
  <>
  {error1 ? (
       <div>
        {error1 && <><large style={{ color: 'red' }}>{error1}</large><br /></>}<br />
       </div>
       ):(
       <>
       {isLoading1? (
        <LoadingSpinner />
        ):(
         <>  </>
        )}
     </>
     )}
  </>
  {imageData && imageData.length > 0 && (
  <div>
    {imageData.map((item, index) => (
      <a href={item} target="_blank" rel="noopener noreferrer" key={index}>
        <h4>Click Here to View {item}</h4>
      </a>
    ))}
  </div>
)}
</div> 
</Card>
  </div>
  </Box>
  )
}

export default VideoImageSearch