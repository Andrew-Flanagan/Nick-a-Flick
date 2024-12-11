import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import "./MovieCarousel.css";
import theme from "../../styles/theme";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';


const MovieCarousel = ({title, data, subTitle}) => {

    return (
        <Box>
            {title && <Typography variant="h3" align="center" sx={{paddingTop: "2rem", paddingBottom: "2rem"}}>
                {title}
            </Typography>}
            <Carousel
              navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                disableRipple: true,
                style: {
                    borderRadius: 0,
                    height: "100%",
                    width: "100%",
                    top: 'unset',
                    padding: 0,
                    backgroundColor: "transparent",
                }}}
                navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
                    style: {
                        bottom: "50%",
                        backgroundColor: "transparent",
                        width: "10%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100% - 20px)",
                        top: 'unset',
                        padding: 0,
                    }
                }}
                NextIcon={<ArrowForwardIosOutlinedIcon sx={{fontSize: "3rem", color: "white"}} />}
                PrevIcon={<ArrowBackIosNewOutlinedIcon sx={{fontSize: "3rem", color: "white"}} />}
                >
                { 
                  data.map((movie, i) => <MovieBackdrop key={i} media={movie} subTitle={subTitle} gradient={theme.palette.secondary.main}/>)
                }
            </Carousel>
        </Box>
    );
};

export default MovieCarousel;