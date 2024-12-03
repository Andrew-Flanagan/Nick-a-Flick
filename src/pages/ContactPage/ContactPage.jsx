import React, {useEffect, useState} from "react";
import { Box, Typography, Button, Container, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import '../../styles/global.css';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    // const [request, setRequest] = React.useState("General Inquiry");

    

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.movie) {
            setMessage(`Hi Chad, I would like to rent ${location.state.movie}.`);
        }
    }, [location.state]); // Only run when location.state changes


    const handleSubmit = (event) => {
        event.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, event.target, {
            publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        }).then(
            (result) => {
                console.log("Email sent successfully:", result.text);
                alert("Your message has been sent!");
                setName("");
                setEmail("");
                setMessage("");
                setSubmitted(false);
            },
            (error) => {
                console.error("Error sending email:", error);
                alert("Failed to send your message. Please try again later.");
            }
        );
    
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
                <form onSubmit={handleSubmit}>
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
                            name="user_name"
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
                            name="user_email"
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
                        name="user_message"
                        multiline
                        slotProps={{ htmlInput: { maxLength: 850 } }}
                        sx={{margin: "auto", mt: 1, '& .MuiInputBase-root': {
                            height: "30vh", alignItems: "flex-start", textOverflow: "ellipsis", overflow: 'scroll', flexGrow: 1}}}
                        required
                        onChange={(event) => setMessage(event.target.value)}
                        value={message}
                        error={message.length === 0 && submitted}
                    >
                    </TextField>
                    <Box sx={{display: "flex"}}>
                        <Button variant="outlined" type="submit" size="large" sx={{marginLeft: "auto", mt: 1, bgcolor: "#1976d2", color: "#FEE440"}}>Send</Button>
                    </Box>
                </form>
            </Container>
        </Box>

    );
}



export default ContactPage;