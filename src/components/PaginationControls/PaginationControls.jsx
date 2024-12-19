import { Box, ButtonGroup, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./PaginationControls.css";

const PaginationControls = ({ page, totalResults, numResults, onPageChange }) => {
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

    if (curr_array[0] > 1) {
      curr_array.unshift("...");
    }

    if (curr_array[curr_array.length - 1] < totalPages) {
      curr_array.push("...");
    }

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
    <Box className="page-num-container">
      <Button onClick={handlePrevPage} startIcon={<ArrowBackIosIcon />} variant="contained" disabled={page === 1}>
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
