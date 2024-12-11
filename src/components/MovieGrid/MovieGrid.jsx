import React from 'react';
import { Typography, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getTitle } from '../../helpers/movieHelpers';
import placeholder_poster from '../../assets/images/Nick_a_flick.jpeg';
import './MovieGrid.css';

const MovieGrid = ({ media, handleOpen }) => {
    return(
        <Grid container spacing={1.5} justifyContent="center">
            {media.map((result) => (
                <Grid
                className="movie-item"
                size={2.4}
                key={result.id} 
                xs={3}   // 4 items per row on mobile (12 / 3 = 4)
                sm={3}   // 4 items per row on small screens
                md={2.4} // 5 items per row on medium screens
                lg={2.4} // 5 items per row on large screens (adjust for the desired width)
                xl={2}   // 6 items per row on extra-large screens (adjust if needed)
                sx={{
                }}
            
                >
                <Tooltip 
                    title={
                    <Typography fontSize={"1.5em"} textAlign={"center"}>
                        {getTitle(result)}
                    </Typography>
                    } 
                    placement="top" 
                    className="tool-tip"
                >
                    <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                        alt={getTitle(result) + "poster"}
                        onError={(e) => { e.target.src = placeholder_poster }}
                        onClick={() => handleOpen(result)}
                    />
                </Tooltip>
            </Grid>
        ))}
        </Grid>
    )};

export default MovieGrid;