import React from "react";
import { Box, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import theme from "../../styles/theme";
import "./MovieCarousel.css";


const MovieCarousel = ({title, data, subTitle}) => {

    return (
        <Box>
            {title && <Typography variant="h3" align="center" className="optional-title">
                {title}
            </Typography>}
            <Carousel
              navButtonsProps={{
                disableRipple: true,
                style: {
                    borderRadius: 0,
                    height: "100%",
                    width: "100%",
                    top: 'unset',
                    padding: 0,
                    backgroundColor: "transparent",
                }}}
                navButtonsWrapperProps={{
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
                NextIcon={<ArrowForwardIosOutlinedIcon className="nav-icon"/>}
                PrevIcon={<ArrowBackIosNewOutlinedIcon className="nav-icon"/>}
            >
                { 
                  data.map((movie, i) => <MovieBackdrop key={i} media={movie} subTitle={subTitle} gradient={theme.palette.secondary.main}/>)
                }
            </Carousel>
        </Box>
    );
};

export default MovieCarousel;
