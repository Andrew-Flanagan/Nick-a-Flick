import React from "react";
import { Box, Button, ButtonGroup, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import genres from "../../data/genres.json";

const SearchParams = ({ state, onDisplayChange, onGenreChange, onSearchChange, onSortChange }) => {

    return (
    <Box>
        <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              gap: "1rem",
              padding: "1rem",
              borderTop: "1px solid #808080",
              borderBottom: "1px solid #808080",
            }}
        >
            <FormControl sx={{ width: "100px" }}>
              <Select
                labelId="genre-select-label"
                id="genre-select"
                label="Genres"
                value={state.genre}
                onChange={onGenreChange}
                variant="standard"
                sx={{ borderRadius: "5px", overflow: "auto" }}
                defaultValue={"All"}
              >
                <MenuItem value={"All"}>Genre</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography>Sort by:</Typography>
            <FormControl sx={{ width: "150px" }}>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                label="Sort"
                value={`${state.sortBy.criteria} ${state.sortBy.order}`}
                onChange={onSortChange}
                variant="standard"
              >
                <MenuItem value={"Name Ascending"}>Name A-Z</MenuItem>
                <MenuItem value={"Name Descending"}>Name Z-A</MenuItem>
                <MenuItem value={"Year Ascending"}>Year Oldest First</MenuItem>
                <MenuItem value={"Year Descending"}>Year Newest First</MenuItem>
                <MenuItem value={"Popularity Descending"}>Popularity High-Low</MenuItem>
                <MenuItem value={"Popularity Ascending"}>Popularity Low-High</MenuItem>
                <MenuItem value={"Runtime Descending"}>Runtime High-Low</MenuItem>
                <MenuItem value={"Runtime Ascending"}>Runtime Low-High</MenuItem>
              </Select>
            </FormControl>
                <ButtonGroup
                variant="contained"
                aria-label="Display options"
                sx={{ height: "56px" }}
                >
                <Button
                    value="grid"
                    onClick={onDisplayChange}
                    startIcon={<ViewCompactIcon />}
                    variant={state.displayAsTable ? "outlined" : "contained"}
                    size="small"
                >
                </Button>
                <Button
                    value="table"
                    onClick={onDisplayChange}
                    startIcon={<TableRowsRoundedIcon />}
                    variant={state.displayAsTable ? "contained" : "outlined"}
                    size="small"
                >
                </Button>
                </ButtonGroup>
            
          </Box>
          <TextField
              id="search-input"
              label="Search"
              value={state.searchTerm}
              onChange={onSearchChange}
              variant="outlined"
              fullWidth
            />
        </Box>
    );
};

export default SearchParams;