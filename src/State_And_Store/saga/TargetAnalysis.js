import { call, put, takeLatest } from 'redux-saga/effects';
import { get_Target_Data_Api } from '../../API/TargerAnalysisApi';

export function* get_Target_Data(action){
    const user_name = action.payload.username;
    const year = action.payload.year;
    const month = action.payload.month;
    const access_token = action.payload.access_token;
    const platform = action.payload.platforms;

    const response =  yield call(get_Target_Data_Api, {platform: platform, access_token:access_token, user_name: user_name, year: year, month: month})
    
    const state = response[0];
    const data = response[1];

    // total_tweets

    switch (state) {
        case "SEC_REQUEST_SUCCESS":
            yield put({
                type: "TargetAnalysis/GET_DATA_SUCCESS", 
                payload: {
                    follower: data.follower,
                    data: data.data, 
                    engagement_rate: data.engagement_rate,
                    impression: data.impression,
                    mention_acc: data.mention_acc,

                    avarage_likes: data.avarage_likes,
                    avarage_likes_growth_rate: data.avarage_likes_growth_rate,

                    avrege_replies: data.avrege_replies,
                    avrege_replies_growth_rate: data.avrege_replies_growth_rate,
                    
                    avrege_retweets: data.avrege_retweets,
                    avrege_retweets_growth_rate: data.avrege_retweets_growth_rate,
                    
                    avrege_views:data.avrege_views,
                    avrege_views_growth_rate:data.avrege_views_growth_rate,
                    
                    tweet_wall: data.tweet_wall,

                    tweetGrowth: data.tweetGrowth,
                    likeGrowth: data.likeGrowth,
                    trend_hour: data.trend_hour,

                }
            })
            break;
        case "ERR_BAD_REQUEST":
            yield put({ 
                type: 'TargetAnalysis/GET_DATA_FAILED', 
                payload: {
                    message: "Incorrect credential please try again."
                } 
            })
            break;
               
    }
}


export default function* myTargetAnalysisSagaMiddleware(){
    yield takeLatest('GET_TARGET_DATA', get_Target_Data)
}