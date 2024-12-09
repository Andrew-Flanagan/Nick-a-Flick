import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieScroller from '../../components/MovieScroller/MovieScroller';
import new_releases from "../../data/new_releases.json";

const HomePage = () => {

  return (
    <Box sx={{paddingBottom: "4rem"}}>
      <Container disableGutters maxWidth={false}>
        <Typography variant="h2" align="center" gutterBottom fontWeight="bold" fontFamily="Press Start 2P" sx={{paddingTop: "4rem"}} >
          Welcome to Nick-a-flick
        </Typography>
        <Typography variant="h5" align="center">
          The best movie rental store in town.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, paddingBottom: "4rem" }}>
          <Button component={Link} to="/search" variant="contained" size="large">
            Browse Movies
          </Button>
        </Box>
      <MovieScroller title="New Releases"  data={new_releases} subTitle="New Release"/>
      </Container>
    </Box>
  );
};

export default HomePage;
