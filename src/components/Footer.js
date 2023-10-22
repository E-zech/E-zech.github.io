import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';
import { RoleTypes } from './Navbar';

export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const { user, setUser, setLoader, userRoleType, setUserRoleType, setSearchText } = useContext(GeneralContext);


  return (
    <Box sx={{ width: '100%' ,
    bottom: '0'
    }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="About" icon={<InfoIcon />} onClick={()=> navigate('/about')}/>
        {
          user &&
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} onClick={()=> navigate('/favorite')}/>
        } {
          (userRoleType === RoleTypes.business || userRoleType === RoleTypes.admin) &&
           <BottomNavigationAction label="My Cards" icon={<AccountCircleIcon />} onClick={()=> navigate('/my-cards')}/>
        }
      
      </BottomNavigation>
    </Box>
  );
}
