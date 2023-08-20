"use client"
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Alert, Box, Button, Grid, Snackbar, TextField} from "@mui/material";

import {getNote} from "@/services/DataServices";
import {useLogout} from "@/hooks/useLogout";
import {IGetNoteFormProps} from "@/interfaces";


export default function GetNoteForm({setNote}: IGetNoteFormProps) {

    const {logout} = useLogout();

    const [alert, setAlert] = useState<{
        isShow: boolean;
        type: "success" | "error";
        message: string;
    }>({
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

    const handleGetNote = async (data: string) => {
        return await getNote(data);
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
        resetForm,
    } = useFormik({
        initialValues: {
            accessKey: "",
        },
        validationSchema: Yup.object({
            accessKey: Yup.string()
                .min(5, "The secret key length must be 5 characters")
                .max(5, "The secret key length must be 5 characters")
                .required("The secret key is required"),
        }),
        onSubmit: async (values) => {
            try {
                const note = await handleGetNote(values.accessKey);
                setNote(note);
                handleOpenAlert("success", "Secret key is correct");
            } catch (e: any) {
                if (e.response.data.message === "jwt malformed") {
                    logout();
                }
                setNote({
                    title: "",
                    body: "",
                });
                handleOpenAlert("error", e.response.data.message);
            } finally {
                resetForm();
            }
        },
    });

    return (
        <Grid item xs={12} md={8} lg={6}>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <TextField
                        error={Boolean(touched.accessKey && errors.accessKey)}
                        helperText={touched.accessKey && errors.accessKey}
                        value={values.accessKey}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={"accessKey"}
                        label="Secret Key"
                        sx={{marginBottom: 1}}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting || !isValid}
                    >
                        Get Note
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
        </Grid>
    );
}
