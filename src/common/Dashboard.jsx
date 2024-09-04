import { PieChart } from "../components";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import { Line, Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { tokens } from "../styles/theme";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FBAPI from '../API/FacebookApi';
import TWAPI from '../API/TwitterApi';
import TGAPI from '../API/TelegramApi';
import AuthService from '../API/AuthApi';

import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)


const Dashboard = () => {
  let naigate = useNavigate ();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '8%', backgroundColor: colors.blueAccent[400]}
  
  const [fbuserData, setfbuserData] = useState([]);
  const [fbpageData, setfbpageData] = useState([]);
  const [twpageData, settwpageData] = useState([]);
  const [tgchannelData, settgchannelData] = useState([]);
  const [tggroupData, settggroupData] = useState([]);

  const [fbuserPost, setfbuserCommenInsight] = useState([]);
  const [fbpagePost, setfbpageCommenInsight] = useState([]);
  const [twuserPost, settwuserCommenInsight] = useState([]);
  const [tggroupPost, settggroupCommenInsight] = useState([]);
  const [tgchannelPost, settgchannelCommenInsight] = useState([]);

  const [fbuserTotalpost, setfbuserTotalpost] = useState([]);
  const [fbpageTotalpost, setfbpageTotalpost] = useState([]);
  const [twuserTotalpost, settwuserTotalpost] = useState([]);
  const [tggroupTotalpost, settggroupTotalpost] = useState([]);
  const [tgchannelTotalpost, settgchannelTotalpost] = useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    getFBUserData();
    getFBPageData();
    getTWPageData();
    getTGChannelData();
    getTGGroupData();
    
    getCommenInsight();
   
}, 
 // eslint-disable-next-line
[]);

const getFBUserData = async () =>{
  
  try {
    await FBAPI.getLinkRequest()
    .then(response => setfbuserData(response.data)); 
    
  }
  catch (error) {
  }    
}     
const getFBPageData = async () =>{
  try {
    await FBAPI.getPageLinkRequest()
    .then(response => setfbpageData(response.data)); 
    
  }
  catch (error) {
    if (error.response.status === 401){
      handleLogout();
      }
  }    
}    
const getTWPageData = async () =>{
  try {
    await TWAPI.getLinkRequest()
    .then(response => settwpageData(response.data)); 
    
  }
  catch (error) {
  }     
}   
const getTGChannelData = async () =>{
  try {
    await TGAPI.getLinkRequest()
    .then(response => settgchannelData(response.data.channel_username)); 
    
  }
  catch (error) {
  }     
}   

const getTGGroupData = async () =>{
  try {
    await TGAPI.getGroupLinkRequest()
    .then(response => settggroupData(response.data.group_username)); 
    
  }
  catch (error) { 
  }     
} 

/* Commen post count and visiualizations */

const getCommenInsight = async () => {
  try {
    await FBAPI.getCommenInsight()
    .then((response) => {
    setfbpageCommenInsight(response.data.facebook.pages.postCountByUsername);
    setfbuserCommenInsight(response.data.facebook.users.postCountByUsername);
    settwuserCommenInsight(response.data.twitter.tweetCountByUsername);
    settggroupCommenInsight(response.data.telegram.groups.postCountByUsername);
    settgchannelCommenInsight(response.data.telegram.channel.postCountByUsername);
    setfbpageTotalpost(response.data.facebook.pages.postCount);
    setfbuserTotalpost(response.data.facebook.users.postCount);
    settwuserTotalpost(response.data.twitter.totalTweetCount);
    settggroupTotalpost(response.data.telegram.groups.totalPostsCount);
    settgchannelTotalpost(response.data.telegram.channel.totalPostsCount);
  });
  } catch (error) {
    // Handle the error if needed
  }
}


function getData() {
  naigate(`/search?startDate=${startDate}&endDate=${endDate}`);
}

  const fbuser = fbuserData.length;
  const fbpage = fbpageData.length;
  const twpage = twpageData.length;
  const tgchannel = tgchannelData.length;
  const tggroup = tggroupData.length;

 const totalTarget= {
  labels: ['Facbook users', 'Facbook pages', 'Tweeter users', 'Telegram groups', 'Telegram channels'],
  datasets: [
    {
      data: [fbuser, fbpage, twpage, tgchannel, tggroup],
      backgroundColor: ['#3B5A9B', '#C2A3FF', '#00AEF0', '#db4f8e', '#63FFDE'],
    },
  ],
};

const target_options = {
  plugins: {
    datalabels: {
      formatter: (value) => {
        return value;
      },
      font: {
        size: 20, 
      },
    },
  },
};

