import React,{useState} from 'react';
import './Login.css';
import PropTypes from 'prop-types';




const getAccessToken= async (appId,appSecret)=>{

    console.log(appId);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "type":"application",
        "appId":appId,
        "appSecret":appSecret
    });

    let Options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const resp= await fetch("https://api.symbl.ai/oauth2/token:generate",Options);
    console.log("this is token"+resp);
    return resp.json();
}


async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


export default function Login({ setToken }) {

    const [appId,setAppId]=useState();
    const [appSecret,setAppSecret]=useState();

    const handleSubmit = async e => {
        e.preventDefault();

        const token= await getAccessToken(appId,appSecret);
        console.log(token.accessToken);
        setToken(token.accessToken);
    }

    return(
        <div className="login-wrapper">
            <h1>Please Enter Symbl AppId and AppSecret</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>AppId</p>
                    <input type="text" onChange={e=>setAppId(e.target.value)} />

                </label>
                <label>
                    <p>AppSecret</p>
                    <input type="password" onChange={e=>setAppSecret(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
}