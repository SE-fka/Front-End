import axios from "axios";
import authHeader from './AuthHeader';


const API_URL = "http://172.20.102.64:3001/telegram/";
const LINK_URL = "http://172.20.102.64:3001/scraping/telegram/";


class TelegramService {

  getChannelPost() {
    return API_URL;
  }
  getGroupPost() {
    return API_URL;
  }

  getUsers() {
        return axios.get(API_URL + "channel/all-scraped", { headers: authHeader() });
      }

  getGroups() {
        return axios.get(API_URL + "group/all-scraped", { headers: authHeader() });
      }
      
   getLinkRequest() {
        return axios.get(LINK_URL + "get", { headers: authHeader() });
      }
   getGroupLinkRequest() {
        return axios.get(LINK_URL + "get",  { headers: authHeader() });
      } 
      
   LinkRequest() {
        return LINK_URL; 
      }
 
}

export default new TelegramService();