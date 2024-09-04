
import DashboardIcon from '@mui/icons-material/Dashboard';
import FacebookIcon from '@mui/icons-material/Facebook';
import ClearIcon from '@mui/icons-material/Clear';
import TelegramIcon from '@mui/icons-material/Telegram';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ShareIcon from '@mui/icons-material/Share';
import SubjectIcon from '@mui/icons-material/Subject';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import RttIcon from '@mui/icons-material/Rtt';
import EmailIcon from '@mui/icons-material/Email';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VideocamIcon from '@mui/icons-material/Videocam';


export const sidebarMenu = [
    {
        title: 'Dashboard',
        icon: DashboardIcon,
        path: '/',
    },
    {
        title: 'Keyword Search',
        icon: SearchIcon,
        path: '/keywordsearch',
    },
    {
        title: 'Target Search',
        icon: PersonSearchIcon,
        path: '/targetsearch',
    },
    {
        title: 'Scraper',
        tag: 'divider'
    },
    {
        title: 'Facebook',
        icon: FacebookIcon,
        path: '/facebook',
    },
    {
        title: 'Twitter',
        icon: ClearIcon,
        path: '/twitter',
    },
    {
        title: 'Telegram',
        icon: TelegramIcon,
        path: '/telegram',
    },
    {
        title: 'You Tube',
        icon: YouTubeIcon,
        path: '/youtube'
    },
    {
        title: 'Analysis',
        tag: 'divider'
    },
    {
        title: 'Link Analysis',
        icon: ShareIcon,
        path: '/linkanalysis',
    },
    {
        title: 'Time Series',
        icon: RttIcon,
        path: '/timeseries',
    },
    {
        title: 'Target Analysis',
        icon: TroubleshootIcon,
        path: '/targetanalysis',
    },
    {
        title: 'Sentiment',
        tag: 'divider'
    },
    {
        title: 'Sentiment Analysis',
        icon: SavedSearchIcon,
        path: '/sentiment',
    },
    {
        title: 'Text Summarization',
        icon: SubjectIcon,
        path: '/summarization',
    },
    {
        title: 'Keyword Search',
        tag: 'divider'
    },
    {
        title: 'Email Search',
        icon: EmailIcon,
        path: '/emailsearch',
    },
    {
        title: 'Post Search',
        icon: SearchIcon,
        path: '/postsearch',
    },
    {
        title: 'File Type',
        icon: InsertDriveFileIcon,
        path: '/filesearch',
    },
    {
        title: 'Target Search',
        icon: PersonSearchIcon,
        path: '/searchtarget',
    },
    {
        title: 'Telegram Search',
        icon: TelegramIcon,
        path: '/telegramsearch',
    },
    {
        title: 'Video & Image',
        icon: VideocamIcon,
        path: '/video-imagesearch',
    },
    {
        title: 'Account',
        tag: 'divider'
    },
    {
       title: 'User Create',
       icon: ManageAccountsOutlinedIcon,
       path: '/signup',
    },
    

]