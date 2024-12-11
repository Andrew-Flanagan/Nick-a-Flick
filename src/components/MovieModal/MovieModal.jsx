import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getTitle, getGenres, getReleaseDate, getRuntime } from "../../helpers/movieHelpers";
import { useNavigate } from "react-router-dom";
import "./MovieModal.css";
import IMDB_logo from "../../assets/images/IMDB_Logo_2016.svg";
// import TMDB_logo from "../../assets/images/Tmdb_logo.svg";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import StarIcon from '@mui/icons-material/Star';
import theme from "../../styles/theme";
import data from "../../data/all_data.json";
import MovieGrid from "../MovieGrid/MovieGrid";
// import { useMemo } from "react";
import Fade from '@mui/material/Fade';


const MovieModal = ({ movie, open, onClose }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const routeChange = (movieTitle) =>{
    let path = `/contact`;
    navigate(path, {state: {movie: movieTitle}});
  }

  const formatGenres = (genres, media) => {
    const appendTV = media.name ? ", TV Series" : ""
    return genres + appendTV;
  }


  return (
    <Modal
      open={open} 
      onClose={onClose}
      closeAfterTransition
     
       // Ensure onClose is only called after the fade is complete
      >
    <Fade in={open} timeout={500} onExited={onClose}>
      <Box className="movie-modal">
        <MovieBackdrop media={movie} gradient={theme.palette.primary.secondary}/>
        <Box sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={onClose}>
            <CloseIcon className="close-button" />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Button color="secondary" variant="contained" className="rent-button" onClick={() => {routeChange(getTitle(movie))}}>Request Rental</Button>
        </Box>
        <Box className="modal-content">
          <Typography>
            <span className="content-title">Overview:</span> {movie.overview}
          </Typography>
          <Box className="inner-modal-content">
            <Typography>
              <span className="content-title">Release Date:</span> {getReleaseDate(movie)}
            </Typography>
            <Typography>
              <span className="content-title">Genres:</span>{" "}
              {formatGenres(getGenres(movie), movie)}
            </Typography>
            <Typography>
              <span className="content-title">Runtime:</span>{" "}
              {getRuntime(movie) + " minutes"}
            </Typography>
            <Typography>
              <span style={{display: "flex"}}>
                <span className="content-title">Rating:</span>
                <StarIcon color="secondary" />
                {movie.vote_average.toFixed(1)}
              </span>
            </Typography>
            <Box display="flex">
              <Box
                component="img"
                src={IMDB_logo}
                alt={"IMDB Logo"}
                className="imdb-logo"
                onClick = {() => window.open(`https://www.imdb.com/title/${movie.imdb_id}`, "_blank")}
              />
              {/* <Box
                component="img"
                src={TMDB_logo}
                alt={"TMDB Logo"}
                className="imdb-logo"
                onClick = {() => window.open(`https://www.themoviedb.org/${movie.title ? "movie" : "tv"}/${movie.id}`, "_blank")}
              /> */}
            </Box>
          </Box>
      </Box>
          {movie.belongs_to_collection && (
            <Box sx={{paddingBottom: 4, paddingRight: 4, paddingLeft: 4}}>
              <Typography align="center">
                Nick A Flick films in the {movie.belongs_to_collection.name}
              </Typography> 
              <MovieGrid
                media={
                  data
                  .filter((m) => m.belongs_to_collection && m.belongs_to_collection.id === movie.belongs_to_collection.id)
                  .sort((a, b) => new Date(a.release_date) - new Date(b.release_date))}
              />
            </Box>
          )}
      </Box>
      </Fade>
    </Modal>
  );
};

export default MovieModal;
