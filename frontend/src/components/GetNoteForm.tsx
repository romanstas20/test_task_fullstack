'use client'
import {Alert, Box, Button, Snackbar, TextField} from "@mui/material";
import {getNote} from "@/services/DataServices";
import {useFormik} from "formik";
import * as Yup from "Yup";
import {useState} from "react";


export default function GetNoteForm({setNote}) {

    const [alert, setAlert] = useState({
        isShow: false,
        type: "success",
        message: "",
    });

    const handleOpenAlert = (type, message) => {
        setAlert({isShow: true, type: type, message});
        setTimeout(() => {
            setAlert({isShow: false, type: type, message})
        }, 3500);
    };

    const {values, handleChange, handleBlur, isSubmitting, touched, errors, handleSubmit, isValid} = useFormik({
        initialValues: {
            accessKey: '',
            submit: null
        },
        validationSchema: Yup.object({
            accessKey: Yup.string()
                .min(5, 'The secret key length 5 characters')
                .max(5, 'The secret key length 5 characters')
                .required('The secret key is required'),
        }),
        onSubmit: async (values, {resetForm}) => {
            try {
                setNote(await getNote(values.accessKey));
                handleOpenAlert("success", "Secret key is right");
            } catch (e) {
                setNote({title: "", body: ""});
                handleOpenAlert("error", e.response.data.message);
            } finally {
                resetForm();
            }
        }
    });
    return (

        <>
            <form onSubmit={handleSubmit}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                    <TextField
                        error={Boolean(touched.accessKey && errors.accessKey)}
                        helperText={touched.accessKey && errors.accessKey}
                        value={values.accessKey}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={"accessKey"}
                        label="Secret Key"
                        placeholder="Enter note secret key"
                        sx={{marginBottom: 1}}
                    />
                    <Button type="submit"
                            variant={"contained"}
                            disabled={isSubmitting || !isValid}>
                        Get Note
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

        </>


    )
}
