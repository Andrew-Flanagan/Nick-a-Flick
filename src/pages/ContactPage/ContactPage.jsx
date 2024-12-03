import React from "react";
import { Box, Typography, Button, Container, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import '../../styles/global.css';


const ContactPage = (movie) => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    // const [request, setRequest] = React.useState("General Inquiry");

    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name, email, message);
        setSubmitted(true);
    }

    const populateMovie = () => {
        if (location.state) {
            return "Hi Chad, I would like to rent " + location.state.movie + ".";
        }
        return message;
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
                    {/* <FormControl sx={{display: "inline-block", marginRight: "16px"}} fullWidth>
                        <InputLabel>Request</InputLabel>
                        <Select
                          label="Request"
                          value={request}
                          fullWidth
                          onChange={(event) => { setRequest(event.target.value)}}
                        >
                          <MenuItem value={"General Request"}>General Inquiry</MenuItem>
                          <MenuItem value={"Rental Request"}>Rental Request</MenuItem>
                        </Select>
                    </FormControl> */}
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
                    slotProps={{ htmlInput: { maxLength: 850 } }}
                    sx={{margin: "auto", mt: 1, '& .MuiInputBase-root': {
                        height: "30vh", alignItems: "flex-start", textOverflow: "ellipsis", overflow: 'scroll', flexGrow: 1}}}
                    required
                    onChange={(event) => setMessage(event.target.value)}
                    value={populateMovie()}
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