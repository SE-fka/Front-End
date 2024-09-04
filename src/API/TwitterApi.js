import axios from "axios";
import authHeader from './AuthHeader';

const API_URL = "http://172.20.102.64:3001/twitter/";
const LINK_URL = "http://172.20.102.64:3001/scraping/twitter/";


class TelegramService {

  getTweets() {
    return API_URL;
  }
  getUsers() {
        return axios.get(API_URL + "all-users", { headers: authHeader() });
      }
      
    getKeyword() {
        return axios.get(API_URL + "search?q=", { headers: authHeader() });
      }
    getLinkRequest() {
        return axios.get(LINK_URL + "get?type=username", { headers: authHeader()});
      }

    LinkRequest() {
        return LINK_URL; 
      }
        
}

export default new TelegramService();