import axios from "axios";
import authHeader from './AuthHeader';
/* import RootUrl from './ApiRootURL'

const rootUrl = RootUrl.getrootUrl() */
//export const API_URL = process.env.SCRAPER_URL + "facebook/";
const API_URL = "http://172.20.102.64:3001/facebook/";
const LINK_URL = "http://172.20.102.64:3001/scraping/facebook/";
const COMM_URL = "http://172.20.102.64:3001/";
//const API_URL = "http://localhost:3001/facebook/"; common/insights/

class FacebookService {

  getPosts() {
    return API_URL;
  }
  
  LinkRequest() {
    return LINK_URL; 
  }

  getProfilePosts() {
    return axios.get(API_URL + "user/dates", { headers: authHeader() });
  }
  getPagePosts() {
    return axios.get(API_URL + "page/dates", { headers: authHeader() });
  }
 getLinkRequest() {
    return axios.get(LINK_URL + "user/get?type=link", { headers: authHeader() });
   }
 getPageLinkRequest() {
    return axios.get(LINK_URL + "page/get?type=link", { headers: authHeader() });
  }

/*   Thids is all Facbook, Twitter and Telegram common visiualization end points */
  getCommenInsight() {
    return axios.get(COMM_URL + "common/insights", { headers: authHeader() });
  }
  getCommenURL() {
    return COMM_URL;
  }

}

export default new FacebookService();