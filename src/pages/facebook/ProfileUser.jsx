import React, { useState } from "react";
import { Box, Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFriends, selectPost } from "../../features/userSlice";


const ProfileUser = () => {
  const Page = useSelector(selectPost);
  const friends = useSelector(selectFriends);
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
    <Box m="3%">
      <Card style={{display: 'flex', margin: '2%', justifyContent: 'center'}}>
    <img alt="fb" src={'../../image/facebook.png'} style={{ height: '20px',width: '20px', opacity: .8}} />
    &nbsp;&nbsp;&nbsp;
     <h4> About User</h4>
     </Card>
   <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
   
         <Card>
             <h6> <b>Work:</b> &nbsp;{convertedData[0].WORK} </h6>
             <h6> <b>Education:</b> &nbsp; {convertedData[0].EDUCATION} </h6>
             <h6> <b>Places Lived:</b> &nbsp;{convertedData[0]["PLACES LIVED"]} </h6>
             <h6> <b>Contact Info:</b> &nbsp; {convertedData[0]["CONTACT INFO"]} </h6>
             <h6> <b>Basic Info:</b> &nbsp; {convertedData[0]["BASIC INFO"]} </h6>
             <h6> <b>Other Names:</b> &nbsp; {convertedData[0]["OTHER NAMES"]} </h6>
             <h6> <b>Family Members:</b> &nbsp; {convertedData[0]["FAMILY MEMBERS"]} </h6>
             <h6> <b>About User :</b> &nbsp; {convertedData[0][`${fullName}`]} </h6>
             <h6> <b>Life Events:</b> &nbsp; {convertedData[0]["LIFE EVENTS"]} </h6>
             <h6> <b>Favorite Quotes:</b> &nbsp; {convertedData[0]["FAVORITE QUOTES"]} </h6>
           </Card> 
           </div>
          <br />
        <div className="row" style={{display: 'flex', justifyContent: 'left'}}>
        <h4>Friends List</h4>
          {friends.map(({friendName,friendImage}) => (
               
         <div className="col-lg-3">
            <Card>
            <CardMedia
                component="img"
                sx={{ width: 150, objectFit: "cover" }}
                image={friendImage}
                alt={friendName} />
              <CardContent sx={{ flex: 1 }}>
              <Link style={{ textDecoration: 'none' }}> 
              <Typography variant="h5" component="div" style={{ color: 'blue' }}>
                 {friendName}
                </Typography>
                </Link>
              </CardContent>
            </Card>
    </div>
     ))}
     </div>
     <br/>
     <br/>
    </Box>
 
  );
};

export default ProfileUser;
