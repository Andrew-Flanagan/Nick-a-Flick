import React from "react";
import { Box, Typography, Button, Container, TextField } from "@mui/material";
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
                    Have a question? Reach out to the Chad!
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <TextField 
                        fullWidth 
                        label="Name"
                        required
                        sx={{display: "inline-block", marginRight: "16px"}}>
                    </TextField>
                    <TextField 
                        fullWidth
                        label="Email"
                        required
                        sx={{display: "inline-block"}}>
                    </TextField>
                </Box>
                <TextField 
                    fullWidth
                    label="Message"
                    multiline
                    minRows={3}
                    sx={{margin: "auto", mt: 1, '& .MuiInputBase-root': {
                        height: "30vh", alignItems: "flex-start", textOverflow: "ellipsis"}}}
                    required
                >
                </TextField>
                <Box sx={{display: "flex"}}>
                    <Button variant="outlined" size="large" sx={{marginLeft: "auto", mt: 1, bgcolor: "#1976d2", color: "#FEE440"}}>Send</Button>
                </Box>
            </Container>
        </Box>

    );
}



export default ContactPage;