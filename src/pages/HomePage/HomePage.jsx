import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieScroller from '../../components/MovieScroller/MovieScroller';
import new_releases from "../../data/new_releases.json";
import '../../styles/fonts.css'


const HomePage = () => {

  return (
    <Box sx={{paddingBottom: "4rem"}}>
      <Container disableGutters maxWidth={false}>
      <Typography
        variant="h2"
        align="center"
        fontSize="6rem"
        sx={{ paddingTop: "8rem" }}
      >
        <span style={{ fontFamily: "Press Start 2P", fontWeight: "bold"}}>WELCOME TO </span>
        <br />
        <span style={{ fontFamily: "MovieTimes" }}>.NICK.A.FLICK.</span>
      </Typography>

        {/* Press Start 2P */}
        <Typography variant="h5" align="center" fontFamily={"cursive"} fontWeight={"bold"} fontStyle={"italic"}>
          The best movie rental store in town.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, paddingBottom: "0rem" }}>
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
