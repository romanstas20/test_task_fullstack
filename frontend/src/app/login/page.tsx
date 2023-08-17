import React from 'react';
import {Box} from "@mui/material";

import AuthForm from "@/components/AuthForm";

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
