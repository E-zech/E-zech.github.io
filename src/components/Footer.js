import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from 'react';
import { useNavigate, useParams, useResolvedPath } from 'react-router-dom';
import { GeneralContext } from '../App';
import { RoleTypes } from './Navbar';



export default function Footer() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const path = useResolvedPath().pathname;
  const { id } = useParams();

  const { user, setUser, setLoader, userRoleType, setUserRoleType, setSearchText } = useContext(GeneralContext);

  if (/^\/landing-page\/\d+$/.test(path)) {
    return null;
 }
  return (
    <>
 
      <Box sx={{ width: '100%' ,
    height:'auto',
    bottom: '0',
    position:'fixed',
    }}>
      <BottomNavigation
      sx={{ backgroundColor:'#edf2fb'}}
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
  
    </>
    
  );
}
