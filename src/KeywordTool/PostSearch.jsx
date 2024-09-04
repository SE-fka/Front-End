import React, { useState } from "react";
import { Card, TextField, Button, useTheme, Box, MenuItem, Select, Tabs, } from "@mui/material";
import { tokens } from "../styles/theme";
import API from '../API/KeywordToolApi';
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";

const URL = API.getPostSearch();
const API_URL = API.getCommentSearch();

const PostSearch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '12%', backgroundColor: colors.blueAccent[400]}
  const selectstyle={width: '18%'}
  const textfieldstyle={width: '60%'}  
  const cardstyle={display: 'flex', marginTop: '3%'}  
  const divstyle={display: 'flex', margin: '3%', justifyContent: 'center'}  

  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [inputText, setInputText] = useState("");
  const [post_from, setPostFrom] = useState([]); 
  const [postData, setPostData] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [comment_from, setCommentFrom] = useState(null); 
  const [commentData, setCommentData] = useState(null);

  const [targetname, setTargetName] = useState("");
  const [public_comment, setPublicCommentFrom] = useState(null);
  const [publiccommentData, setPublicCommentData] = useState(null);

  //For post url search
  const getPostURL = async (e) => {
    setPostData('')
   e.preventDefault();
   try {
    setIsLoading(true);
    const response = await axios.post(URL, {
      inputText,
      post_from,
    });
    if (response.data.url.length > 0) {
      setPostData(response.data.url);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError('No data found.');
    }
    setInputText('');
  } catch (err) {
    setIsLoading(false);
    setError('Something went wrong. Please try again later.');
  }
};

//For post text search
const getPostText = async (e) => {
   setCommentData('')
   e.preventDefault();
   try {
    setIsLoading1(true);
    const response = await axios.post(API_URL, {
      keyword,
      comment_from
    });
    if (response.data.url.length > 0) {
      setCommentData(response.data.url);
      setIsLoading1(false);
    } else {
      setIsLoading1(false);
      setError1('No data found.');
    }
    setKeyword('');
    setCommentFrom('');
  } catch (err) {
    setIsLoading1(false);
    setError1('Something went wrong. Please try again later.');
  }
};

//For public comment search
const getPublicComment = async (e) => {
  setPublicCommentData('')
  e.preventDefault();
  try {
   setIsLoading2(true);
   const response = await axios.post(API_URL, {
    targetname,
    public_comment
   });
   if (response.data.targetURL.length > 0) {
    setPublicCommentData(response.data.targetURL);
     setIsLoading2(false);
   } else {
     setIsLoading1(false);
     setError2('No data found.');
   }
   setTargetName('');
   setPublicCommentFrom('');
 } catch (err) {
   setIsLoading1(false);
   setError2('Something went wrong. Please try again later.');
 }
};

  return (
    <Box m="2%" pt={16} display="flex" justifyContent="center" alignItems="center">
    <div className="col-sm-10"> 
     <Card>
      <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs style={{backgroundColor: colors.blueAccent[600]}}>
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Post URL search from social media platforms </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getPostURL}>
    <Select class="form-control"
      value={post_from}
      onChange={(e) => setPostFrom(e.target.value)} style={selectstyle} required>
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
      label="የሚፈልጉትን ቁልፍ ቃል ያስገቡ"
      style={textfieldstyle}
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
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
  {postData && postData.length > 0 && (
  <div>
    {postData.map((item, index) => (
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
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Keyword search from social media post </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getPostText}>
    <Select class="form-control"
      value={comment_from}
      onChange={(e) => setCommentFrom(e.target.value)} style={selectstyle} required>
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
      label="Searching keyword in comments"
      style={textfieldstyle}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
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
  {commentData && commentData.length > 0 && (
  <div>
    {commentData.map((item, index) => (
      <a href={item} target="_blank" rel="noopener noreferrer" key={index}>
        <h4>Click Here to View {item}</h4>
      </a>
    ))}
  </div>
)}
</div> 
</Card>

{/* Find public comment */}
<hr />
<Card>
      <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs style={{backgroundColor: "#6C757D"}}>
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Find public comments from facebook and instagram accounts </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getPublicComment}>
    <Select class="form-control"
      value={public_comment}
      onChange={(e) => setPublicCommentFrom(e.target.value)} style={selectstyle} required>
      <MenuItem selected={"selected"}> -- Select platform --</MenuItem>
      <MenuItem value={"Facebook"}> Facebook</MenuItem>
      <MenuItem value={"Instagram"}> Instagram</MenuItem>
      <MenuItem value={"all"}> All</MenuItem>
    </Select>
    &nbsp;&nbsp; 
    <TextField
      label="Enter target name"
      style={textfieldstyle}
      value={targetname}
      onChange={(e) => setTargetName(e.target.value)}
      required
    />
   &nbsp;&nbsp; 
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
  </form>
<Card style={cardstyle}>
 <div style={divstyle}>
  <>
  {error2 ? (
       <div>
        {error2 && <><large style={{ color: 'red' }}>{error2}</large><br /></>}<br />
       </div>
       ):(
       <>
       {isLoading2 ? (
        <LoadingSpinner />
        ):(
         <>  </>
        )}
     </>
     )}
  </>
  {publiccommentData && publiccommentData.length > 0 && (
  <div>
    {publiccommentData.map((item, index) => (
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

export default PostSearch