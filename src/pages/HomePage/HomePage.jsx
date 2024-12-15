import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import new_releases from "../../data/new_releases.json";
import '../../styles/fonts.css'
import './HomePage.css';
import { ModalProvider } from '../../hooks/useModal';
import { useSpring, animated } from '@react-spring/web';
import nickaflick_logo from "../../assets/images/nickaflick_logo2.PNG";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'



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
      <Typography align="center" variant="h2" fontSize="12vmax" fontWeight="bold" fontFamily="Marquee-Moon" className="test">
        WELCOME TO
      </Typography>
      {/* <Parallax pages={2} style={{ top: '0', left: '0' }}>
      <ParallaxLayer offset={4} speed={2.5}> */}

      <img 
          className="logo"
          src={nickaflick_logo}
          alt="Nickaflick Logo"
          style={{}}
        />
              {/* </ParallaxLayer>
    </Parallax> */}

      {/* <Box sx={{ width: "100%", textAlign: "center" }}> */}
        {/* <animated.div
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
        </animated.div> */}
      {/* </Box> */}
        {/* Press Start 2P */}
        <Typography variant="h5" align="center" fontFamily={"cursive"} fontWeight={"bold"} fontStyle={"italic"}>
          The best movie rental store in town.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, paddingBottom: "0rem" }}>
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
