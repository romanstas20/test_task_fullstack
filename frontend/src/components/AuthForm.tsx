'use client'
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import Link from "next/link";
import {Cookies} from "react-cookie";
import {useRouter} from "next/navigation";
import {Alert, Box, Button, Snackbar, styled, TextField, Typography} from "@mui/material";

import {getCharacterValidationError} from "@/utils/helpersFunction";
import {signIn, signUp} from "@/services/DataServices";
import {IAlertState, IAuthFormProps, IAuthProps} from "@/interfaces";


export default function AuthForm({login = true}: IAuthFormProps) {
    const {push} = useRouter();

    const [alert, setAlert] = useState<IAlertState>({
        isShow: false,
        type: "success",
        message: "",
    });

    const handleOpenAlert = (type: "success" | "error", message: string) => {
        setAlert({isShow: true, type: type, message});
        setTimeout(() => {
            setAlert({isShow: false, type: type, message});
        }, 3500);
    };

    const settingToken = (response: { token: string }) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const cookies = new Cookies();
        const token = response.token;
        cookies.set("token", token, {
            expires: tomorrow,
        });
        push("/");
    };

    const handleSignIn = async (data: IAuthProps) => {
        settingToken(await signIn(data));
    };

    const handleSignUp = async (data: IAuthProps) => {
        await signUp(data);
        setTimeout(() => {
            push("/login");
        }, 3500);
    };

    const {
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        touched,
        errors,
        handleSubmit,
        isValid,
    } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().max(255).required("The username is required"),
            password: Yup.string()
                .required("The password is required")
                .min(8, "Password must have at least 8 characters")
                .matches(/[0-9]/, getCharacterValidationError("digit"))
                .matches(/[a-z]/, getCharacterValidationError("lowercase"))
                .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
        }),
        onSubmit: async (values) => {
            try {
                if (login) {
                    await handleSignIn({
                        username: values.username,
                        password: values.password,
                    });
                } else {
                    await handleSignUp({
                        username: values.username,
                        password: values.password,
                    });
                }

                const successMessage = login
                    ? "User successfully logged in"
                    : "User successfully created";

                handleOpenAlert("success", successMessage);
            } catch (e: any) {
                handleOpenAlert("error", e.response.data.message);
            }
        },
    });

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box sx={{mb: 2, textAlign: "center"}}>
                <Typography variant="h4">Sign {login ? "In" : "Up"}</Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <TextField
                        error={Boolean(touched.username && errors.username)}
                        helperText={touched.username && errors.username}
                        placeholder="Enter username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="username"
                        variant="outlined"
                    />

                    {login ? (
                        <StyledLink href="/register">You don&rsquo;t have an account?</StyledLink>
                    ) : (
                        <StyledLink href="/login">You already have an account?</StyledLink>
                    )}
                    <TextField
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        placeholder="Enter password"
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="password"
                        type="password"
                        variant="outlined"
                        sx={{mb: 2}}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || !isValid}
                    >
                        Sign {login ? "In" : "Up"}
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={alert.isShow}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            >
                <Alert severity={alert.type} sx={{width: "100%"}}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

const StyledLink = styled(Link)`
  margin: 10px 0;
  text-align: right;
  color: #1976d2;

  &:hover {
    text-decoration: underline;
  }
`;
