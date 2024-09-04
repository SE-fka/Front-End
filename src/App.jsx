import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'; 
import { ColorModeContext, useMode } from './styles/theme';
import ScrollToTop from "react-scroll-to-top";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './API/AuthApi'; 
import ProtectedRoute from './API/ProtectedRoute';
import Header from './components/UI/Header/Header';
import Footer from './components/UI/Footer/Footer';
import Login from './common/Login';
import Signup from './common/Signup';
import Home from './common/Home';
import DashboardSerch from './common/Dashboard_Serch';
import Facebook from './pages/facebook/Facebook';
import FacebookPost from './pages/facebook/FacebookPost';
import FacebookSearch from './pages/facebook/SearchResult';
import FBLinkRequest from './pages/facebook/FB_LinkRequest';
import Twitter from './pages/twitter/Twitter';
import TWLinkRequest from './pages/twitter/TW_LinkRequest';
import TwitterTweets from './pages/twitter/TwitterTweet';
import TwitterSearch from './pages/twitter/SearchResult';
import Telegram from './pages/telegram/Telegram';
import TGLinkRequest from './pages/telegram/TG_LinkRequest';
import ChannelPost from './pages/telegram/ChannelPost';
import GroupPost from './pages/telegram/GroupPost';
import TelegramSearch from './pages/telegram/SearchResult';
import YouTube from './pages/youtube/YouTube'; 
import AllVideoPosts from './pages/youtube/AllVideoPosts'; 
import YouTubeComments from './pages/youtube/YouTubeComments';
import YTLinkRequest from './pages/youtube/YT_linkrequest';  
import NotFound from './common/NotFound';
import Sentiment from './sentimentPage/Sentiment'; 
import KeywordSearch from './pages/livesearch/KeywordSearch';
import TargetSearch from './pages/livesearch/TargetSearch';
import ProfilePage from './pages/facebook/ProfilePage';
import ProfileUser from './pages/facebook/ProfileUser';
import TextSummerazion from './sentimentPage/TextSummerazion';

// graph/GrowthGraph' 
import LinkAnalysis from './linkAnalysisPage/graph/ForceGraph'; 
import TimeLineGraph from './TargetAnalysis/graph/TimeLineGraph';
import GrowthGraph from "./TimeLineAnalysis/graph/GrowthGraph";

// Keyword Tools
import EmailPhone from './KeywordTool/EmailPhone';
import PostSearch from './KeywordTool/PostSearch';
import FileType from './KeywordTool/FileType';
import SearchTarget from './KeywordTool/TargetSearch';
import SearchTelegram from './KeywordTool/TelegramSearch';
import LocationSearch from './KeywordTool/LocationSearch';
import FindLocation from './KeywordTool/FindLocation';
import VideoImageSearch from './KeywordTool/VideoImageSearch';


const App = () => {
  const [theme, coloMode] = useMode();
  const currentUser = AuthService.getCurrentUser()

  return (
    <ColorModeContext.Provider value={coloMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
      <div className="app-container">
        {currentUser && <Header />}
        <div className="content">
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/signup" element={<ProtectedRoute element={<Signup />} />} />
          <Route path="/search" element={<ProtectedRoute element={<DashboardSerch />} />} />
          <Route path="/facebook/search/result" element={<ProtectedRoute element={<FacebookSearch />} />} />
          <Route path="/twitter/search/result" element={<ProtectedRoute element={<TwitterSearch />} />} />
          <Route path="/telegram/search/result" element={<ProtectedRoute element={<TelegramSearch />} />} />
          <Route path="/facebook" element={<ProtectedRoute element={<Facebook />} />} />
          <Route path="/fblinkrequest" element={<ProtectedRoute element={<FBLinkRequest />} />} />
          <Route path="/facebookpost" element={<ProtectedRoute element={<FacebookPost />} />} />
          <Route path="/twitter" element={<ProtectedRoute element={<Twitter />} />} />
          <Route path="/twitter/tweets" element={<ProtectedRoute element={<TwitterTweets />} />} />
          <Route path="/twlinkrequest" element={<ProtectedRoute element={<TWLinkRequest />} />} />
          <Route path="/telegram" element={<ProtectedRoute element={<Telegram />} />} />
          <Route path="/tglinkrequest" element={<ProtectedRoute element={<TGLinkRequest />} />} />
          <Route path="/channel/posts" element={<ProtectedRoute element={<ChannelPost />} />} />
          <Route path="/group/posts" element={<ProtectedRoute element={<GroupPost />} />} />
          <Route path="/keywordsearch" element={<ProtectedRoute element={<KeywordSearch />} />} />
          <Route path="/targetsearch" element={<ProtectedRoute element={<TargetSearch />} />} />
          <Route path="/linkanalysis" element={<ProtectedRoute element={<LinkAnalysis />} />} />
          <Route path="/targetanalysis" element={<ProtectedRoute element={<TimeLineGraph />} />} />
          <Route path="/timeseries" element={<ProtectedRoute element={<GrowthGraph />} />} />
          <Route path="/youtube" element={<ProtectedRoute element={<YouTube />} />} />
          <Route path="/allvideos" element={<ProtectedRoute element={<AllVideoPosts />} />} />
          <Route path="/youtube/coment" element={<ProtectedRoute element={<YouTubeComments />} />} />
          <Route path="/ytlinkrequest" element={<ProtectedRoute element={<YTLinkRequest />} />} />
          <Route path="/about/profile" element={<ProtectedRoute element={<ProfileUser />} />} />
          <Route path="/about/page" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/summarization" element={<ProtectedRoute element={<TextSummerazion />} />} />
          <Route path="/sentiment" element={<ProtectedRoute element={<Sentiment />} />} />
          <Route path="/emailsearch" element={<ProtectedRoute element={<EmailPhone />} />} />
          <Route path="/postsearch" element={<ProtectedRoute element={<PostSearch />} />} />
          <Route path="/filesearch" element={<ProtectedRoute element={<FileType />} />} />
          <Route path="/searchtarget" element={<ProtectedRoute element={<SearchTarget />} />} />
          <Route path="/telegramsearch" element={<ProtectedRoute element={<SearchTelegram />} />} />
          <Route path="/locationsearch" element={<ProtectedRoute element={<LocationSearch />} />} />
          <Route path="/findlocation" element={<ProtectedRoute element={<FindLocation />} />} />
          <Route path="/video-imagesearch" element={<ProtectedRoute element={<VideoImageSearch />} />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
        {currentUser && <Footer />}
        <ScrollToTop smooth />
        </div>
      </Router>
    </ThemeProvider>
  </ColorModeContext.Provider>
  );
};

export default App;
