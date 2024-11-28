import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import genres from "../../data/genres.json";
import CloseIcon from '@mui/icons-material/Close';
import "./MovieModal.css";

const MovieModal = ({ movie, open, onClose }) => {
  if (!movie) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="movie-modal">
        <Typography variant="h4" gutterBottom className="movie-modal-h1">
          {movie.original_title}
        </Typography>
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          sx={{ width: "50%", borderRadius: 1, alignContent: "center", display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        <Box sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={onClose}>
            <CloseIcon sx={{ fontSize: 28, color: '#333' }} />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Button className="rent-button">Request Rental</Button>
        </Box>
        <Typography variant="body1" mt={2}>
          <strong>Overview:</strong> {movie.overview}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Release Date:</strong> {movie.release_date}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Genres:</strong>{" "}
          {movie.genre_ids.map((genreId) => genres.find(g => g.id === genreId).name).join(", ")}
        </Typography>
        <Typography variant="body1" mt={1}>
          <strong>Rating:</strong> {movie.vote_average} / 10
        </Typography>
        
      </Box>
    </Modal>
  );
};

export default MovieModal;
