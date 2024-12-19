import React, {useMemo, useState} from "react";
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { getTitle, getGenres, getReleaseDate, getRuntime, getTrailers, getKeywords, getCast, getCrew } from "../../helpers/movieHelpers";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import data from "../../data/updated_data.json";
import IMDB_logo from "../../assets/images/IMDB_Logo_2016.svg";
import youtube_logo from "../../assets/images/youtube_logo.svg";
import theme from "../../styles/theme";
import "./MovieModal.css";

function InfoModal(movie) {
  const [infoOpen, setInfoOpen] = useState(false);
  const handleInfoOpen = () => setInfoOpen(true);
  const handleInfoClose = () => setInfoOpen(false);

  const crewJobs = ["Director", "Screenplay"];
  const crewData = crewJobs
  .map((job) => ({
    job,
    names: getCrew(movie, job),
  }))
  .filter((entry) => entry.names.length > 0);

  const cast = getCast(movie, 5);
  const keywords = getKeywords(movie);
  
  const isMoreInfo = cast.length > 0 || crewData.length > 0 || keywords.length > 0;

  return (
    <React.Fragment>
      {(isMoreInfo) && <Typography>
        <span className="info-modal-button" onClick={handleInfoOpen}>
          More Info <InfoOutlinedIcon sx={{scale: "0.80"}} />
        </span>
      </Typography>}
      <Modal
          open={infoOpen}
          onClose={handleInfoClose}
      >
        <Box className="info-modal">
          <Box className="close-icon" onClick={handleInfoClose}>
            <CloseIcon className="close-button" />
          </Box>
          <Box className="info-content">
            {crewData.map(({ job, names }) => (
              <Typography key={job}>
                <span className="content-title">{job}: </span>
                  {names}
              </Typography>
            ))}
            {cast.length > 1 && <Typography>
              <span className="content-title">Cast:</span>{" "}
                {cast}
            </Typography>}
            {keywords.length > 1 && <Typography>
              <span className="content-title">Keywords:</span>{" "}
                {keywords}
            </Typography>}
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};


const MovieModal = ({ movie, open, handleClose }) => {
  const navigate = useNavigate();

  const genres = getGenres(movie);
  const release_date = getReleaseDate(movie);
  const runtime = getRuntime(movie);
  const trailers = getTrailers(movie);
  
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
    <Modal
      open={open} 
      onClose={handleClose}
      closeAfterTransition
    >
    <Fade in={open}>
      <Box className="movie-modal">
        <MovieBackdrop media={movie} gradient={theme.palette.primary.secondary}/>
        <Box className="close-icon" onClick={handleClose}>
            <CloseIcon className="close-button" />
        </Box>
        <Box className="modal-content">
          <Button color="secondary" variant="contained" className="rent-button" onClick={() => {routeChange(getTitle(movie))}}>Request Rental</Button>
          <Box className="link-buttons">
            {movie.imdb_id &&
            <Box
              component="img"
              src={IMDB_logo}
              alt={"IMDB Logo"}
              className="imdb-logo"
              onClick = {() => window.open(`https://www.imdb.com/title/${movie.imdb_id}`, "_blank")}
              />}
            {trailers.length > 0 &&
            <Box
              component="img"
              src={youtube_logo}
              alt={"Youtube Logo"}
              className="imdb-logo"
              onClick = {() => handleYoutubeClick(trailers[0])}
            />}
          </Box>

          {/* Maybe turn this into a map function to reduce code*/}
          <Typography sx={{marginTop: "0.5rem"}}>
            <span className="content-title">Overview:</span> {movie.overview ? movie.overview : "No overview available for this title."}
          </Typography>
          <Box className="inner-modal-content">
            <Typography>
              <span className="content-title">Release Date:</span> {movie.release_date ? release_date : "No release date available."}
            </Typography>
            <Typography>
              <span className="content-title">Genres:</span>{" "}
              {(genres.length > 1 || movie?.name) ? formatGenres(genres, movie) : "No genres available."}
            </Typography>
            <Typography>
              <span className="content-title">Runtime:</span>{" "}
              {runtime !== undefined ? getRuntime(movie) + " minutes" : "No runtime available."}
            </Typography>
            {movie.vote_average !== 0 && <Typography>
              <span style={{display: "flex"}}>
                <span className="content-title">Rating:</span>
                <StarIcon color="secondary" />
                {movie.vote_average.toFixed(1)}
              </span>
            </Typography>}

            <InfoModal {...movie} />
          </Box>
        </Box>

          {movie.belongs_to_collection && collection_movies.length > 1 && (
            <Box className="collection-container">
              <Typography align="center" className="content-title">
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
  );
};


export default MovieModal;
