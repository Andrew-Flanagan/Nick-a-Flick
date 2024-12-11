import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import new_releases from "../../data/new_releases.json";
import '../../styles/fonts.css'
import { ModalProvider } from '../../hooks/useModal';


const HomePage = () => {

  return (
    <ModalProvider>
    <Box sx={{paddingBottom: "4rem"}}>
      <Container disableGutters maxWidth={false}>
      <Typography align="center" variant="h2" fontSize="6vmax" fontWeight="bold" sx={{paddingTop: "8rem"}}>
        WELCOME TO
      </Typography>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography
          align="center"
          variant="h2"
          fontSize={"clamp(4.09rem, 7.9vmax, 7.2rem)"}
          fontFamily="MovieTimes"
          sx={{
            wordWrap: "break-word",
            display: "block",
          }}
        >
          .NICK.A.FLICK.
        </Typography>
      </Box>
        {/* Press Start 2P */}
        <Typography variant="h5" align="center" fontFamily={"cursive"} fontWeight={"bold"} fontStyle={"italic"}>
          The best movie rental store in town.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, paddingBottom: "0rem" }}>
          <Button component={Link} to="/search" variant="contained" size="large">
            Browse Movies
          </Button>
        </Box>
      <MovieCarousel title="New Releases"  data={new_releases} subTitle="New Release"/>
      </Container>
    </Box>
    </ModalProvider>

  );
};

export default HomePage;
