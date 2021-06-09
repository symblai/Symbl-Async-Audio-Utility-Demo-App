import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        //return userToken?.token
        return userToken
    };
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        console.log("inside save token "+userToken);
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };
    return {
        setToken: saveToken,
        token
    }
}