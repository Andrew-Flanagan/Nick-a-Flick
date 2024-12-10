import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getTitle, getGenres, getReleaseDate, getRuntime } from "../../helpers/movieHelpers";
import { useNavigate } from "react-router-dom";
import "./MovieModal.css";
import IMDB_img from "../../assets/images/IMDB_Logo_2016.svg";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";

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
        <MovieBackdrop media={movie} handleOpen={() => {}} gradient={true}/>
        </Box>
        <Box sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={onClose}>
            <CloseIcon className="close-button" />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Button className="rent-button" onClick={() => {routeChange(getTitle(movie))}}>Request Rental</Button>
        </Box>
        <Box className="modal-content">
        <Typography variant="body1" mt={2}>
          <strong>Overview:</strong> {movie.overview}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Release Date:</strong> {getReleaseDate(movie)}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Genres:</strong>{" "}
          {formatGenres(getGenres(movie), movie)}
        </Typography>
        {}
        <Typography variant="body1" mt={1}>
          <strong>Runtime:</strong>{" "}
          {getRuntime(movie) + " minutes"}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Rating:</strong> {movie.vote_average} / 10
        </Typography>

        <Box
          component="img"
          src={IMDB_img}
          alt={"IMDB Logo"}
          className="imdb-logo"
          onClick = {() => window.open(`https://www.imdb.com/title/${movie.imdb_id}`, "_blank")}
          />
      </Box>
      </Box>
    </Modal>
  );
};

export default MovieModal;
