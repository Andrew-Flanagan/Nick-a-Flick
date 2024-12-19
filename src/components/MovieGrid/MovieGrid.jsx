import {React} from 'react';
import { Typography, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useModal } from '../../hooks/useModal';
import { getTitle } from '../../helpers/movieHelpers';
import nf_poster from '../../assets/images/nickaflick-poster.png';
import './MovieGrid.css';

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
                    lg={2.4} // 5 items per row on large screens
                    xl={2}   // 6 items per row on extra-large screens
                >
                    <Tooltip 
                        title={
                            <Typography fontSize="1.5em" textAlign="center">
                                {getTitle(result)}
                            </Typography>
                        } 
                        placement="top"
                    >
                        <img
                            className="movie-poster"
                            src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                            alt={getTitle(result) + "poster"}
                            onClick={() => openModal(result)}
                            onError={(e) => { e.target.src = nf_poster }}
                        />
                    </Tooltip>
                </Grid>
        ))}
        </Grid>
    );
};

export default MovieGrid;
