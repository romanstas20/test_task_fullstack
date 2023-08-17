import {Cookies} from "react-cookie";

export const apiDataBaseUrl = process.env.BASE_URL;

export const headersToken = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');

        return {
            headers: {
                Authorization: `${token}`
            }
        }


};
