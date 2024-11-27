import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import HomePage from './components/HomePage.jsx';
import SearchPage from './components/SearchPage.jsx';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Navbar */}
        <AppBar position="static">
          <Toolbar>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            <Button component={Link} to="/search" color="inherit">
              Search
            </Button>
            <Button component={Link} to="/contact" color="inherit">
              Contact
            </Button>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
