import { useState, createContext, useEffect } from 'react';
import './App.css';
import Router from './Router';
import Navbar, { RoleTypes } from './components/Navbar';
import Loader from './components/Loader';
import Footer from './components/Footer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const GeneralContext = createContext();

function App() {
    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);
    const [userRoleType, setUserRoleType] = useState(RoleTypes.none);
    const [mode, setMode] = useState('light');

    const lightTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

    const toggleMode = () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      };

    useEffect(() => {
        fetch(`https://api.shipap.co.il/clients/login`, {
            credentials: 'include',
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(x => {
                    throw new Error(x);
                });
            }
        })
        .then(data => {
            setUser(data);
            setUserRoleType(RoleTypes.user);

            if (data.business) {
                setUserRoleType(RoleTypes.business);
            } else if (data.admin) {
                setUserRoleType(RoleTypes.admin);
            }
        })
        .catch(err => {
            setUserRoleType(RoleTypes.none);
        })
        .finally(() => setLoader(false));
    }, []);

    return (
        
        <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <GeneralContext.Provider value={{ user, setUser, setLoader, userRoleType, setUserRoleType }}>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Router />
          {loader && <Loader />}
          <Footer />
        </GeneralContext.Provider>
      </ThemeProvider>
    );
}

export default App;
