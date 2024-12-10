import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import MovieModal from "../MovieModal/MovieModal";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import "./MovieScroller.css";



const MovieScroller = ({title, data, subTitle}) => {
    const [currMovie, setCurrMovie] = useState(data[0]);
    const [open, setOpen] = useState(false);

    const handleOpen = (movie) => {
        setOpen(true);
        setCurrMovie(movie);
    };      

    return (
        <Box>
            {title && <Typography variant="h3" align="center" sx={{paddingTop: "2rem", paddingBottom: "2rem"}}>
                {title}
            </Typography>}
            <Carousel
              navButtonsProps={{
                className: 'carousel-nav-buttons'
              }}
              navButtonsWrapperProps={{
                className: 'carousel-nav-buttons-wrapper'
              }}>
                { 
                  data.map((movie, i) => <MovieBackdrop key={i} media={movie} handleOpen={handleOpen} subTitle={subTitle} />)
                }
            </Carousel>
            <MovieModal movie={currMovie} open={open} onClose={() => setOpen(false)} />
        </Box>
    );
};

export default MovieScroller;