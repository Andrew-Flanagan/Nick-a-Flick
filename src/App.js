import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, ThemeProvider } from "@mui/material";
import HomePage from './pages/HomePage/HomePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import theme from './styles/theme.js';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: theme.palette.background.default}}>
          {/* Navbar */}
          <AppBar position="static" sx={{height: "64px"}}>
            <Toolbar>
              <Button component={Link} to="/" color="inherit" className="Button">
                Home
              </Button>
              <Button component={Link} to="/search" color="inherit" className="Button">
                Search
              </Button>
              <Button component={Link} to="/contact" color="inherit" className="Button">
                Contact
              </Button>
            </Toolbar>
          </AppBar>
    
          {/* Content Area */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
