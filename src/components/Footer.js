import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../App';
import { RoleTypes } from './Navbar';
import '../App.css';

export default function Footer({ mode, toggleMode }) {
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;
  const { id } = useParams();
  const [value, setValue] = useState(0); 
  const { user, setUser, setLoader, userRoleType, setUserRoleType, setSearchText } = useContext(GeneralContext);

  const activeColor = {
    "&.Mui-selected": {
        color: '#db8a45',
    }
  };

  useEffect(() => {
    if (path === '/about') {
      setValue(0);
    } else if (path === '/favorite') {
      setValue(1);
    } else if (path === '/my-cards') {
      setValue(2);
    } else {
      setValue(-1); 
    }
  }, [path]);


  if (/^\/landing-page\/\d+$/.test(path)) {
    return null;
  }

  return (
    <>
      <footer className='footer'>
        <Box sx={{ width: '100%' ,
          height:'auto',
          bottom: '0',
          position:'fixed',
        }}>
          <BottomNavigation
            sx={{ backgroundColor: mode === 'dark' ? 'black' : '#ffefd7' }} 
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="About" icon={<InfoIcon />} onClick={()=> navigate('/about')}
              sx={path === '/about' ? activeColor : {}}
            />
            {user &&
              <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={()=> navigate('/favorite')} sx={path === '/favorite' ? activeColor : {}} />
            }
            {(userRoleType === RoleTypes.business || userRoleType === RoleTypes.admin) &&
              <BottomNavigationAction label="My Cards" icon={<AccountCircleIcon />} onClick={()=> navigate('/my-cards')} sx={path === '/my-cards' ? activeColor : {}} />
            }
          </BottomNavigation>
        </Box>
      </footer>
    </>
  );
}
