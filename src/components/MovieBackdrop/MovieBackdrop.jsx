import React from "react";
import { Box, Typography } from "@mui/material";
import { useModal } from "../../hooks/useModal";
import { getGenres, getTitle, getRuntime, getReleaseDate } from "../../helpers/movieHelpers";
import nick_a_flick_logo from "../../assets/images/nick_a_flick_logo_blue_text.PNG";
import "./MovieBackdrop.css";


const MovieBackdrop = ({media, subTitle, gradient}) => {
      const { openModal, modalData } = useModal();

      return (
        <Box className="img-box" color={gradient}>
          <img
            src={`https://image.tmdb.org/t/p/original${media.backdrop_path}`}
            alt={`${media.title} Poster`}
            onClick={!modalData.open ? () => openModal(media) : null}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src=nick_a_flick_logo;
            }}
            style={!modalData.open ? {cursor: 'pointer'} : {}}
          />
          <Box
              onClick={() => openModal(media)}
              className="img-box-text"
          >
            <Typography variant="h4" component="h1" color="white">
              {subTitle && `${subTitle} - `}<span className="media-title">{getTitle(media)} </span>
            </Typography>
            <Typography variant="body1">
              {getGenres(media)} • {getRuntime(media)} mins •{" "}
              {getReleaseDate(media)}
            </Typography>
          </Box>
          { <Box className="img-box-gradient" />}
        </Box>
      );
    };

export default MovieBackdrop;