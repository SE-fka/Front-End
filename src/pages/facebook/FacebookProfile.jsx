import React, {useEffect, useState} from 'react'
import { Box, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthService from '../../API/AuthApi';
import API from '../../API/FacebookApi';
import LoadingSpinner from "../../common/LoadingSpinner";


const FacebookProfile = () => {
  let navigate = useNavigate ();
  const [facebookusers, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      getUsers();
       // eslint-disable-next-line
  }, []);

  

  const getUsers = async () =>{
    try {
      setIsLoading(true);
      await API.getProfilePosts()
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

  const fb_users = Array.from(new Set(facebookusers.map(x=>x.title)))
  .map(title => {
   return {
    title: title
   }});


  const handleLogout = () => {
    AuthService.logout();
   navigate('/')
  };
 
   
  return (
   <Box>
     <Card style={{display: 'flex', margin: '3%', justifyContent: 'center'}}>
    <img alt="fb" src={'../../image/facebook.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
    <h4> User Accounts </h4>
     </Card>
   <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
        {fb_users.map((user) => (
               
      <div className="col-lg-4">
                <Card>
                 <img alt="fb" src={'../../image/facebook.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
              <h5 style={{color:'blue'}}>
                &nbsp;  <b>{user.title}</b>
                &nbsp;
              </h5> 
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
               {fb_users.length === 0 && (
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

export default FacebookProfile