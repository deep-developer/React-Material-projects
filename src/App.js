import storage from './storage';
import { Provider } from 'react-redux';

import {
  BrowserRouter as MyRouter,
  Routes,
  Route
} from 'react-router-dom';

import 'material-icons/iconfont/material-icons.css';

import {
  ThemeProvider,
  createTheme
} from "@mui/material";

import { 
  deepPurple,
  teal,
  pink,
  deepOrange,
  lightBlue,
  cyan
} from '@mui/material/colors';

import Login from './cmp/Login/Login';
import Signup from './cmp/Signup/Signup';
import Admin from './cmp/Admin/Admin';
import Dashboard from './cmp/Admin/Dashboard/Dashboard'
import NotFound from './cmp/NotFound/NotFound';
import "@fontsource/poppins/500.css";

const App = ()=>{
  const Theme = createTheme({
    palette: {
      primary: deepPurple,
      secondary: teal,
      error: pink,
      warning: deepOrange,
      success: cyan,
      info: lightBlue
    },
    typography: {
      fontFamily: "Poppins"
    }
  });
  const design = (
    <>    
    <Provider store={storage}>
      <ThemeProvider theme={Theme}>
          <MyRouter>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="admin" element={<Admin />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MyRouter>
      </ThemeProvider>
    </Provider>
    </>
  );
  return design;
}

export default App;