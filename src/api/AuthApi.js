import axios from "axios";
import {BEST_TICKET_API} from "../ultility/AppConstant.js";

export async function login(user) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: user
    }).then((res) => {
        const token = res.data.token
        localStorage.setItem('token', token)
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    console.log(response);
    return response;

}

export async function loginWithToken() {
    let response = null;
    const token = localStorage.getItem('token');
    await axios({
        url: `${BEST_TICKET_API}auth/login`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "POST",
        data: null,
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}

export async function register(user) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}auth/register`,
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        data: user
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}

export async function loginGoogle(user) {
    let response = null;
    await axios({
        url: `${BEST_TICKET_API}auth/google-login`,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': "gzip, deflate, br",
        },
        method: "POST",
        data: user
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response
    })
    return response;
}

export async function logout(user) {
    let response = null;
    let token = localStorage.getItem('token');
    await axios({
        url: `${BEST_TICKET_API}auth/logout`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        method: "POST",
        data: user
    }).then((res) => {
        response = res;
    }).catch((e) => {
        response = e.response;
    })
    return response;
}