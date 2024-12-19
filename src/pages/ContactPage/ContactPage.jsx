import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, TextField, FormControlLabel } from "@mui/material";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';



const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        subscribe: false,
    });

    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const verifyEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.name === "subscribe") {
            setFormData((prev) => ({
                ...prev,
                subscribe: !formData.subscribe,
            }));
            return;
        }
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.movie) {
            setFormData((prev) => ({ ...prev, message: `Hi Chad, I would like to rent ${location.state.movie}.` }));
        }
    }, [location.state]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.name.length === 0 || formData.email.length === 0 || formData.message.length === 0 || !verifyEmail(formData.email)) {
            setSubmitted(true);
            return;
        }
        console.log(event.target);

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, event.target, {
            publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
        }).then(
            (result) => {
                console.log("Email sent successfully:", result.text);
                setOpen(true);
                setFormData({ name: "", email: "", message: "", subscribe: false });
                setSubmitted(false);
            },
            (error) => {
                console.error("Error sending email:", error);
                alert("Failed to send your message. Please try again later.");
            }
        );
        setSubmitted(true);
    };

    return (
        <Box sx={{ py: 4 }}>
            <Container>
                <Typography variant="h2" align="center" gutterBottom fontWeight="bold" fontFamily="Press Start 2P">
                    Contact Us
                </Typography>
                <Typography variant="h5" align="center">
                    Have a question? Reach out to the Chad!
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <TextField 
                            fullWidth 
                            label="Name"
                            name="name"
                            required
                            sx={{ display: "inline-block", marginRight: "16px" }}
                            onChange={handleChange}
                            value={formData.name}
                            error={formData.name.length === 0 && submitted}
                        />
                        <TextField 
                            fullWidth
                            label="Email"
                            name="email"
                            required
                            sx={{ display: "inline-block" }}
                            onChange={handleChange}
                            value={formData.email}
                            error={!verifyEmail(formData.email) && submitted}
                            helperText={!verifyEmail(formData.email)  && submitted ? "Please enter a valid email address." : ""}
                        />
                    </Box>
                    <TextField 
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        slotProps={{ htmlInput: { maxLength: 850 } }}
                        sx={{ margin: "auto", mt: 1, '& .MuiInputBase-root': {
                            height: "30vh", alignItems: "flex-start", textOverflow: "ellipsis", overflow: 'scroll', flexGrow: 1 }}}
                        required
                        onChange={handleChange}
                        value={formData.message}
                        error={formData.message.length === 0 && submitted}
                    />
                    <FormControlLabel
                        label="Subscribe to Nick-A-Flick Newsletter"
                        control={
                            <Checkbox
                                name="subscribe"
                                color="primary"
                                checked={formData.subscribe}
                                onChange={handleChange}
                            />
                        }/>
                    <Box sx={{ display: "flex" }}>
                        <Button variant="contained" type="submit" size="large" sx={{ marginLeft: "auto", mt: 1 }}>Send</Button>
                    </Box>
                </form>
            </Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Email sent successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactPage;