const totalPost = {
  labels: ['Facbook user', 'Facbook page', 'Tweeter user', 'Telegram group', 'Telegram channel'],
  datasets: [
    {
      label: 'Total Posts',
      backgroundColor: 'rgba(219, 79, 142, 0.77)',
      borderColor: 'rgba(219, 79, 79, 0.77)',
      borderWidth: 2,
      data: [fbuserTotalpost, fbpageTotalpost, twuserTotalpost, tggroupTotalpost, tgchannelTotalpost],
    },
  ],
  
}

const totalPost_options = {
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Social media platforms',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Number of Posts/Tweets',
      },
    },
  },
};


const FBpageData = {
  labels: [],
   datasets: [
     {
       label: 'Posts',
       data: fbpagePost,
       borderColor: 'rgb(53, 162, 235)',
       backgroundColor: 'rgba(53, 162, 235, 0.5)',
     },
   ],
 };

 const FBpage_options = {
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Facebook pages',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Number of Posts',
      },
    },
  },
};


const FBuserData = {
  labels: [],
   datasets: [
     {
       label: 'Posts',
       data: fbuserPost,
       borderColor: 'rgb(255, 99, 132)',
       backgroundColor: 'rgba(255, 99, 132, 0.5)',
     }
   ],
 };

 const FBuser_options = {
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Facebook users',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Number of Posts',
      },
    },
  },
};

 const TWuserData = {
  labels: [],
   datasets: [
     {
       label: 'Tweets',
       data: twuserPost,
       borderColor: 'rgb(53, 162, 235)',
       backgroundColor: 'rgba(53, 162, 235, 0.5)',
     }
   ],
 };

 const TWuser_options = {
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Tweeter users',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Number of Tweets',
      },
    },
  },
};

const TGchannelData = {
  labels: [],
  datasets: [
    {
      label: 'Posts',
      data: tgchannelPost,
      backgroundColor: 'rgb(53, 162, 235)',
    },
  ],
};

const TGchannel_options = {
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Telegram channels',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Number of Posts',
      },
    },
  },
};

const TGgroupData = {
  labels: [],
  datasets: [
    {
      label: 'Posts',
      data: tggroupPost,
      backgroundColor: 'rgb(103,103,171)', 
    },
  ],
};

const TGcgroup_options = {
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Telegram groups',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Number of Posts',
      },
    },
  },
};


const handleLogout = () => {
  AuthService.logout();
  naigate('/')
};


 return (
    <Box m="2%" pt={16}>
    <div>
   <form onSubmit={getData}>
    <TextField  type='date' label="Start date" style = {{width: '40%'}} 
    value={startDate} onChange={(e) => setStartDate(e.target.value)}  required/>
    <TextField type='date' label="End date" style = {{width: '40%'}}
    value={endDate} onChange={(e) => setEndDate(e.target.value)}  required/>
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
    </form>
    </div>
    <br />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="200px"
        gap="20px"
      >

{/* 🟨🟨🟨🟨🟨🟨 ROW 1 🟨🟨🟨🟨🟨🟨 */}       

      <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <h6><b> Total Scrape Targets </b> </h6>
        <br />
        <Pie data={totalTarget}  plugins={[ChartDataLabels]} options={target_options} />
        </p>
        </Box>

        <Box
        gridColumn="span 6"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}  >
         <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <b>Total Posts </b> </p>
    
        <Bar data={totalPost} options={totalPost_options}/>
      </Box>

   {/* 🟨🟨🟨🟨🟨🟨 ROW 2 🟨🟨🟨🟨🟨🟨 */}

   <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}>
            
       <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <b>Facebook users post  </b> </p>
       
          <Line  data={FBuserData} options={FBuser_options}/>
        </Box>

      <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}>
          
        <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <b> Facebook pages post  </b> </p>
       
          <Line  data={FBpageData} options={FBpage_options}/> 
        </Box>
    

 {/* 🟨🟨🟨🟨🟨🟨 ROW 2 🟨🟨🟨🟨🟨🟨 */}      
     <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]} >
          <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <b>Twitter tweet  </b> </p>

         <Line  data={TWuserData}  options={TWuser_options}/>  
        </Box>

   {/* 🟨🟨🟨🟨🟨🟨 ROW 2 🟨🟨🟨🟨🟨🟨 */}
    <Box
       gridColumn="span 6"
       gridRow="span 2"
       backgroundColor={colors.primary[400]} >
        <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <b>Telgram channel post  </b> </p>

           <Bar data={TGchannelData} options={TGchannel_options} />
       </Box>
 
     <Box
        gridColumn="span 6"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}  >
        <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <b>Telgram group post  </b> </p>

           <Bar data={TGgroupData} options={TGcgroup_options} /> 
         </Box>

    {/* 🟨🟨🟨🟨🟨🟨 ROW 2 🟨🟨🟨🟨🟨🟨 */}
     
       <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}>
         <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}>
            <p style={{textAlign:'center', color:colors.greenAccent[400]}}> <b>Sentiment Analysis </b> </p>
            </Typography>
         <Box height="35vh">
          <PieChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;