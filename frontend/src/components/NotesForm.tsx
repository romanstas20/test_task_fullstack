'use client'

import {Button, TextField, Box, Snackbar, Alert, Typography} from "@mui/material"
import {useFormik} from "formik";
import * as Yup from "Yup";
import {createNote, signIn} from "@/services/DataServices";
import {useEffect, useState} from "react";
import {generateRandomString} from "@/utils/helpersFunction";
import Modal from "@/components/Modal";

export default function NotesForm() {

    const [alert, setAlert] = useState({
        isShow: false,
        type: "success",
        message: "",
    });
    const [openInstr, setOpenInstr] = useState(false);
    const [generatedKey, setGeneratedKey] = useState("");

    const modalHandler = () => {

        setOpenInstr(!openInstr);
        if (!openInstr) {
            handleOpenAlert("success", "Note created successfully")
        }
    };


    const handleOpenAlert = (type, message) => {
        setAlert({isShow: true, type: type, message});
        setTimeout(() => {
            setAlert({isShow: false, type: type, message})
        }, 3500);
    };

    const handleCreateNote = async (data) => {
        await createNote({...data});
        setGeneratedKey(data.accessKey);
    }


    const {values, handleChange, handleBlur, isSubmitting, touched, errors, handleSubmit, isValid} = useFormik({
        initialValues: {
            title: '',
            body: '',
            submit: null
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(255)
                .required('The title is required'),
            body: Yup.string()
                .max(255)
                .required('The body is required'),
        }),
        onSubmit: async (values, {resetForm}) => {
            try {
                await handleCreateNote({title: values.title, body: values.body, accessKey: generateRandomString()})
                modalHandler();

            } catch (e) {
                handleOpenAlert("error", e.response.data.message);
            } finally {
                resetForm();
            }
        }
    });

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', flexDirection: 'column', margin: '0 auto', width: 400, padding: 2}}>
                    <TextField
                        label='Title'
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                        placeholder={"Enter title"}
                        value={values.title}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={"title"}
                        type={"text"}
                        sx={{mb: 1}}
                    />
                    <TextField
                        label="Body"
                        multiline
                        error={Boolean(touched.body && errors.body)}
                        helperText={touched.body && errors.body}
                        placeholder={"Enter body"}
                        value={values.body}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={"body"}
                        type={"text"}
                        sx={{mb: 1}}
                        rows={4}
                    />
                    <Button
                        type="submit"
                        variant={"contained"}
                        disabled={isSubmitting || !isValid}>
                        Create Note
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
            <Modal open={openInstr} closeModal={modalHandler} closeBtnText="Close">
                <Typography variant="h3" textAlign='center'>Secret key</Typography>
                <Typography variant="h4" textAlign='center'>{generatedKey}</Typography>
            </Modal>
        </>

    );
}
