import React from "react";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";
import Tweetzzzz from "./Tweet";


const UserProfile = (prop) => {
  const platform = prop.platform;
  let tweet_wall = useSelector((state)=>state.targetAnalysis.tweet_wall)
  
  
  return (
    <>
      { tweet_wall.length>0?
        <Grid m={'2%'} container spacing={1}>
          <Tweetzzzz platform={platform} elem ={tweet_wall[0]}/>
          <Tweetzzzz platform={platform} elem ={tweet_wall[1]}/>
          <Tweetzzzz platform={platform} elem ={tweet_wall[2]}/>
          <Tweetzzzz platform={platform} elem ={tweet_wall[3]}/>
          <Tweetzzzz platform={platform} elem ={tweet_wall[4]}/>
          <Tweetzzzz platform={platform} elem ={tweet_wall[5]}/>
          <Tweetzzzz platform={platform} elem ={tweet_wall[6]}/>
          <Tweetzzzz platform={platform} elem ={tweet_wall[7]}/>
        </Grid>
        :
        <h1>No Tweets or Post selected</h1>
      }
    </>
  );
};

export default UserProfile;

