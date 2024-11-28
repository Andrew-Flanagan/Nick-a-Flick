import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


const HomePage = () => {
  return (
    <Box sx={{ backgroundColor: '#FEE440', color: '#1A1A1D', py: 8, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" gutterBottom fontWeight="bold" fontFamily="Press Start 2P" >
          Welcome to Nick-a-flick
        </Typography>
        <Typography variant="h5" align="center">
          The best movie rental store in town.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button component={Link} to="/search" variant="contained" size="large">
            Browse Movies
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
