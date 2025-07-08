import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import MovieBackdrop from "../MovieBackdrop/MovieBackdrop";
import theme from "../../styles/theme";
import "./MovieCarousel.css";

const MovieCarousel = ({ title, data, subTitle }) => {
    const [autoPlay, setAutoPlay] = useState(true);

    const handleNavigation = () => {
        setAutoPlay(false);
        setTimeout(() => {
            setAutoPlay(true);
        }, 4000);
        setAutoPlay(true);
    };

    return (
        <Box id="carousel-box">
            {title && (
                <Typography variant="h3" align="center" className="optional-title">
                    {title}
                </Typography>
            )}
            <Carousel
                // autoPlay={autoPlay}
                // interval={4000}
                // animation="fade"
                // duration={500}
                // swipe={true}
                className = "carousel"
                navButtonsProps={{
                    disableRipple: true,
                    style: {
                        borderRadius: 0,
                        height: "100%",
                        width: "100%",
                        top: "unset",
                        padding: 0,
                        backgroundColor: "transparent",
                    },
                }}
                navButtonsWrapperProps={{
                    style: {
                        bottom: "50%",
                        backgroundColor: "transparent",
                        width: "10%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "calc(100% - 20px)",
                        top: "unset",
                        padding: 0,
                    },
                }}
                NextIcon={<ArrowForwardIosOutlinedIcon />}
                PrevIcon={<ArrowBackIosNewOutlinedIcon />}
                next={() => {
                    handleNavigation();
                }}
                prev={() => {
                    handleNavigation();
                }}
            >
                {data.map((movie, i) => (
                    <MovieBackdrop
                        key={i}
                        media={movie}
                        subTitle={subTitle}
                        gradient={theme.palette.secondary.main}
                    />
                ))}
            </Carousel>
        </Box>
    );
};

export default MovieCarousel;
