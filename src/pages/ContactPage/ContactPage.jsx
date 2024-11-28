import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import '../../styles/global.css';


const ContactPage = () => {
    return (
        <Box sx={{py: 8}}>
            <Container>
                <Typography variant="h2" align="center" gutterBottom fontWeight="bold" fontFamily="Press Start 2P">
                    Contact Us
                </Typography>
                <Typography variant="h5" align="center">
                    Have a question? Reach out to us!
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button component={Link} to="/search" variant="contained" size="large">
                        Browse Movies
                    </Button>
                </Box>
            </Container>
        </Box>

    );
}



export default ContactPage;