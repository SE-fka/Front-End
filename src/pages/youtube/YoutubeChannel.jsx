import React, {useEffect, useState} from 'react'
import { Box, Card} from "@mui/material";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";
import API from '../../API/YouTubeApi';
import AuthService from '../../API/AuthApi';
import Collapsible from 'react-collapsible';


const YoutubeChannel = (props) => {
  let naigate = useNavigate ();
  const [youtubechannel, setCahnnel] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getChannel();
    // eslint-disable-next-line
  }, []);

  const getChannel = async () =>{
    try {
      setIsLoading(true); 
      await API.getChannel()
      .then(response => setCahnnel(response.data),
      (error) => {
        if (error.response.status === 401){
          setError("UnAuthorized. Token Expired Please login again.");
          handleLogout();
          }
      });  
      setIsLoading(false); 
    }
    catch (err) {
      setIsLoading(false); 
      setError(err);
    }     
  }

 /*  const sortedData = youtubechannel.slice().reverse();
  const data = Array.from(new Set(sortedData.map(x=>x._id)))
  .map(_id => {
   return {
    _id: _id,
    channel_url: sortedData.find(x=> x._id === _id).channel.channel_url,
    channel_name: sortedData.find(x=> x._id === _id).channel.channel_name,
    subscribers: sortedData.find(x=> x._id === _id).channel.subscribers,
   }}); */
/* 
   const channel = Array.from(new Set(youtubechannel.map(x => x.channel_url)))
   .map(url => {
     const { channel_url, channel_name, subscribers } = youtubechannel.find(x => x.channel_url === url).channel;
 
     return {
       channel_url,
       channel_name,
       subscribers
     };
   }); */


  const handleLogout = () => {
      AuthService.logout();
      naigate('/')
    };

  return (
  <Box m="2%" pt={16}>
  <Card style={{display: 'flex', margin: '3%', justifyContent: 'center'}}>
    <img alt="youtube" src={'../../image/youtube.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
    <h4> YouTube Channels</h4>
   </Card>
  <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
   
      {youtubechannel.map((data)=> (
      <div className="col-lg-4">
      <Card> 
     {/*    <h5>&nbsp; <b>{data.channel_name}</b> 
        &nbsp;</h5>  
        */}
          <h6>&nbsp; <b>YouTube:</b> &nbsp;
         <a href={youtubechannel[0]['Video URL']}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
         {youtubechannel[0]['Video URL']}
          </a> 
          &nbsp;</h6>
          <h6>&nbsp; <b>Subscribers:</b> &nbsp;
          {data.Subscribers}
          &nbsp; </h6> 

          <Collapsible trigger={<h6 style={{ color:'blue'}}><b> &nbsp; Show All Comments</b></h6>}>
          <div style ={{height: '140px', overflow:'scroll', border: 'thin #000 solid', padding: '5px}'}}>
        {youtubechannel.map(commentData => (
         
           <Link to={`/youtube/coment?doc-id=${commentData._id}`} style={{ textDecoration: 'none' }}> <p style={{margin: '3%'}}> View Comments &nbsp;---&nbsp; {youtubechannel[0]['Video URL']} </p></Link> 
           
          ))} 
          </div>
        </Collapsible> 
          </Card>
          <hr />
          </div>
          ))}

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
               {youtubechannel.length === 0 && (
          <div>
            Result Not Found
          </div>
        )}
          </>
           )}
        </>
        )}

     </div>
    </Box>
    )
}


export default YoutubeChannel