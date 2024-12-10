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
    <Modal open={open} onClose={onClose}>
      <Box className="movie-modal">
        <Box sx={{background: "linear-gradient(0deg,#181818,transparent 50%)" }}>
        <MovieBackdrop media={movie} handleOpen={() => {}} gradient={theme.palette.primary.secondary}/>
        </Box>
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
      </Box>
    </Modal>
  );
};

export default MovieModal;
