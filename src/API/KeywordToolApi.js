const API_URL = "http://172.20.102.64:8181/api/";

class KeywordToolService {
  getEmailSearch() {
    return API_URL + "emailsearch";
  }

  getHarvestEmail() {
    return API_URL + "harvestemail";
  }

  getPostSearch() {
    return API_URL + "postsearch";
  }

  getCommentSearch() {
    return API_URL + "post-textsearch";
  }

  getFileSearch() {
    return API_URL + "filesearch";
  }

  getTelegramSearch() {
    return API_URL + "telegramsearch";
  }

  getVideoImageSearch() {
    return API_URL + "videosearch";
  }

  getTargetSearch() {
    return API_URL + "targetsearch";
  }

  getLocationSearch() {
    return API_URL + "locationsearch";
  }

  getFindLocation() {
    return API_URL + "findlocation";
  }

  getDocumentSearch() {
    return API_URL + "documentsearch";
  }
}

const keywordToolService = new KeywordToolService();

export default keywordToolService;