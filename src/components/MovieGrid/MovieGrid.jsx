import {React} from 'react';
import { Typography, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { getTitle } from '../../helpers/movieHelpers';
import './MovieGrid.css';
import { useModal } from '../../hooks/useModal';
import nf_poster from '../../assets/images/nickaflick-poster.png';

const MovieGrid = ({ media }) => {
    const { openModal } = useModal();

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
                        onError={(e) => { e.target.src = nf_poster }}
                        onClick={() => openModal(result)}
                    />
                </Tooltip>
            </Grid>
        ))}
        </Grid>
    )};

export default MovieGrid;