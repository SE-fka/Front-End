import React from "react";
import styled from "@emotion/styled";
import { Grid,Box } from "@mui/material";


const Card = styled.div`
  box-shadow: 1px 1px 10px 1px #a1a1a1;   
  border-radius: 10px;   
  padding: 20px;
`;

const MainProfile = styled.div`
  display: flex;   
  justify-content: space-between;   
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;   
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 100px;   
  border-radius: 50%;
`;

const UserFollows = styled.div`
  display: flex;   
  color: #5b7083;
`;

const UserFollowsInfo = styled.div`
  margin-right: 10px;
`;

const FollowButton = styled.button`
  font-size: 1.1rem;
  border: 3px solid #1da1f2;
  border-radius: 25px;
  background-color: rgba(29, 161, 242, 0);
  padding: 4px 10px;
  margin: 3px;
  font-weight: bold;
  color: #1da1f2;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(29, 161, 242, 0.2);
  }
`;

const Tweetzzzz = (prop) => {
  
  let platform = prop.platform;
  let name = "";
  let username = "";
  let profile = "./profile.jpg";
  let tweet_data = "";
 
  // console.log(platform=='Facebook')
  // if(platform=='facebook'){
  //   let name = prop.elem.nameOfPoster;
  //   let username = prop.elem.nameOfPoster;
  //   let profile = "./profile.jpg";
  //   let tweet_data = "";
  //   if(prop.elem.postContent){
  //     tweet_data = prop.elem.postContent
  //   }else{
  //     tweet_data = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  //   }
  //   let like = prop.elem.numberOfLikes;
  //   let views = prop.elem.numberOfComments;
  // }else if(platform=='twitter'){
  //   let name = prop.elem.username;
  //   let username = prop.elem.name;
  //   let profile = "./profile.jpg";
  //   let tweet_data = "";
  //   if(prop.elem.tweet){
  //     tweet_data = prop.elem.tweet
  //   }else{
  //     tweet_data = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  //   }
  //   let like = prop.elem.likes_count;
  //   let views = prop.elem.views_count;
  // }


  return (
    
    <Grid item xs={6} md={3}>
        <Card>
          <MainProfile>
            <UserInfo>
              {/* <ProfilePic src={profile} alt="Profile Pic" /> */}
              <div>
                <h6>{platform==='facebook' ? prop.elem.nameOfPoster : prop.elem.username}</h6>
                <p>{platform==='facebook' ? prop.elem.nameOfPoster : prop.elem.name}</p>
                
              </div>
            </UserInfo>
            <div>
            </div>
          </MainProfile>
            <div>
            <p>
            { platform==='facebook' ? prop.elem.postContent : prop.elem.tweet}
            </p>
            <p>{ platform==='facebook' ? new Date(prop.elem.timeOfPost).toDateString(): 
            new Date(prop.elem.date).toDateString()} </p> 
          </div>
          <FollowButton>{platform}</FollowButton>
          <UserFollows>
            <UserFollowsInfo>
              <b>{ platform==='facebook' ? prop.elem.numberOfLikes : prop.elem.likes_count}</b> likes
            </UserFollowsInfo>
            <UserFollowsInfo>
              <b>{prop.elem.views_count}</b> views
            </UserFollowsInfo>
          </UserFollows>
        </Card>
      
    </Grid>
  );
};


export default Tweetzzzz