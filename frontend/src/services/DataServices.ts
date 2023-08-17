import axios from "axios";

import {apiDataBaseUrl, headersToken} from "@/config/config";

export const signIn = async (data) => {
    const {data: response} = await axios.post(
        `${apiDataBaseUrl}/auth/login`,
        data
    );
    return response;
};

export const signUp = async (data) => {
    const {data: response} = await axios.post(
        `${apiDataBaseUrl}/auth/register`,
        data
    );
    return response;
};

export const createNote = async (data) => {
    const {data: response} = await axios.post(
        `${apiDataBaseUrl}/notes/create`,
        data,
        {...headersToken()}
    );
    return response;
};

export const getNote = async (accessKey) => {
    const {data: response} = await axios.get(
        `${apiDataBaseUrl}/notes/${accessKey}`,
        {...headersToken()}
    );
    return response;
};
