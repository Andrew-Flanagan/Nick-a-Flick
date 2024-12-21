import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ModalProvider } from '../../hooks/useModal';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';

import new_releases from "../../data/new_releases.json";
import staff_picks from "../../data/staff_picks.json";

import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import nickaflick_logo from "../../assets/images/nickaflick_logo2.PNG";

import theme from '../../styles/theme';
import './HomePage.css';
import '../../styles/fonts.css';

const staff_pick_images = staff_picks.map((movie) => {
  movie.image = `https://image.tmdb.org/t/p/w200${movie.backdrop_path}`;
  return movie.image;
}, []);

const HomePage = () => {
  const [state, setState] = useState({
    visible: false,
    currentImage: 0,
    showImage: false,
    isClickable: true,
  });

  const toggleVisibility = () => {
    if (!state.isClickable) return;

    setState((prevState) => ({
      ...prevState,
      visible: true,
      showImage: false,
      isClickable: false,
    }));

    setTimeout(() => {
      const nextImage =
        state.currentImage < staff_pick_images.length
          ? state.currentImage + 1
          : 0; 

      setState({
        visible: false,
        showImage: nextImage < staff_pick_images.length,
        currentImage: nextImage, 
        isClickable: true, 
      });
    }, 1000); 
  };

  return (
    <ModalProvider>
      <Box sx={{ paddingBottom: "4rem" }}>
        <Container disableGutters maxWidth={false}>
          <Box sx={{height: "100vh", alignItems: "center"}}>
          <Typography
            align="center"
            variant="h2"
            fontSize="12vmax"
            fontWeight="bold"
            fontFamily="Marquee-Moon"
            className="test"
          >
            WELCOME TO
          </Typography>

          <div className="logo-container">
            <img
              className="logo"
              src={nickaflick_logo}
              alt="Nickaflick Logo"
            />
            <div className="tv-container">
              <div className="tv-frame" >
                <div
                  className={`tv-buttons ${!state.isClickable ? "disabled" : ""}`}
                  onClick={toggleVisibility}
                  style={{
                    cursor: state.isClickable ? "pointer" : "not-allowed",
                    opacity: state.isClickable ? 1 : 0.5,
                  }}
                />
                <div className="screen-frame">
                {state.visible && <div className="tv-screen" />}
                {state.showImage && state.currentImage < staff_pick_images.length && (
                  <>
                    <img
                      className="tv-image wobblex scanlines"
                      src={staff_pick_images[state.currentImage]}
                      alt={`Display ${state.currentImage + 1}`}
                    />
                    <div className="tv-effect"/>
                    </>
                )}
                  </div>
            </div>
            </div>
          </div>

          <Typography
            variant="h5"
            align="center"
            fontFamily={"cursive"}
            fontWeight={"bold"}
            fontStyle={"italic"}
          >
            The best movie rental store in town.
          </Typography>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', mt: 1, paddingBottom: "0rem" }}
          >
            <Button component={Link} to="/search" variant="contained" size="large">
              Browse Selection
            </Button>
          </Box>
          </Box>
          <Box className="features-box">
            <div className="features">
              <div className="icon-box">
                <MeetingRoomIcon sx={{ fontSize: 125, color: theme.palette.secondary.main }} />
                <Typography variant="h4" align="center" fontWeight="bold" className="feature-title">
                  Open 24/7
                </Typography>
                <Typography variant="body" align="center" fontWeight="bold" sx={{display: "flex", color: "#8f8f8f"}}>
                  Stop by any time of the day! The door is always open!
                </Typography>
              </div>
              <div className="icon-box">
                <LocalMoviesIcon sx={{ fontSize: 125, color: theme.palette.secondary.main }} />
                <Typography variant="h4" align="center" fontWeight="bold" className="feature-title">
                  1100+ Titles
                </Typography>
                <Typography variant="body" align="center" fontWeight="bold" sx={{display: "flex", color: "#8f8f8f"}}>
                  We have a wide selection of new releases and old classics!
                </Typography>
              </div>
              <div className="icon-box">
                <FastfoodIcon sx={{ fontSize: 125, color: theme.palette.secondary.main }} />
                <Typography variant="h4" align="center" fontWeight="bold" className="feature-title">
                  Snacks
                </Typography>
                <Typography variant="body" align="center" fontWeight="bold" sx={{display: "flex", color: "#8f8f8f"}}>
                  Enjoy some popcorn and soda while watching your movie!
                </Typography>
              </div>
            </div>
          </Box>
          <MovieCarousel data={new_releases} subTitle="New Release" />
          <Button component={Link} to="/search" variant="contained" size="large" sx={{display: "flex", margin: "auto", width: "30%", marginTop: "2rem"}}>
              Browse Selection
          </Button>
        </Container>
      </Box>
    </ModalProvider>
  );
};

export default HomePage;