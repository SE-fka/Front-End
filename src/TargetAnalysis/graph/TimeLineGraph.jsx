import { Box, Button, CardContent, Grid, Input, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import { tokens } from "../../styles/theme";
import { useSelector, useDispatch } from "react-redux";
import CircularProgration from "./CircularProgression";
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
import styled from "@emotion/styled";
import ProfileCard from "./Tweetwall";


const Card = styled.div`
  box-shadow: 1px 1px 10px 1px #a1a1a1;   
  border-radius: 10px;   
  padding: 20px;
`;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function TimeLineGraph(){


    const theme = useTheme();
    const mystyle = {
        height:'700px',
        width:'700px',
      };
    

    const colors = tokens(theme.palette.mode);

    const access_token = useSelector((state)=>{return state.auth.access_token});
    let like = useSelector((state) => state.targetAnalysis.like);
    let follower = useSelector((state) => state.targetAnalysis.follower);
    let retweet = useSelector((state) => state.targetAnalysis.retweet);
    let reply = useSelector((state) => state.targetAnalysis.reply);
    let view = useSelector((state) => state.targetAnalysis.view);
    const dispatch = useDispatch();

    let engagement_rate=useSelector((state)=>state.targetAnalysis.engagement_rate)
    let mention_acc=useSelector((state)=>state.targetAnalysis.mention_acc)
    
    let like_avg_cal=useSelector((state)=>state.targetAnalysis.like_avg_cal)
    let replies_avg_cal=useSelector((state)=>state.targetAnalysis.replies_avg_cal)
    let retweets_avg_cal=useSelector((state)=>state.targetAnalysis.retweets_avg_cal)
    let views_avg_cal=useSelector((state)=>state.targetAnalysis.views_avg_cal)
    let impressions_cal =useSelector((state)=>state.targetAnalysis.impressions_cal)

    let avarage_likes_growth_rate = useSelector( (state)=>state.targetAnalysis.avarage_likes_growth_rate)
    let avrege_replies_growth_rate = useSelector( (state)=>state.targetAnalysis.avrege_replies_growth_rate)
    let avrege_retweets_growth_rate = useSelector( (state)=>state.targetAnalysis.avrege_retweets_growth_rate)
    let avrege_views_growth_rate = useSelector( (state)=>state.targetAnalysis.avrege_views_growth_rate)    
    
    let tweetGrowth = useSelector( (state)=>state.targetAnalysis.tweetGrowth) 
    let likeGrowth = useSelector( (state)=>state.targetAnalysis.likeGrowth) 
    let trend_hour = useSelector( (state)=>state.targetAnalysis.trend_hour) 

    let data = useSelector((state) => state.targetAnalysis.post);

    const [inputValue, setInputValue] = useState(false);

    const [userName, setUserName] = useState("");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0); 
    const [platforms, setPlatforms] = useState('twitter');

    function onClickHandle(e){
        e.preventDefault(false);

        if(userName){            
            dispatch({
                type: 'GET_TARGET_DATA', 
                payload: {
                    platforms:platforms, 
                    username: userName,
                    year: year,
                    month: month,
                    access_token: access_token,
                },
            })
        }
        else{
            setInputValue(true);
        }
    }
    

   const growthData = {
       labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,22,23],
        datasets: [
          {
            label: 'Like Growth',
            data: likeGrowth,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Tweet Growth',
            data: tweetGrowth,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return (
        <Box m={'2%'} pt={16}>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={'12'}>
                <Box m={'2%'} display="flex" justifyContent="center" alignItems="center">
                    Platform:
                    <Select 
                        sx={{
                            width:'150px',
                            height:"30px",
                            color:"black",
                            marginRight:'20px',
                        }}
                        value={platforms}
                        id="platforms"
                        label="platforms"
                        onChange={(e)=>{setPlatforms(e.target.value)}}
                        name="platforms"
                        >
                        <MenuItem value={'twitter'}>Twitter</MenuItem>
                        <MenuItem value={"facebook"}>Facebook</MenuItem>
                        <MenuItem value={'youtube'}>YouTube</MenuItem>
                        <MenuItem value={'telegram'}>Telegram</MenuItem>
                    </Select>

                    User:
                    <Input 
                        id="user" 
                        value={userName} 
                        onChange={(e)=>{
                            setUserName(e.target.value)
                        }} 
                        sx={{
                            marginRight:'20px',
                        }}/>
                
                    <Button sx={{
                            backgroundColor: "#868cfb",
                        }}
                        onClick={onClickHandle}>
                        Filter
                    </Button>
                </Box>            
            </Grid>
         
            
            <Grid container m='3%' sx={{ justifyContent: 'space-around'}}>
                <Grid style={{ marginBottom: "20vh" }}  item md={5} lg={3}>
               
                    <CircularProgration 
                        percentage={avarage_likes_growth_rate} 
                        title={`Average likes: ${like_avg_cal}`}
                        title2={`Growth rate: ${avarage_likes_growth_rate}`}
                        size = {1}
                        />
                    
                </Grid>
                <Grid style={{ marginBottom: "20vh" }}  item md={5} lg={3}>
                    <Box>
                        
                        <CircularProgration 
                            percentage={avrege_replies_growth_rate} 
                            title={`Average Replies: ${replies_avg_cal}`}
                            title2={`Growth of Replies: ${avrege_replies_growth_rate}`}
                            size = {1}
                            />
                    </Box>
                </Grid>
                <Grid style={{ marginBottom: "20vh" }}  item md={5} lg={3}>
              
                    <Box>
                        <CircularProgration 
                            percentage={avrege_retweets_growth_rate} 
                            title={`Average Retweets: ${retweets_avg_cal}`}
                            title2={`Growth of Retweets: ${avrege_retweets_growth_rate}`}
                            size = {1}
                            />
                    </Box>
                </Grid>
                <Grid style={{ marginBottom: "20vh" }}  item md={5} lg={3}>
               
                    <Box >
                        <CircularProgration 
                            percentage={avrege_views_growth_rate} 
                            title={`Average Views: ${views_avg_cal}`}
                            title2={`Growth of Views: ${avrege_views_growth_rate}`}
                            size = {1}
                            />
                    </Box>
                </Grid>
                <Grid  item md={5} lg={3} style={{ marginBottom: "8vh" }}>
                
                    <CircularProgration percentage={engagement_rate} 
                        title={`Engagements: ${engagement_rate}`}
                        
                        size = {1}
                        />
                </Grid>
                <Grid  item md={5} lg={3} style={{ marginBottom: "8vh"}}>
           
                    <CircularProgration percentage={impressions_cal} 
                        title={`Impression: ${impressions_cal}`}
                        
                        size = {1}
                        />
                </Grid>
            </Grid>

        {/*  <Grid container m='0' sx={{ justifyContent: 'space-around'}}>
           <Box>
          <Line  data={growthData} style={mystyle} />
          </Box>
         <Box>
            <br />
            <br />
          <img alt="ck" src={'../../image/clock.png'} style={{ height: '130px',width: '130px', opacity: .8}} />
      
        <p style={{textAlign:'center', fontSize: 18}}> <b> Trend Hours: </b> &nbsp;
          {Object.keys(trend_hour).map(key => (
              <>
              {trend_hour[key]} hrs. &nbsp;
             </>
             ))}
             </p>  
          </Box>
          </Grid>  */}

       <Grid container sx={{ justifyContent: 'space-around'}}>    
            <ProfileCard platform={platforms}/>
        </Grid>
    
      <div className="row" style={{display: 'flex', justifyContent: 'left', marginLeft: "3vh", marginRight: "3vh", marginBottom: "2vh" }}>
        {Object.keys(mention_acc).map(key => (
         <div className="col-lg-3" key={key} style={{ marginBottom: "2vh"}}> 
            <Card>
                <img alt="fb" src={'../../image/twitter.png'} style={{ height: '40px',width: '40px', opacity: .8}} />
              <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" component="div">
                 {key}: {mention_acc[key]} times mention.
                </Typography>
              </CardContent>
            </Card>
       </div>
       ))}
     </div>
    </Grid>
    </Box>
    )
}

