import { createSlice } from "@reduxjs/toolkit";

function getDate(){
    const date = new Date();
    const time = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
    return time
}

function getTime(){
    const date = new Date();
    const hour = date.getHours()+':'+date.getMinutes()
    return hour 
}

const initialState = {
    name: "Untitled investigation",
    date: getDate(),
    time: getTime(),
    userName: "",
    year: 0,
    month: 0,
    post:[],
    follower:0,
    like:[],
    view:[],
    retweet:[],
    reply:[],
    engagement_rate:0,
    mention_acc:"",
    like_avg_cal:0,
    avarage_likes_growth_rate:0,
    replies_avg_cal:0,
    avrege_replies_growth_rate:0,
    retweets_avg_cal:0,
    avrege_retweets_growth_rate:0,
    views_avg_cal:0,
    impressions_cal:0,
    tweet_wall: [],

    tweetGrowth: [],
    likeGrowth: [],
    trend_hour: [],
}

export const TargetAnalysisSlice = createSlice({
    name: 'TargetAnalysis',
    initialState,
    reducers: {
        GET_DATA_SUCCESS:(state, action)=>{
            const response_data = action.payload.data;
            const follower = action.payload.follower;
            
            let post = []
            let like = []
            let view = []
            let retweet = []
            let reply = []
            
            
            response_data.forEach(element => {
                post.push({name: element[0], value: element[1].post})
                like.push(element[1].likes)
                view.push(element[1].views)
                retweet.push(element[1].retweets)
                reply.push(element[1].replies)
            });

            state.follower = follower;
            state.post = post;
            state.like = like;
            state.view = view;
            state.retweet = retweet;
            state.reply = reply;
            
            state.engagement_rate=Math.round(action.payload.engagement_rate*1000)/1000;
           // state.mention_acc=Math.round(action.payload.mention_acc*1000)/1000;
            // state.mensstion_acc=Math.round(action.payload.mentssion_acc*1000)/1000;
            
            state.like_avg_cal=Math.round(action.payload.avarage_likes*1000)/1000;
            state.avarage_likes_growth_rate = Math.round(action.payload.avarage_likes_growth_rate*1000)/1000;
            
            state.replies_avg_cal=Math.round(action.payload.avrege_replies*1000)/1000;
            state.avrege_replies_growth_rate=Math.round(action.payload.avrege_replies_growth_rate*1000)/1000;

            state.retweets_avg_cal=Math.round(action.payload.avrege_retweets*1000)/1000;
            state.avrege_retweets_growth_rate=Math.round(action.payload.avrege_retweets_growth_rate*1000)/1000;
            
            state.views_avg_cal=Math.round(action.payload.avrege_views*1000)/1000;
            state.avrege_views_growth_rate=Math.round(action.payload.avrege_views_growth_rate*1000)/1000;
            
            state.impressions_cal=Math.round(action.payload.impression*1000)/1000;
            state.tweet_wall = action.payload.tweet_wall;
            
            state.mention_acc = action.payload.mention_acc;
            state.tweetGrowth = action.payload.tweetGrowth;
            state.likeGrowth = action.payload.likeGrowth;
            state.trend_hour = action.payload.trend_hour;

        },
        GET_DATA_FAILED:(state, action)=>{
            console.log("GET_DATA_FAILED")
        },
        SET_YEAR:(state, action)=>{
            state.year = action.payload.year;
        },
        SET_MONTH:(state, action)=>{
            state.month = action.payload.month; 
        },
        SET_USER_NAME:(state, action)=>{
            state.userName = action.payload.username;
        },
    },
})

export default TargetAnalysisSlice.reducer;