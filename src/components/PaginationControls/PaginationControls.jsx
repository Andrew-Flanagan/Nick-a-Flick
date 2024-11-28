import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PaginationControls = ({ page, totalResults, numResults, prevPage, nextPage, genre, genres }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", gap: "1rem" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Page {page} of {Math.ceil(totalResults.length / numResults)}. {totalResults.length} total{" "}
        {genre ? genres.find((g) => g.id === genre)?.name.toLocaleLowerCase() : "movies"}.
      </Typography>
      <ButtonGroup variant="contained" aria-label="Basic button group" size="small" sx={{ height: "56px" }}>
        <Button onClick={prevPage} startIcon={<ArrowBackIosIcon />} variant="contained" disabled={page === 1}>
          Prev Page
        </Button>
        <Button onClick={nextPage} endIcon={<ArrowForwardIosIcon />} variant="contained" disabled={page * numResults >= totalResults.length}>
          Next Page
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default PaginationControls;
