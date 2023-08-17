import React from 'react';
import {Box} from "@mui/material";

import AuthForm from "@/components/AuthForm";

const SignUp = () => {
    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
            <Box sx={{width: "400px"}}>
                <AuthForm login={false}/>
            </Box>
        </Box>
    );
};

export default SignUp;
