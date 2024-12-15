import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import new_releases from "../../data/new_releases.json";
import '../../styles/fonts.css';
import './HomePage.css';
import { ModalProvider } from '../../hooks/useModal';
import nickaflick_logo from "../../assets/images/nickaflick_logo2.PNG";
import staff_picks from "../../data/staff_picks.json";

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
              <div
                className={`tv-buttons ${!state.isClickable ? "disabled" : ""}`}
                onClick={toggleVisibility}
                style={{
                  cursor: state.isClickable ? "pointer" : "not-allowed",
                  opacity: state.isClickable ? 1 : 0.5,
                }}
              />
              {state.visible && <div className="tv-screen" />} {/* Static Effect */}
              {state.showImage && state.currentImage < staff_pick_images.length && (
                <img
                  className="tv-image"
                  src={staff_pick_images[state.currentImage]}
                  alt={`Display ${state.currentImage + 1}`}
                />
              )}
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
              Browse Movies
            </Button>
          </Box>
          <MovieCarousel title="New Releases" data={new_releases} subTitle="New Release" />
        </Container>
      </Box>
    </ModalProvider>
  );
};

export default HomePage;