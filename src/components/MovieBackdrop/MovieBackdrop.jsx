import React from "react";
import { Box, Typography } from "@mui/material";
import { getGenres, getTitle, getRuntime, getReleaseDate } from "../../helpers/movieHelpers";
import "./MovieBackdrop.css";



const MovieBackdrop = ({media, handleOpen, subTitle}) => {
      return (
        <Box className="img-box">
          <img
            src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
            alt={`${media.title} Poster`}
            onClick={() => handleOpen(media)}
          />
          <Box
              onClick={() => handleOpen(media)}
              className="img-box-text"
          >
            <Typography variant="h4" component="h1">
              {subTitle} - <span style={{ fontStyle: 'italic' }}>{getTitle(media)}</span>
            </Typography>
            <Typography variant="body1">
              {getGenres(media)} • {getRuntime(media)} mins •{" "}
              {getReleaseDate(media)}
            </Typography>
          </Box>
        </Box>
      );
    }

export default MovieBackdrop;