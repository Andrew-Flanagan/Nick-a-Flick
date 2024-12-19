import React from "react";
import { Box } from "@mui/material";
import { getGenres, getTitle, getReleaseDate } from "../../helpers/movieHelpers";
import { useModal } from "../../hooks/useModal";
import "./MediaTable.css";

const MediaTable = ({ media }) => {
    const { openModal } = useModal();

    return (
        <Box>
            <table>
                { media.length > 0 && <thead>
                    <tr>
                        <th className="cols"> Name </th>
                        <th className="cols"> Genre </th>
                        <th classname="cols"> Year</th>
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
                            <td>{getGenres(result)}</td>
                            <td>{getReleaseDate(result)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

export default MediaTable;
