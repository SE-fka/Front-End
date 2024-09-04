import React, {useEffect, useState} from 'react'
import { Box, Card } from "@mui/material";
import { Link} from "react-router-dom";
import API from '../../API/TelegramApi';
import LoadingSpinner from "../../common/LoadingSpinner";
import Collapsible from 'react-collapsible';

const TelegramGroup = () => {
  const [groups, setGroup] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      getGroups();
  }, []);
  

  const getGroups = async () =>{
    try {
      setIsLoading(true); 
      await API.getGroups()
      .then(response => setGroup(response.data),
      (error) => {
        if (error.response.status === 401){
          setError("UnAuthorized. Token Expired Please login again.");
          }
      });   
      setIsLoading(false); 
    }
    catch (err) {
      setIsLoading(false); 
      setError("Something went wrong. Please try again later.");
    }   
  }
 
  const sortedData = groups.slice().reverse();
 const tb_groups = Array.from(new Set(sortedData.map(x=>x.group_username)))
   .map(group_username => {
    return {
      group_username: group_username,
    }});



 return (
  <Box>
  <Card style={{display: 'flex', margin: '3%', justifyContent: 'center'}}>
    <img alt="telegram" src={'../../image/telegram_group.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
    <h4> Telegram Groups</h4>
   </Card>
    <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
    
   {tb_groups.map((group) => (
        <div className="col-lg-4">
        <Card>  
       <h5> &nbsp;&nbsp;  
        <b> {group.group_username} </b>  
          &nbsp;  
          </h5> 

      <Collapsible trigger={ <h6 style={{ color:'blue'}}><b> &nbsp; Show All Scraping Dates</b></h6>}>
       <div style ={{height: '140px', overflow:'scroll', border: 'thin #000 solid', padding: '5px}'}}>
          {sortedData.map((data) => (
            <> {group.group_username === data.group_username && (
                <Link to={`/group/posts?doc-id=${data._id}`}  style={{ textDecoration: 'none' }}> <p style={{margin: '3%'}}> View Posts &nbsp;---&nbsp; {new Date(data.date_of_scrapting).toDateString()}, {new Date(data.date_of_scrapting).toLocaleTimeString()} </p> </Link>
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
           {tb_groups.length === 0 && (
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

export default TelegramGroup