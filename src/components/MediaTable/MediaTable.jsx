import React from "react";
import { Box } from "@mui/material";
import { getGenres, getTitle, getReleaseDate } from "../../helpers/movieHelpers";
import { useModal } from "../../hooks/useModal";

const MediaTable = ({ media }) => {
    const { openModal } = useModal();

    return (
        <Box
            sx={{
            alignItems: "center",
            gap: 1,
            marginTop: "15px",
            overflow: "scroll",
            justifyContent: "center",
            flexDirection: "column",
            }}
        >
            <table
            sx={{
                margin: "auto",
                width: "100%",
                tableLayout: "fixed",
            }}
            >
            { media.length > 0 && <thead>
                <tr>
                <th style={{ textAlign: "left", width: "50%" }}>Name</th>
                <th style={{ textAlign: "left", width: "50%" }}>Genre</th>
                <th style={{ textAlign: "left" }}>Year</th>
                </tr>
            </thead>}
            <tbody>
                {media.map((result) => (
                <tr key={result.id}>
                    <td>
                    <span
                        className="movie-link"
                        onClick={() => openModal(result)}
                    >
                        {getTitle(result)}
                    </span>
                    </td>
                    <td>
                    {getGenres(result)}
                    </td>
                    <td>{getReleaseDate(result)}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </Box>
    );
}

export default MediaTable;