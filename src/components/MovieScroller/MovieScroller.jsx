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
              navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                    borderRadius: 0,
                    height: "100%",
                    width: "100%",
                    top: 'unset',
                    padding: 0,
                }}}
                navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                        bottom: "50%",
                        width: "10%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100% - 20px)",
                        top: 'unset',
                        padding: 0,
                    }
                }}        >
                { 
                  data.map((movie, i) => <MovieBackdrop key={i} media={movie} handleOpen={handleOpen} subTitle={subTitle} />)
                }
            </Carousel>
            <MovieModal movie={currMovie} open={open} onClose={() => setOpen(false)} />
        </Box>
    );
};

export default MovieScroller;