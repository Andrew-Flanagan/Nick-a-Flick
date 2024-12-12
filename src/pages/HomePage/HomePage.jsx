import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import new_releases from "../../data/new_releases.json";
import '../../styles/fonts.css'
import { ModalProvider } from '../../hooks/useModal';
import { useSpring, animated } from '@react-spring/web';
import nickaflick_logo from "../../assets/images/nickaflick_logo2.PNG";


const HomePage = () => {

  const springs = useSpring({
    from: {x: -1500},
    to: {x: 0},
    config: {duration: 1500},
  });

  return (
    <ModalProvider>
    <Box sx={{paddingBottom: "4rem"}}>
      <Container disableGutters maxWidth={false}>
      <Typography align="center" variant="h2" fontSize="6vmax" fontWeight="bold" sx={{paddingTop: "2rem"}}>
        WELCOME TO
      </Typography>
      <img 
          src={nickaflick_logo}
          alt="Nickaflick Logo"
          style={{display: "block", margin: "auto", width: "30%"}}
        />
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <animated.div
                style={{
                  // width: 80,
                  // height: 80,
                  // background: '#ff6d6d',
                  borderRadius: 8,
                  ...springs,
                }}>
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
        </animated.div>
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
