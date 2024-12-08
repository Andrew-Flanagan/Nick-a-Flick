import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getTitle, getGenres, getReleaseDate, getRuntime } from "../../helpers/movieHelpers";
import { useNavigate } from "react-router-dom";
import "./MovieModal.css";
import IMDB_img from "../../assets/images/IMDB_Logo_2016.svg";

const MovieModal = ({ movie, open, onClose }) => {
  const navigate = useNavigate();

  if (!movie) return null;

  const routeChange = (movieTitle) =>{
    let path = `/contact`;
    navigate(path, {state: {movie: movieTitle}});
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="movie-modal">
        <Typography variant="h4" gutterBottom className="movie-modal-h1">
          {getTitle(movie)}
        </Typography>
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${getTitle(movie)} Poster`}
          sx={{ width: "50%", borderRadius: 1, alignContent: "center", display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        <Box sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={onClose}>
            <CloseIcon sx={{ fontSize: 28, color: '#333' }} />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Button className="rent-button" onClick={() => {routeChange(getTitle(movie))}}>Request Rental</Button>
        </Box>
        <Typography variant="body1" mt={2}>
          <strong>Overview:</strong> {movie.overview}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Release Date:</strong> {getReleaseDate(movie)}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Genres:</strong>{" "}
          {getGenres(movie)}
        </Typography>
        {}
        <Typography variant="body1" mt={1}>
          <strong>Runtime:</strong>{" "}
          {getRuntime(movie)}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Rating:</strong> {movie.vote_average} / 10
        </Typography>

        <Box
          component="img"
          src={IMDB_img}
          alt={"IMDB Logo"}
          sx={{ mt: 2, width: "50%", borderRadius: 1, alignContent: "center", display: "block", marginLeft: "auto", marginRight: "auto", cursor: "pointer" }}
          onClick = {() => window.open(`https://www.imdb.com/title/${movie.imdb_id}`, "_blank")}
          />
        
      </Box>
    </Modal>
  );
};

export default MovieModal;
