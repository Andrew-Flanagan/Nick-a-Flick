import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, ThemeProvider } from "@mui/material";
import HomePage from './pages/HomePage/HomePage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import theme from './styles/theme.js';
import './App.css';
import { ModalProvider } from './hooks/useModal.jsx';

function App() {
  return (

    <ThemeProvider theme={theme}>
      <ModalProvider>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: theme.palette.background.default}}>
          {/* Navbar */}
          <AppBar position="static" sx={{height: "64px"}}>
            <Toolbar>
              <Button id="home-button" component={Link} to="/" color="inherit" className="Button">
                Home
              </Button>
              <Button id="search-button" component={Link} to="/search" color="inherit" className="Button">
                Search
              </Button>
              <Button id="contact-button" component={Link} to="/contact" color="inherit" className="Button">
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
      </ModalProvider>

    </ThemeProvider>
  );
}

export default App;
