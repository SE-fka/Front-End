import React, { useState, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';
import { Box, Card } from "@mui/material";
import axios from "axios";
import authHeader from '../../API/AuthHeader';

import API from '../../API/TwitterApi';

const url = API.getTweets();


const TwitterTweet = () => {
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '3%', justifyContent: 'center'}
  const imagestyle={height: '20px',width: '20px', opacity: .8} 

  const [data, setData] = useState({ columns: [], rows: [] }); 

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const doc_id = query.get('doc-id')
    axios.get(url + `tweets/${doc_id}`, { headers: authHeader() })
      .then(response => {
        const tweets = response.data.tweets;
        const columns = [
          {
          label: '#',
          field: 'index',
          sort: 'asc'
          },
          {
            label: "Image Content",
            field: "image_link",
            sort: "asc",
            width: 50,
             },
          {
          label: "Tweet Content",
          field: "tweet",
          sort: "asc",
          width: 50,
           },
         {
          label: "Replies",
          field: "replies_count",
          sort: "asc",
          width: 50,
        },
        {
          label: "Reteweets",
          field: "retweets_count",
          sort: "asc",
          width: 50,
        },
        {
          label: "Likes",
          field: "likes_count",
          sort: "asc",
          width: 50,
        },
        {
          label: "Views",
          field: "views_count",
          sort: "asc",
          width: 50,
        },
        {
          label: "Hashtags",
          field: "hashtags", 
          sort: "asc",
          width: 50,
        },
        {
         label: 'Actions',
         field: "action",
         width: 10
         },
        ];
        
        const rows = tweets.map((tweet, index) => ({
          index: index + 1,
          image_link: tweet.image_link.split(',').map((image, index) => (
            <img key={index} src={image.trim()} alt="" style={{ width: '100%' }} />
          )),
         /*  image_link: <img src={JSON.parse(tweet.image_link)} alt="" style={{width:'100%'}}/>, */
          tweet: tweet.tweet,
          replies_count: tweet.replies_count,
          retweets_count: tweet.retweets_count,
          likes_count: tweet.likes_count,
          views_count: tweet.views_count,
          hashtags: <>
          <a href={tweet.hashtags}  target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}> </a> 
          </>,
          /* hashtags:  JSON.parse(tweet.hashtags).map( function(item) {
            return <a target="?" href={"https://twitter.com/hashtag/"+item.substring(1)}> {JSON.parse(tweet.hashtags)} </a>
       }), */
          action: <>
          <a href={tweet.tweet_link}  target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>View on Twitter </a> 
          </>,
        }));
        setData({ columns, rows });
      })
      .catch(error => console.log('error', error));
  }, []);


  return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/twitter.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Twitter Tweets</h4>
   </Card>
    </div>
    </div>
    <div className="row" style={divstyle}>
    <div className="col-sm-11">  
    <MDBDataTable
       style={{backgroundColor:'white', fontSize:'16px' }}
        noBottomColumns={true}
          striped
          bordered
          lagrge
          data={data} 
        />
  </div>
  </div>
   <br />
  </div>
  </Box>
  )
}

export default TwitterTweet