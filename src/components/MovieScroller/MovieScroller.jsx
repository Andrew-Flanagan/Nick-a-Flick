import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { getGenres, getTitle, getRuntime, getReleaseDate } from "../../helpers/movieHelpers";
import Carousel from 'react-material-ui-carousel'
import MovieModal from "../MovieModal/MovieModal";



const MovieScroller = ({title, data, subTitle}) => {
    const [currMovie, setCurrMovie] = useState(data[0]);
    const [open, setOpen] = useState(false);

    const handleOpen = (movie) => {
        setOpen(true);
        setCurrMovie(movie);
    };

    function CarouselBox({media, top, subTitle}) {
        return (
            <Box
                onClick={() => handleOpen(media)}
              sx={{
                position: "absolute", // Positions the text box on top of the image
                top: `${top}%`,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                padding: "1rem 2rem",
                borderRadius: "8px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="h4" component="h1">
                {subTitle} - <span style={{ fontStyle: 'italic' }}>{getTitle(media)}</span>
              </Typography>
              <Typography variant="body1">
                {getGenres(media)} • {getRuntime(media)} mins •{" "}
                {getReleaseDate(media)}
              </Typography>
            </Box>
        );
    };            

    function Item(props) {
        return (
          <Box
            sx={{
              height: "60vh",
              width: "100vw",
              maxWidth: "100%",
              position: "relative", // Allows absolutely positioned children
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${props.item.backdrop_path}`}
              alt={`${props.item.title} Poster`}
              onClick={() => handleOpen(props.item)}
              style={{
                width: "100vw",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                cursor: "pointer",
              }}
            />
            <CarouselBox media={props.item} top={0} left={0} transform={[0,0]} subTitle={subTitle}/>
          </Box>
        );
      }
      

    return (
        <Box>
            {title && <Typography variant="h3" align="center" sx={{paddingTop: "2rem", paddingBottom: "2rem"}}>
                {title}
            </Typography>}
            <Carousel>
                {
                    data.map((movie, i) => <Item key={i} item={movie} />)
                }
            </Carousel>
            <MovieModal movie={currMovie} open={open} onClose={() => setCurrMovie(null)} />
        </Box>
    );
};

export default MovieScroller;