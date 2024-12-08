import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PaginationControls = ({ page, totalResults, numResults, onPageChange, genre, genres }) => {
  const totalPages = Math.ceil(totalResults / numResults);
  const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  const getPageButtons = (pageArray) => {
    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
      return [];
    }


    if (pageArray.length <= 5) {
      return pageArray;
    }

    const curr_array = pageArray.slice(Math.max(page - 3, 0), Math.min(page + 2, totalPages));
    // Add ellipsis to the left
    if (curr_array[0] > 1) {
      curr_array.unshift("...");
    }
    // Add ellipsis to the right
    if (curr_array[curr_array.length - 1] < totalPages) {
      curr_array.push("...");
    }
    // add first and last page
    if (page >= 4) {
      curr_array.unshift(1);
    }
    if (page <= totalPages - 3) {
      curr_array.push(totalPages);
    }
    
    return curr_array;
  };

  const getVariant = (p) => {
    if (p === page) {
      return "contained";
    }
    return "text";
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", margin: "15px 0px 15px 0px" }}>
      <Button onClick={handlePrevPage} startIcon={<ArrowBackIosIcon />} variant="contained" disabled={page === 1} sx={{float: "left"}}>
          Prev
        </Button>
      <ButtonGroup>
        {getPageButtons(pageArray).map((p) => (
          <Button key={p} disabled={!Number.isInteger(p)} variant={getVariant(p)} onClick={() => onPageChange(p)}>
            {p}
          </Button>
        ))}
      </ButtonGroup>        
        <Button onClick={handleNextPage} endIcon={<ArrowForwardIosIcon />} variant="contained" disabled={page === totalPages}>
          Next
        </Button>
    </Box>
  );
};

export default PaginationControls;
