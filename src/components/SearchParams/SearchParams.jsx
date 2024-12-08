import React from "react";
import { Box, Button, ButtonGroup, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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
              <InputLabel variant="outlined" id="genre-select-label">Genres</InputLabel>
              <Select
                labelId="genre-select-label"
                id="genre-select"
                label="Genres"
                value={state.genre}
                onChange={onGenreChange}
              >
                <MenuItem value={"All"}>All</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100px" }}>
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                label="Sort"
                value={`${state.sortBy.criteria} ${state.sortBy.order}`}
                onChange={onSortChange}
              >
                <MenuItem value={"Name Ascending"}>Name Ascending</MenuItem>
                <MenuItem value={"Name Descending"}>Name Descending</MenuItem>
                <MenuItem value={"Year Ascending"}>Year Ascending</MenuItem>
                <MenuItem value={"Year Descending"}>Year Descending</MenuItem>
              </Select>
            </FormControl>
                <ButtonGroup
                variant="contained"
                aria-label="Display options"
                size="large"
                sx={{ height: "56px" }}
                >
                <Button
                    value="grid"
                    onClick={onDisplayChange}
                    startIcon={<ViewCompactIcon />}
                    variant={state.displayAsTable ? "outlined" : "contained"}
                >
                </Button>
                <Button
                    value="table"
                    onClick={onDisplayChange}
                    startIcon={<TableRowsRoundedIcon />}
                    variant={state.displayAsTable ? "contained" : "outlined"}
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