import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from '../Link/Link';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../../../styles/theme";
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
import { Dropdown} from 'react-bootstrap';
import AuthService from '../../../API/AuthApi';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const imagestyele={cursor: "pointer", borderRadius: "50%"}
  let naigate = useNavigate ();
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const dropdownRefs = useRef({}); // Object to hold refs for each dropdown
  const [navClass, setNavClass] = useState('');
  const [toggeledNav, settoggeledNav] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleClickOutside = (event) => {
    // Check if the click is outside of any dropdown
    const isOutside = Object.values(dropdownRefs.current).every(ref => ref && !ref.contains(event.target));
    if (isOutside) {
      setOpenDropdown(null);
    }
  };

  const toggleNav = () => {
    settoggeledNav(!toggeledNav);
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    const handleScroll = () => {
      window.addEventListener('scroll', () => {
        let navClass = '';
        if (window.scrollY >= 200) {
          navClass = 'scrolled';
        }
        setNavClass(navClass);
      });
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const currentUser = AuthService.getCurrentUser()
  const handleLogout = () => {
    AuthService.logout();
    naigate('/signin');
  };


  return (
    <nav className={`navbar navbar-expand-md bg-light ${navClass}`}>
      <Link target='/'>
       <img 
        alt="logo"
        width="50px"
        height="50px"
        src={'../../../image/logo.png'}
        style={imagestyele} />
       </Link>
      <div className='container'>
      <div
          className={`navbar-toggler nav-icon ${(() => {
            if (toggeledNav) return 'open';
            return '';
          })()}`}
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </div>
   
        <div className={`collapse navbar-collapse ${toggeledNav ? 'show' : ''}`}>
          <ul className='navbar-nav lg-auto'>
            <li className='nav-item' style={{ whiteSpace: 'nowrap', paddingLeft:"5%" }}>  
              <Link target='/' offset={-120} classes='nav-link'>Home</Link>
            </li>
            {['scraper', 'keyword search', 'analysis'].map((dropdown) => (
              <li className='nav-item dropdown' style={{ position: 'relative', paddingLeft:"5%" }} key={dropdown} ref={el => dropdownRefs.current[dropdown] = el}>
                <button 
                  onClick={() => toggleDropdown(dropdown)} 
                  className='nav-link dropdown-toggle' 
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}
                >
                  {dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}
                </button>
                {openDropdown === dropdown && (
                  <div className='dropdown-menu' style={{ position: 'absolute', zIndex: 1000, display: 'flex' }}>
                    <div style={{ flex: 1, paddingRight: '10px' }}>
                      <hr />
                      {dropdown === 'scraper' && (
                        <>
                          <Link target='/facebook' classes='dropdown-item'> <FacebookIcon /> Facebook Scraper Tool </Link>
                          <hr />
                          <Link target='/twitter' classes='dropdown-item'> <ClearIcon /> Twitter Scraper Tool </Link>
                          <hr />
                          <Link target='/telegram' classes='dropdown-item'> <TelegramIcon /> Telegram Scraper Tool </Link>
                          <hr />
                          <Link target='/youtube' classes='dropdown-item'> <YouTubeIcon /> You Tube Scraper Tool </Link>
                        </>
                      )}
                      {dropdown === 'keyword search' && (
                        <>
                          <Link target='/keywordsearch' classes='dropdown-item'> <SearchIcon /> Keyword Live Search </Link>
                          <hr />
                          <Link target='/targetsearch' classes='dropdown-item'> <PersonSearchIcon /> Target Live Search </Link>
                          <hr />
                          <Link target='/emailsearch' classes='dropdown-item'> <EmailIcon /> Email and Phone Search </Link>
                          <hr />
                          <Link target='/postsearch' classes='dropdown-item'> <SearchIcon /> Post Text and URL Search </Link>
                          <hr />
                          <Link target='/filesearch' classes='dropdown-item'> <InsertDriveFileIcon /> Document Search in File Type </Link>
                          <hr />
                          <Link target='/searchtarget' classes='dropdown-item'> <PersonSearchIcon /> Target and Location Search </Link>
                          <hr />
                          <Link target='/telegramsearch' classes='dropdown-item'> <TelegramIcon /> Telegram Search </Link>
                          <hr />
                          <Link target='/video-imagesearch' classes='dropdown-item'> <VideocamIcon /> Video and Image Search </Link>
                        </>
                       )}
                       {dropdown === 'analysis' && (
                        <>
                          <Link target='/linkanalysis' classes='dropdown-item'> <ShareIcon /> Link Analysis </Link>
                          <hr />
                          <Link target='/timeseries' classes='dropdown-item'> <RttIcon /> Time Series </Link>
                          <hr />
                          <Link target='/targetanalysis' classes='dropdown-item'> <TroubleshootIcon /> Target Analysis </Link>
                          <hr />
                          <Link target='/sentiment' classes='dropdown-item'> <SavedSearchIcon /> Sentiment Analysis </Link>
                         <hr />
                         <Link target='/summarization' classes='dropdown-item'> <SubjectIcon /> Text Summarization </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon style={{ color: "767677" }} />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      &nbsp;&nbsp;
    <Dropdown>
    <Dropdown.Toggle variant=" primary" id="dropdown-basic"> 
    <IconButton>
    <PersonOutlinedIcon /> 
    {currentUser.username} 
    </IconButton>
    </Dropdown.Toggle> 
    <Dropdown.Menu> 
    <Link target='/signup' classes='dropdown-item'> <ManageAccountsOutlinedIcon /> &nbsp;&nbsp;  User Create </Link>
    <hr />
    <Dropdown.Item onClick={handleLogout}>&nbsp;&nbsp; <LogoutIcon /> &nbsp;&nbsp; Signout</Dropdown.Item>  
    </Dropdown.Menu>  
     </Dropdown> 
    </nav>
  );
};

export default Nav;
