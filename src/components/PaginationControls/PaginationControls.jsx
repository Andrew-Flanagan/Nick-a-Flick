import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PaginationControls = ({ page, totalResults, numResults, onPageChange, genre, genres }) => {
  const totalPages = Math.ceil(totalResults / numResults);

  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", gap: "1rem" }}>
      <Typography variant="h6" align="center" gutterBottom>
        Page {page} of {totalPages}. {totalResults} total{" "}
        {genre ? genres.find((g) => g.id === genre)?.name.toLocaleLowerCase() : "movies"}.
      </Typography>
      <ButtonGroup variant="contained" aria-label="Basic button group" size="small" sx={{ height: "56px" }}>
        <Button onClick={handlePrevPage} startIcon={<ArrowBackIosIcon />} variant="contained" disabled={page === 1}>
          Prev Page
        </Button>
        <Button onClick={handleNextPage} endIcon={<ArrowForwardIosIcon />} variant="contained" disabled={page === totalPages}>
          Next Page
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default PaginationControls;
