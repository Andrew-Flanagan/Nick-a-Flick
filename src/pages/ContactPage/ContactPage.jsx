import React from "react";
import { Box, Typography, Button, Container, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import '../../styles/global.css';


const ContactPage = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, email, message);
        setSubmitted(true);
        
    }


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
                        sx={{display: "inline-block", marginRight: "16px"}}
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        error={name.length === 0 && submitted}
                    >
                    </TextField>
                    <TextField 
                        fullWidth
                        label="Email"
                        required
                        sx={{display: "inline-block"}}
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        error={email.length === 0 && submitted}
                    >
                    </TextField>
                </Box>
                <TextField 
                    fullWidth
                    label="Message"
                    multiline
                    slotProps={{ htmlInput: { maxLength: 1000 } }}
                    sx={{margin: "auto", mt: 1, '& .MuiInputBase-root': {
                        height: "30vh", alignItems: "flex-start", textOverflow: "ellipsis", overflow: 'scroll', flexGrow: 1}}}
                    required
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                    error={message.length === 0 && submitted}
                >
                </TextField>
                <Box sx={{display: "flex"}}>
                    <Button variant="outlined" type="submit" size="large" sx={{marginLeft: "auto", mt: 1, bgcolor: "#1976d2", color: "#FEE440"}} onClick={handleSubmit}>Send</Button>
                </Box>
            </Container>
        </Box>

    );
}



export default ContactPage;