import React, {useEffect, useState} from 'react'
import { Box, Card } from "@mui/material";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";
import API from '../../API/TwitterApi';
import AuthService from '../../API/AuthApi';
import Collapsible from 'react-collapsible';


const TwitterPage = () => {
  let navigate = useNavigate ();
  const [twitterusers, setUser] = useState([]);
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

  const sortedData = twitterusers.slice().reverse();
  const tw_users = Array.from(new Set(sortedData.map(x=>x.UserName)))
  .map(UserName => {
   return {
    UserName: UserName,
    Fullname: sortedData.find(x=> x.UserName === UserName).Fullname,
    Description: sortedData.find(x=> x.UserName === UserName).Description,
    Tweets: sortedData.find(x=> x.UserName === UserName).Tweets,
    Joined_Date: sortedData.find(x=> x.UserName === UserName).Joined_Date,
   }});
   //const sortedData = twitterusers.slice().sort((a, b) => new Date(a.Date_of_Scraping) - new Date(b.Date_of_Scraping));

   const handleLogout = () => {
    AuthService.logout();
    navigate('/')
  };


  return (
  <Box>
    <Card style={{display: 'flex', margin: '3%', justifyContent: 'center'}}>
    <img alt="twitter" src={'../../image/twitter.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
    <h4> Available Pages</h4>
   </Card>
  <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
   
        {tw_users.map((user) => (
      <div className="col-lg-4">
      <Card> 
       <h5>&nbsp; <b>{user.Fullname}</b> 
        &nbsp;</h5> 
    
          <h6>&nbsp; <b>User Name:</b> &nbsp;
          <a href={"https://twitter.com/" + user.UserName}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          {user.UserName} 
          </a>
          &nbsp;</h6> 
       
          <h6>&nbsp; <b>About:</b> &nbsp;
          {user.Description}
          &nbsp; </h6> 
          
          <h6>&nbsp; <b>Tweets:</b> &nbsp;
          {user.Tweets}
          &nbsp;</h6> 
        
          <h6>&nbsp; <b>Joined Date:</b> &nbsp;
          {user.Joined_Date}
          &nbsp;</h6> 
          
          <Collapsible trigger={ <h6 style={{ color:'blue'}}><b> &nbsp; Show All Scraping Dates</b></h6>}>
          <div style ={{height: '140px', overflow:'scroll', border: 'thin #000 solid', padding: '5px}'}}>
          {sortedData.map((data) => (
            <> {user.UserName === data.UserName && (
                <Link to={`/twitter/tweets?doc-id=${data._id}`} style={{ textDecoration: 'none' }}> <p style={{margin: '3%'}}> View Tweets &nbsp;---&nbsp; 
                {new Date(data.Date_of_Scraping).toDateString()}, {new Date(data.Date_of_Scraping).toLocaleTimeString()} </p></Link> 
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
               {tw_users.length === 0 && (
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


export default TwitterPage