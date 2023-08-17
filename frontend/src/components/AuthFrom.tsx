'use client'
import {Box, TextField, Typography, Button, styled, Snackbar, Alert} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "Yup";

import {getCharacterValidationError} from "@/utils/helpersFunction";
import {signIn, signUp} from "@/services/DataServices";
import Link from "next/link";
import {useState} from "react";
import {Cookies} from "react-cookie";
import {useRouter} from "next/navigation";

interface AutFormProps {
    login?: boolean;
}

interface AuthProps {
    username: boolean;
    password: boolean;
}

export default function AuthForm({login = true}: AutFormProps) {

    const {push} = useRouter();


    const [alert, setAlert] = useState({
        isShow: false,
        type: "success",
        message: "",
    });

    const handleOpenAlert = (type, message) => {
        setAlert({isShow: true, type: type, message});
        setTimeout(()=>{
            setAlert({isShow: false, type: type, message})
        }, 3500);
    };

    const settingToken = (response) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const cookies = new Cookies();
        const token = response.token;
        cookies.set('token', token, {
            expires: tomorrow
        });
        push('/');
    }

    const handleSignIn = async (data: AuthProps) => {
        settingToken(await signIn(data));
    }

    const handleSignUp = async (data: AuthProps) => {
        await signUp(data);
        setTimeout(() => {
            push("/login")
        }, 3500)
    }

    const {values, handleChange, handleBlur, isSubmitting, touched, errors, handleSubmit, isValid} = useFormik({
        initialValues: {
            username: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(255)
                .required('The username is required'),
            password: Yup.string()
                .required("The password is required")
                .min(8, "Password must have at least 8 characters")
                .matches(/[0-9]/, getCharacterValidationError("digit"))
                .matches(/[a-z]/, getCharacterValidationError("lowercase"))
                .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
        }),
        onSubmit: async (values) => {
            try {
                {
                    login ?
                        await handleSignIn({username: values.username, password: values.password})
                        :
                        await handleSignUp({username: values.username, password: values.password})
                }

                const successMessage = login ? "User successfully login" : "User successfully created"

                handleOpenAlert("success", successMessage)
            } catch (e) {
                console.warn(e.response.data.message);
                handleOpenAlert("error", e.response.data.message)
            }
        }
    });

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{mb: 2, textAlign: "center"}}>
                <Typography variant='h4'>Sign {login ? "In" : "Up"}</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <TextField
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                        placeholder={"Enter username"}
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={"username"}
                        variant="outlined"
                    />

                    {login ? <StyledLink href={"/register"}> You don`t have account? </StyledLink> :
                        <StyledLink href={"/login"}>You already have account?</StyledLink>}
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        placeholder={"Enter password"}
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={"password"}
                        type={"password"}
                        variant="outlined"
                        sx={{mb: 2}}
                    />
                    <Button type="submit"
                            variant={"contained"}
                            disabled={isSubmitting || !isValid}>
                        Sign {login ? "In" : "Up"}
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={alert.isShow}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            >
                <Alert
                    severity={alert.type}
                    sx={{width: "100%"}}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Box>
    )
};

const StyledLink = styled(Link)`
  margin: 10px 0;
  text-align: right;
  color: #1976d2;

  &:hover {
    text-decoration: underline;
  }

`
