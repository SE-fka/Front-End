import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = "http://172.20.102.64:3001/youtube/";
const LINK_URL = "http://172.20.102.64:3001/scraping/youtube/";
const COMM_URL = "http://172.20.102.64:3001/common/";

class YoutubeService {

getCommonURL() {
    return COMM_URL;
  }

 getComments() {
    return API_URL;
  }
  
  getChannel() {
        return axios.get(API_URL + "all-videos", { headers: authHeader() });
      }
     
   getLinkRequest() {
        return axios.get(LINK_URL + "get?type=link", { headers: authHeader()});
      }

  LinkRequest() {
      return LINK_URL; 
    }
         
}

export default new YoutubeService();