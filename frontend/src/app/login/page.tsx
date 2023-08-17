import React from 'react';
import AuthForm from "@/components/AuthFrom";
import {Box} from "@mui/material";

const SignIn = () => {
    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <Box sx={{width: "400px"}}>
                <AuthForm/>

            </Box>
        </Box>
    );
};

export default SignIn;
