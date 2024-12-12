import React, {useMemo} from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { getTitle, getGenres, getReleaseDate, getRuntime, getTrailers, getKeywords, getCast, getCrew } from "../../helpers/movieHelpers";
import { useNavigate } from "react-router-dom";
import "./MovieModal.css";
import IMDB_logo from "../../assets/images/IMDB_Logo_2016.svg";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import StarIcon from '@mui/icons-material/Star';
import theme from "../../styles/theme";
import data from "../../data/updated_data.json";
import MovieGrid from "../MovieGrid/MovieGrid";
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import youtube_logo from "../../assets/images/youtube_logo.svg";


const MovieModal = ({ movie, open, handleClose }) => {
  const navigate = useNavigate();
  
  const collection_movies = useMemo(() => {
    if (!movie || !movie.belongs_to_collection) return []; 
    return data
      .filter(
        (m) =>
          m.belongs_to_collection &&
          m.belongs_to_collection.id === movie.belongs_to_collection.id
      )
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  }, [movie]); 
  
  const trailers = getTrailers(movie);

  const routeChange = (movieTitle) =>{
    let path = `/contact`;
    navigate(path, {state: {movie: movieTitle}});
  }

  const formatGenres = (genres, media) => {
    const appendTV = media.name ? ", TV Series" : ""
    return genres + appendTV;
  }

  const handleYoutubeClick = (video) => {
    return window.open(`https://www.youtube.com/watch?v=${video.key}`, "_blank");
  }

  const Fade = React.forwardRef(function Fade(props, ref) {
    const {
      children,
      in: open,
      onClick,
      onEnter,
      onExited,
      ownerState,
      ...other
    } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null, true);
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited(null, true);
        }
      },
    });
  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {React.cloneElement(children, { onClick })}
      </animated.div>
    );
  });
  
  Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
  };

  return (
    <div>
    <Modal
      open={open} 
      onClose={handleClose}
      closeAfterTransition

      >
    <Fade in={open} >
      <Box className="movie-modal">
        <MovieBackdrop media={movie} gradient={theme.palette.primary.secondary}/>
        <Box sx={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={handleClose}>
            <CloseIcon className="close-button" />
        </Box>
        <Box className="modal-content">
          <Button color="secondary" variant="contained" className="rent-button" onClick={() => {routeChange(getTitle(movie))}}>Request Rental</Button>
          <Box className="link-buttons">
            {movie.imdb_id && <Box
              component="img"
              src={IMDB_logo}
              alt={"IMDB Logo"}
              className="imdb-logo"
              onClick = {() => window.open(`https://www.imdb.com/title/${movie.imdb_id}`, "_blank")}
              />}
            {trailers.length > 0 && <Box
              component="img"
              src={youtube_logo}
              alt={"Youtube Logo"}
              className="imdb-logo"
              onClick = {() => handleYoutubeClick(trailers[0])}
            />}
          </Box>
          <Typography sx={{marginTop: "0.5rem"}}>
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
            {/* <Typography>
              <span className="content-title">Keywords:</span>{" "}
              {getKeywords(movie)}
            </Typography> */}
            <Typography>
              <span className="content-title">Cast:</span>{" "}
              {getCast(movie, 5)}
            </Typography>
            <Typography>
              <span className="content-title">Director:</span>{" "}
              {getCrew(movie, "Director")}
              <br/>
              <span className="content-title">Writer:</span>{" "}
              {getCrew(movie, "Writer")}
            </Typography>
          </Box>
        </Box>
          {movie.belongs_to_collection && collection_movies.length > 1 &&(
            <Box sx={{paddingBottom: 4, paddingRight: 4, paddingLeft: 4}}>
              <Typography align="center">
                Nick A Flick films in the {movie.belongs_to_collection.name}
              </Typography> 
              <MovieGrid
                media={collection_movies}
              />
            </Box>
          )}
      </Box>
      </Fade>
    </Modal>
    </div>
  );
};

export default MovieModal;
