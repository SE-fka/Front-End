import React, { useState } from "react";
import { Box, Card } from "@mui/material";
import { useSelector } from "react-redux";
import { selectPost } from "../../features/userSlice";


const ProfilePage = () => {
  const Page = useSelector(selectPost);
  const [convertedData] = useState(() => {
    const convertedObj = Page.reduce((result, item) => {
      const key = Object.keys(item)[0];
      const value = item[key];
      result[key] = value;
      return result;
    }, {});
    return [convertedObj];
  });
  var searchTerm = "ABOUT";
  var fullName = Object.keys(convertedData[0]).find((key) =>
    key.startsWith(searchTerm)
  );

  
  return (
    <Box m="5%">
  <Card style={{display: 'flex', margin: '2%', justifyContent: 'center'}}>
    <img alt="fb" src={'../../image/facebook_group.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
    <h4> About Page</h4>
    </Card>
    <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
     
        <Card>
             <h6> <b>CATEGORY:</b> &nbsp; {convertedData[0].CATEGORY} </h6>
             <h6> <b>Contact Info:</b> &nbsp; {convertedData[0]["CONTACT INFO"]} </h6>
             <h6> <b>Basic Info:</b> &nbsp; {convertedData[0]["BASIC INFO"]} </h6>
             <h6> <b>PAGE TRANSPARENCY:</b> &nbsp; {convertedData[0]["PAGE TRANSPARENCY"]} </h6>
             <h6> <b>About Page:</b> &nbsp; {convertedData[0][`${fullName}`]} </h6>
             <h6> <b>Life Events:</b> &nbsp; {convertedData[0]["LIFE EVENTS"]} </h6>
           </Card> 
          </div>
     <br/>
     <br/>
    </Box>
  );
};

export default ProfilePage;
