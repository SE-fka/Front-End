import React, {useEffect, useState} from 'react'
import {Box, Card } from "@mui/material";
import { useNavigate, Link} from "react-router-dom";
import API from '../../API/TelegramApi';
import AuthService from '../../API/AuthApi';
import LoadingSpinner from "../../common/LoadingSpinner";
import Collapsible from 'react-collapsible';

const TelegramChannel = () => {
  let navigate = useNavigate ();

  const [telegramusers, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      getUsers();
       // eslint-disable-next-line
  }, []);
  

  const getUsers = async () =>{
    try {
      setIsLoading(true); 
      await API.getUsers()
      .then(response => setUser(response.data),
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
      setError("Something went wrong. Please try again later.");
    }     
  }
 
  const sortedData = telegramusers.slice().reverse();
  const tb_users = Array.from(new Set(sortedData.map(x=>x.channel_username)))
  .map(channel_username => {
   return {
    channel_username: channel_username,
   }});

 const handleLogout = () => {
    AuthService.logout();
    navigate('/')
  };


 return (
 <Box>
  <Card style={{display: 'flex', margin: '3%', justifyContent: 'center'}}>
    <img alt="telegram" src={'../../image/telegram.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
    <h4> Telegram Channels</h4>
    </Card>
  <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
  
        {tb_users.map((user) => (
        <div className="col-lg-4">
       <Card>
       <h5>&nbsp; &nbsp; 
        <b> {user.channel_username} </b> 
       &nbsp; 
       </h5> 

       <Collapsible trigger={<h6 style={{ color:'blue'}}><b> &nbsp; Show All Scraping Dates</b></h6>}>
       <div style ={{height: '140px', overflow:'scroll', border: 'thin #000 solid', padding: '5px}'}}> 
          {sortedData.map((data) => (
            <> {user.channel_username === data.channel_username && (
                <Link to={`/channel/posts?doc-id=${data._id}`}  style={{ textDecoration: 'none' }}> <p style={{margin: '3%'}}> View Posts &nbsp;---&nbsp; {new Date(data.date_of_scraping).toDateString()}, {new Date(data.date_of_scraping).toLocaleTimeString()} </p> </Link>
            )}
            </>
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
         {tb_users.length === 0 && (
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

export default TelegramChannel